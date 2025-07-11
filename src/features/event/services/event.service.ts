import type { IEvent } from "@/features/event/utils/types";
import {
  eventCollectionId,
  databaseId,
  databases,
  storage,
  storageBucketId,
  commentsCollectionId,
} from "@/lib/appwrite";
import { Query, type Models } from "appwrite";
import { v4 as uuidV4 } from "uuid";

export const getEvents = async (): Promise<{
  data?: Models.Document[];
  error?: string;
}> => {
  try {
    const data = await databases
      .listDocuments(databaseId, eventCollectionId, [
        Query.orderDesc("$createdAt"),
      ])
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

export async function getEventData(eventId: string): Promise<IEvent> {
  try {
    return await databases.getDocument(databaseId, eventCollectionId, eventId);
  } catch (error: any) {
    console.error("Erreur lors du chargement des événements :", error);
    throw error;
  }
}

export const getComments = async (eventId: string) => {
  const response = await databases.listDocuments(
    databaseId,
    commentsCollectionId,
    [
      Query.equal("eventId", [eventId]),
      Query.equal("isReply", false), // TODO A revoir
      Query.orderDesc("$createdAt"),
    ]
  );
  return response.documents;
};

export const postComment = async ({
  eventId,
  name,
  message,
}: {
  eventId: string;
  name: string;
  message: string;
}) => {
  return await databases.createDocument(
    databaseId,
    commentsCollectionId,
    uuidV4(),
    {
      eventId,
      name,
      message,
    }
  );
};

export const likeComment = async (commentId: string, comments: any[]) => {
  try {
    const comment = comments.find((c: any) => c.$id === commentId);
    if (!comment) return;
    await databases.updateDocument(
      databaseId,
      commentsCollectionId,
      commentId,
      {
        likes: (comment.likes || 0) + 1,
      }
    );
  } catch (err) {
    console.error("Erreur lors du like :", err);
    throw err;
  }
};

export const replyComment = async (
  eventId: string,
  replyer: string,
  replyMessage: string,
  parentId: string
) => {
  try {
    await databases.createDocument(databaseId, commentsCollectionId, uuidV4(), {
      eventId,
      name: replyer,
      message: replyMessage,
      replyTo: parentId,
      likes: 0,
      isReply: true,
    });
  } catch (err) {
    console.error("Erreur lors du reply :", err);
    throw err;
  }
};

export async function addReplies(commentId: string) {
  try {
    const comment = await databases.getDocument(
      databaseId,
      commentsCollectionId,
      commentId
    );
    await databases.updateDocument(
      databaseId,
      commentsCollectionId,
      commentId,
      {
        replies: [commentId, ...comment?.replies],
      }
    );
  } catch (err) {
    console.error("Erreur lors du addReplies :", err);
    throw err;
  }
}
