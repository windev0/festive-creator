import { Client, Account, Databases, Storage } from "appwrite";
import { v4 as uuidv4 } from "uuid";
export { ID } from "appwrite";

const client = new Client();
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const databaseId = import.meta.env.VITE_FESTIVE_DATABASE_ID;
const collectionId = import.meta.env.VITE_EVENTS_COLLECTION_ID;
const storageBucketId = import.meta.env.VITE_EVENT_STORAGE_BUCKET_ID;

client.setEndpoint(endpoint!).setProject(projectId!); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const uploadFile = async (file: File): Promise<string> => {
  const uuid = uuidv4();
  const response = await storage.createFile(storageBucketId, uuid, file);
  return response.$id; // Ou storage.getFileView() si tu veux l’URL directe
};

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
};
