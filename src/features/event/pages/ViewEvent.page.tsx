import { Navigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addReplies,
  getComments,
  getEventData,
  getFileUrl,
  likeComment,
  postComment,
  replyComment,
} from "@/features/event/services/event.service";
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // Si tu utilises shadcn/ui
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/utils/constants";

const ViewEventPage = () => {
  const params = useParams();
  const { id: eventId } = params;
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  // const [expandedReplies, setExpandedReplies] = useState<
  const [expandedReplies, _] = useState<Record<string, boolean>>({});

  if (!eventId) return <Navigate to={ROUTES.NOT_FOUND} />;

  const {
    data: event,
    isLoading: loadingEvent,
    isError,
    error,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventData(eventId),
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", eventId],
    queryFn: () => getComments(eventId),
  });

  const commentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["comments", eventId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    commentMutation.mutate({ eventId, name, message });
  };

  const handleLike = async (commentId: string) => {
    try {
      await likeComment(commentId, comments);
      queryClient.invalidateQueries({ queryKey: ["comments", eventId] });
    } catch (err) {
      console.error("Erreur lors du like :", err);
    }
  };

  // const toggleReply = (commentId: string) => {
  //   setReplyingTo(replyingTo === commentId ? null : commentId);
  //   setReplyName("");
  //   setReplyMessage("");
  // };

  // const toggleReply = (commentId: string) => {
  //   setReplyingTo(replyingTo === commentId ? null : commentId);
  //   setExpandedReplies((prev) => ({
  //     ...prev,
  //     [commentId]: !prev[commentId],
  //   }));
  //   setReplyName("");
  //   setReplyMessage("");
  // };

  const handleReply = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    await addReplies(parentId);

    if (!replyName || !replyMessage) return;

    try {
      await replyComment(eventId, replyName, replyMessage, parentId);
      setReplyingTo(null);
      setReplyMessage("");
      queryClient.invalidateQueries({ queryKey: ["comments", eventId] });
    } catch (err) {
      console.error("Erreur lors de l’ajout de la réponse :", err);
    }
  };

  return (
    <MainLayout>
      {loadingEvent ? (
        <div className="text-center py-10 text-lg">
          Chargement de l’événement...
        </div>
      ) : isError ? (
        <div className="text-center py-10 text-red-500">
          {(error as Error).message}
        </div>
      ) : (
        event && (
          <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
              <h1 className="text-2xl font-bold">{event.title}</h1>
              <p className="text-sm text-gray-500 capitalize">
                {event.category}
              </p>
              <p className="text-gray-700">{event.message}</p>

              {/* Images */}
              {event.photoIds?.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {event.photoIds.map((photoId: string) =>
                    photoId ? (
                      <img
                        key={photoId}
                        src={photoId ? getFileUrl(photoId)?.url : undefined}
                        alt="event"
                        className="rounded-md object-cover w-full h-40"
                      />
                    ) : null
                  )}
                </div>
              )}

              {/* Music (optionnel) */}
              {event.musicId && (
                <audio controls className="mt-4 w-full">
                  <source
                    src={getFileUrl(event?.musicId)?.url}
                    type="audio/mpeg"
                  />
                  Votre navigateur ne supporte pas la lecture audio.
                </audio>
              )}
            </div>

            {/* Commentaires */}

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
              <h2 className="text-xl font-semibold">🎉 Commentaires</h2>

              {loadingComments ? (
                <p>Chargement des commentaires...</p>
              ) : comments.length > 0 ? (
                <ul className="space-y-6">
                  {comments.map((comment: any) => (
                    <li key={comment.$id}>
                      <div className="flex gap-3 items-start">
                        {/* Avatar utilisateur */}
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                          {comment.name?.[0]?.toUpperCase()}
                        </div>

                        {/* Contenu du commentaire */}
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-xl px-4 py-2">
                            <p className="text-sm font-semibold">
                              {comment.name}
                            </p>
                            <p className="text-gray-700 text-sm">
                              {comment.message}
                            </p>
                          </div>

                          {/* Actions : like, répondre */}
                          <div className="flex items-center gap-4 mt-1 ml-2 text-xs text-gray-500">
                            <button
                              className="hover:underline cursor-pointer"
                              onClick={() => handleLike(comment.$id)}
                            >
                              👍 J’aime ({comment.likes || 0})
                            </button>
                            {/* <button
                              className="hover:underline cursor-pointer"
                              onClick={() => toggleReply(comment.$id)}
                            >
                              💬 Répondre
                            </button> */}
                            <span>
                              {new Date(comment.$createdAt).toLocaleString()}
                            </span>
                          </div>

                          {/* Réponses éventuelles */}
                          {/* {comment.replies?.length > 0 && (
                            <ul className="mt-2 space-y-2 ml-10">
                              {comment.replies.map((reply: any) => (
                                <li key={reply.$id}>
                                  <div className="flex gap-2 items-start">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
                                      {reply.name?.[0]?.toUpperCase()}
                                    </div>
                                    <div className="bg-gray-50 px-3 py-1 rounded-lg">
                                      <p className="text-sm font-medium">
                                        {reply.name}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {reply.message}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )} */}
                          {expandedReplies[comment?.isReply] && (
                            <div className="mt-2 space-y-2 ml-10">
                              {comment.replies?.length > 0 && (
                                <ul className="space-y-2">
                                  {comment.replies.map((reply: any) => (
                                    <li key={reply.$id}>
                                      <div className="flex gap-2 items-start">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
                                          {reply.name?.[0]?.toUpperCase()}
                                        </div>
                                        <div className="bg-gray-50 px-3 py-1 rounded-lg">
                                          <p className="text-sm font-medium">
                                            {reply.name}
                                          </p>
                                          <p className="text-sm text-gray-600">
                                            {reply.message}
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Champ réponse inline */}
                              {/* {replyingTo === comment.$id && (
                                <form
                                  onSubmit={(e) => handleReply(e, comment.$id)}
                                  className="flex gap-2 items-start mt-3"
                                >
                                  <Input
                                    placeholder="Votre nom"
                                    value={replyName}
                                    onChange={(e) =>
                                      setReplyName(e.target.value)
                                    }
                                    className="w-1/3"
                                  />
                                  <Input
                                    placeholder="Votre réponse"
                                    value={replyMessage}
                                    onChange={(e) =>
                                      setReplyMessage(e.target.value)
                                    }
                                    className="flex-1"
                                  />
                                  <Button
                                    size="sm"
                                    className="cursor-pointer"
                                    type="submit"
                                  >
                                    Envoyer
                                  </Button>
                                </form>
                              )} */}
                            </div>
                          )}

                          {/* Champ réponse inline */}
                          {replyingTo === comment.$id && (
                            <form
                              onSubmit={(e) => handleReply(e, comment.$id)}
                              className="flex gap-2 items-start mt-3 ml-10"
                            >
                              <Input
                                placeholder="Votre nom"
                                value={replyName}
                                onChange={(e) => setReplyName(e.target.value)}
                                className="w-1/3"
                              />
                              <Input
                                placeholder="Votre réponse"
                                value={replyMessage}
                                onChange={(e) =>
                                  setReplyMessage(e.target.value)
                                }
                                className="flex-1"
                              />
                              <Button
                                size="sm"
                                className="cursor-pointer"
                                type="submit"
                              >
                                Envoyer
                              </Button>
                            </form>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  Aucun commentaire pour l’instant.
                </p>
              )}

              {/* Formulaire d’ajout de commentaire principal */}
              <form
                onSubmit={handleSubmit}
                className="space-y-2 border-t pt-6 mt-6"
              >
                <Input
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Votre message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={commentMutation.isPending}
                >
                  {commentMutation.isPending
                    ? "Envoi..."
                    : "Ajouter le commentaire"}
                </Button>
              </form>
            </div>
          </div>
        )
      )}
    </MainLayout>
  );
};

export default ViewEventPage;
