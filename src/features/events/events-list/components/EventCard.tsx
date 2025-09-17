import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
} from "@/components/ui/menubar";

import { getFileUrl } from "@/features/events/services/event.service";
import type { IEvent } from "@/features/events/utils/types";
import { ROUTES } from "@/utils/constants";
import { customToastMsg } from "@/utils/functions";
import { MenubarTrigger } from "@radix-ui/react-menubar";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }: { event: IEvent }) => {
  const navigate = useNavigate();

  const handleShareLink = async () => {
    const publicUrl = `${import.meta.env.VITE_BASE_URL}/events/shared/${
      event.$id
    }`;
    try {
      await navigator.clipboard.writeText(publicUrl);
      customToastMsg({
        msg: "Lien de l'évènement copié",
        description: "Lien copié dans le presse-papier !",
      });
    } catch (err) {
      customToastMsg({
        msg: "Impossible de copier le lien.",
      });
    }
  };
  const handleDeleteEvent = () => {
    return;
  };

  const handleViewEvent = () => {
    navigate(`${ROUTES.EVENTS}/${event.$id}`);
  };
  return (
    <div className=" from-pink-50 to-white rounded-2xl shadow-lg p-8 mb-8 max-w-md w-full border cursor-pointer border-pink-100 transition-transform hover:scale-105">
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl font-extrabold text-pink-700 mb-3 tracking-tight">
            {event.title}
          </h3>
        </div>
        <div>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer">
                Actions
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={handleShareLink}
                  className="cursor-pointer"
                >
                  Copier le lien
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  className="cursor-pointer"
                  onClick={handleDeleteEvent}
                >
                  Supprimer
                </MenubarItem>
                <MenubarItem
                  className="cursor-pointer"
                  onClick={handleViewEvent}
                >
                  Voir
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <p className="text-gray-800 mb-4 text-base">{event.message}</p>
      <div className="flex flex-wrap gap-3 mb-4">
        {event.photoIds?.slice(0, 4).map((photoId) => (
          <img
            key={photoId}
            src={getFileUrl(photoId)?.url}
            alt="image"
            className="rounded-lg object-cover border-2 border-pink-100 shadow-sm"
            height={80}
            width={80}
            style={{ minWidth: 80, minHeight: 80, maxWidth: 80, maxHeight: 80 }}
          />
        ))}
        {event.photoIds && event.photoIds.length > 4 && (
          <button
            className="rounded-lg border-2 border-pink-200 bg-pink-50 text-pink-700 flex items-center justify-center font-semibold text-lg shadow-sm hover:bg-pink-100 transition"
            style={{ height: 80, width: 80 }}
            title="Voir plus d'images"
            onClick={() => alert("Voir plus d'images à implémenter")}
          >
            +{event.photoIds.length - 4} autres
          </button>
        )}
      </div>
      {event.musicId && (
        <div className="mt-3 flex flex-col items-start w-full">
          <span className="text-pink-600 font-semibold mb-2">🎵 Musique</span>
          <audio
            controls
            src={getFileUrl(event.musicId)?.url}
            className="w-full rounded-lg bg-pink-50"
          >
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        </div>
      )}
      <div className="text-xs text-gray-400 mt-5 border-t border-pink-100 pt-3">
        <span>
          Créé le{" "}
          <span className="font-medium text-gray-500">
            {new Date(event.$createdAt).toLocaleString()}
          </span>
        </span>
        <br />
        <span>
          Modifié le{" "}
          <span className="font-medium text-gray-500">
            {new Date(event.$updatedAt).toLocaleString()}
          </span>
        </span>
      </div>
    </div>
  );
};
export default EventCard;
