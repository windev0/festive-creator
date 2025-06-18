// import { storage, storageBucketId } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
// import { generateVideoFromAssets } from "@/features/event/services/video-generator.service";

export default function VideoGenerator({
  // musicId,
  // photoIds,
  // duration,
}: {
  musicId: string;
  photoIds: string[];
  duration: string;
}) {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      setLoading(true);
      try {
        // const imageUrls = photoIds.map(
        //   // (id) => storage.getFilePreview("your-bucket-id", id).href
        //   (id) => storage.getFilePreview(storageBucketId, id)
        // );
        // const musicUrl = storage.getFileView(storageBucketId, musicId).href;
        // const musicUrl = storage.getFileView(storageBucketId, musicId);

        // const seconds = parseInt(duration.replace(/[^\d]/g, ""));

        // const url = await generateVideoFromAssets({
        //   imageUrls,
        //   musicUrl,
        //   duration: seconds,
        // });
        const url = "";
        setVideoUrl(url);

        // 🎉 Lance les confettis
        confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
      } catch (err) {
        console.error("Erreur génération vidéo:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  return (
    <div className="text-center p-4">
      {loading ? (
        <p>🎬 Génération en cours...</p>
      ) : videoUrl ? (
        <>
          <video
            src={videoUrl}
            controls
            className="mx-auto max-w-full rounded-md shadow"
          />
          <a
            href={videoUrl}
            download="video.mp4"
            className="mt-4 block text-blue-600 underline"
          >
            ⬇ Télécharger
          </a>
        </>
      ) : (
        <p>Erreur ou aucune vidéo générée.</p>
      )}
    </div>
  );
}
