import { Client, Account, Databases, Storage } from "appwrite";
import { v4 as uuidv4 } from "uuid";
export { ID } from "appwrite";

// interface downloadFile {
//   fileId: string;
//   videoData: VideoData;
// }
const client = new Client();
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const databaseId = import.meta.env.VITE_FESTIVE_DATABASE_ID;
const collectionId = import.meta.env.VITE_EVENTS_COLLECTION_ID;
const storageBucketId = import.meta.env.VITE_EVENT_STORAGE_BUCKET_ID;
// const videoBucketId = import.meta.env.VITE_EVENT_STORAGE_BUCKET_ID;
const videoBucketId = import.meta.env.VITE_EVENT_STORAGE_BUCKET_ID;

client.setEndpoint(endpoint!).setProject(projectId!); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const uploadFile = async (file: File, bucketId?: string): Promise<string> => {
  const uuid = uuidv4();
  const response = await storage.createFile(
    bucketId ?? storageBucketId,
    uuid,
    file
  );
  return response.$id; // Ou storage.getFileView() si tu veux l’URL directe
};

// const downloadFile = async ({
//   fileId,
// }: downloadFile): Promise<File> => {
//  const response =  storage.getFileDownload(storageBucketId, fileId);
//   const blob = await response.blob();
//   const file = new File([blob], `${fileId}.file`);
//   return file;
// };

export {
  client,
  account,
  databases,
  storage,
  uploadFile,
  projectId,
  endpoint,
  databaseId,
  collectionId,
  storageBucketId,
  videoBucketId,
};
