import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { FormDataType } from "@/features/events/utils/types";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
  databaseId,
  databases,
  eventCollectionId,
  uploadFile,
} from "@/lib/appwrite";
import { v4 as uuidV4 } from "uuid";
import { fetchLoggedInUser } from "@/auth/services/login.service";
import { customToastMsg } from "@/utils/functions";
import { ROUTES } from "@/utils/constants";

// import { animations } from "@/features/events/utils/constants";

const EventPreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isCreating, setisCreating] = useState(false);

  const data: FormDataType =
    location.state?.cardData ||
    (localStorage.getItem("formData") &&
      JSON.parse(localStorage.getItem("formData")!));
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!data) {
      navigate(ROUTES.EVENTS, { replace: true });
    }
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const handleSubmit = async () => {
    const { musicUploaded, photos, category, message, duration, title } =
      data || {};
    setisCreating(true);
    try {
      console.log(musicUploaded);
      // // Upload musique
      const musicId = await uploadFile(musicUploaded!);

      // Upload photos
      const photoIds = await Promise.all(
        photos.map((photo: File) => uploadFile(photo))
      );

      // Créer le document dans la collection Appwrite
      const eventID = uuidV4();
      const userId = await fetchLoggedInUser().then((resp) => resp?.$id);
      await databases.createDocument(databaseId, eventCollectionId, eventID, {
        title,
        category,
        duration,
        message,
        musicId: musicId, // ID du fichier Appwrite
        photoIds: photoIds, // Array d’IDs
        userId,
      });

      setisCreating(false);
      customToastMsg({
        msg: "Evènement crée avec succès!",
        description: "Vous pouvez visualiser cet évènement.",
      });
      // navigate(ROUTES.APP);
      navigate(ROUTES.EVENTS);
    } catch (error: any) {
      console.error("Error on event creation" + error?.message, error);
    }
  };

  // // Choix de l’animation
  // const animationVariants: Record<string, any> = {
  //   fade: {
  //     hidden: { opacity: 0 },
  //     visible: { opacity: 1, transition: { duration: 1 } },
  //   },
  //   slide: {
  //     hidden: { x: -100, opacity: 0 },
  //     visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  //   },
  //   zoom: {
  //     hidden: { scale: 0.8, opacity: 0 },
  //     visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
  //   },
  // };

  // const currentAnimation = data?.selectedAnimation
  //   ? animations.find((item) => item.id == data.selectedAnimation) ||
  //     animations[0]
  //   : null;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        {/* Thème */}
        <div
          className={`w-full max-w-3xl rounded-2xl shadow-lg p-8 ${
            data?.selectedTheme === "elegant"
              ? "bg-white text-gray-800"
              : data?.selectedTheme === "festive"
              ? "bg-yellow-100 text-gray-900"
              : "bg-gray-200"
          }`}
        >
          {/* Titre */}
          <h1 className="text-3xl font-bold text-center mb-4">{data?.title}</h1>

          {/* Catégorie */}
          <p className="text-center text-sm italic text-gray-500 mb-6">
            Catégorie : {data?.category}
          </p>

          {/* Galerie Photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {data?.photos && data?.photos.length > 0 ? (
              data?.photos.map((file: File, idx: number) => {
                const url = URL.createObjectURL(file);
                return (
                  <motion.div
                    key={idx}
                    // variants={""}
                    initial="hidden"
                    animate="visible"
                    className="overflow-hidden rounded-xl shadow-md"
                  >
                    <img
                      src={url}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </motion.div>
                );
              })
            ) : (
              <p className="col-span-full text-center text-gray-400">
                Aucune photo ajoutée
              </p>
            )}
          </div>

          {/* Message personnalisé */}
          {data?.customMessage && (
            <motion.div
              // variants={currentAnimation}
              initial="hidden"
              animate="visible"
              className="text-center mb-6"
            >
              <p className="text-lg font-medium italic">
                “{data?.customMessage}”
              </p>
            </motion.div>
          )}

          {/* Message libre */}
          {data?.message && (
            <div className="text-center mb-6">
              <p className="text-base">{data?.message}</p>
            </div>
          )}

          {/* Audio */}
          <div className="flex flex-col items-center gap-2">
            <audio ref={audioRef} controls src={data?.musicUrl} />
            {data?.selectedMusicID && (
              <p className="text-sm text-gray-500">
                Musique sélectionnée : {data?.selectedMusicID}
              </p>
            )}
          </div>

          {/* Don */}
          {data?.donationEnabled && (
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold">Participation</h2>
              {data?.donationGoal && (
                <p className="text-gray-600">
                  Objectif : {data?.donationGoal} €
                </p>
              )}
              {data?.donationDescription && (
                <p className="text-gray-500 mt-2">
                  {data?.donationDescription}
                </p>
              )}
            </div>
          )}

          {/* Durée / Vidéo */}
          {data?.duration && (
            <p className="mt-6 text-center text-sm text-gray-400">
              Durée prévue : {data?.duration} min
            </p>
          )}
          {data?.videoDuration > 0 && (
            <p className="text-center text-xs text-gray-400">
              Vidéo générée : {data?.videoDuration}s
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            disabled={isCreating}
            onClick={handleSubmit}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md
              ${
                isCreating
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600  text-white hover:from-yellow-500 hover:to-red-500"
              }
            `}
          >
            {isCreating ? "Enregistrement..." : "Enregistrer l'évènement"}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventPreviewPage;
