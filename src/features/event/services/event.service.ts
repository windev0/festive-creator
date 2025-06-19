import {
  collectionId,
  databaseId,
  databases,
  storage,
  storageBucketId,
} from "@/lib/appwrite";
import type { Models } from "appwrite";

export const getEvents = async (): Promise<{
  data?: Models.Document[];
  error?: string;
}> => {
  try {
    const data = await databases
      .listDocuments(databaseId, collectionId)
      .then((resp) => resp.documents);
    return { data };
  } catch (error: any) {
    console.error("Erreur lors du chargement des événements :", error);
    return { error: error?.message };
  }
};

export function getFileUrl(fileId: string): {
  url?: string;
  error?: string;
} {
  try {
    const url = storage.getFileView(storageBucketId, fileId);
    return { url };
  } catch (error: any) {
    console.log("getFileUrl error", error);
    return { error: error?.message };
  }
}
