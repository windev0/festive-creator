// import { storage, uploadFile, videoBucketId } from "@/lib/appwrite";
// // import createFFmpeg from "@ffmpeg/ffmpeg/dist/esm/createFFmpeg";
// // import fetchFile from "@ffmpeg/ffmpeg/dist/esm/fetchFile";
// // import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// let ffmpeg: any;
// let fetchFile: any;

// async function loadFFmpeg() {
//   const ffmpegModule = await import("@ffmpeg/ffmpeg");
//   ffmpeg = ffmpegModule.createFFmpeg({ log: true });
//   fetchFile = ffmpegModule.fetchFile;
// }

// // const ffmpeg = createFFmpeg({ log: true });

// export async function generateVideoFromAssets({
//   imageUrls,
//   musicUrl,
//   duration,
// }: {
//   imageUrls: string[];
//   musicUrl: string;
//   duration: number;
// }) {
//   if (!ffmpeg) await loadFFmpeg();
//   if (!ffmpeg.isLoaded()) await ffmpeg.load();

//   const slideDuration = duration / imageUrls.length;

//   for (let i = 0; i < imageUrls.length; i++) {
//     const imageBlob = await fetch(imageUrls[i]).then((res) => res.blob());
//     ffmpeg.FS("writeFile", `img${i}.png`, await fetchFile(imageBlob));
//   }

//   const musicBlob = await fetch(musicUrl).then((res) => res.blob());
//   ffmpeg.FS("writeFile", "music.mp3", await fetchFile(musicBlob));

//   await ffmpeg.run(
//     "-framerate",
//     `${1 / slideDuration}`,
//     "-i",
//     "img%d.png",
//     "-i",
//     "music.mp3",
//     "-shortest",
//     "-c:v",
//     "libx264",
//     "-c:a",
//     "aac",
//     "-pix_fmt",
//     "yuv420p",
//     "output.mp4"
//   );

//   const data = ffmpeg.FS("readFile", "output.mp4");
//   const videoBlob = new Blob([data.buffer], { type: "video/mp4" });

//   const videoFile = new File([videoBlob], "video.mp4");
//   const savedVideoId = await uploadFile(videoFile, videoBucketId);
//   const fileUrl = storage.getFileView(videoBucketId, savedVideoId);
//   return fileUrl;
// }

// // export async function generateVideoFromAssets({
// //   imageUrls,
// //   musicUrl,
// //   duration,
// // }: {
// //   imageUrls: string[];
// //   musicUrl: string;
// //   duration: number; // seconds
// //   layout?: "grid" | "carousel";
// // }) {
// //   if (!imageUrls) {
// //     return "";
// //   } else {
// //     if (!ffmpeg.isLoaded()) await ffmpeg.load();

// //     const slideDuration = duration / imageUrls.length;

// //     // Step 1: Téléchargement et ajout des images
// //     for (let i = 0; i < imageUrls.length; i++) {
// //       const imageBlob = await fetch(imageUrls[i]).then((res) => res.blob());
// //       ffmpeg.FS("writeFile", `img${i}.png`, await fetchFile(imageBlob));
// //     }

// //     // Step 2: Téléchargement de la musique
// //     const musicBlob = await fetch(musicUrl).then((res) => res.blob());
// //     ffmpeg.FS("writeFile", "music.mp3", await fetchFile(musicBlob));

// //     // Step 3: Génération vidéo avec ffmpeg (simple slideshow)
// //     await ffmpeg.run(
// //       "-framerate",
// //       `${1 / slideDuration}`,
// //       "-i",
// //       "img%d.png",
// //       "-i",
// //       "music.mp3",
// //       "-shortest",
// //       "-c:v",
// //       "libx264",
// //       "-c:a",
// //       "aac",
// //       "-pix_fmt",
// //       "yuv420p",
// //       "output.mp4"
// //     );

// //     const data = ffmpeg.FS("readFile", "output.mp4");

// //     const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
// //     //   save url
// //     const videoFile = new File([videoBlob], "video");
// //     const savedVideoId = await uploadFile(videoFile, videoBucketId);
// //     const fileUrl = storage.getFileView(videoBucketId, savedVideoId);
// //     console.log("fileUrl video ", fileUrl);
// //     //   return videoUrl;
// //     return fileUrl;
// //   }
// // }
