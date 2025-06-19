import { getEventData } from "@/features/event/services/event.service";
import type { IEvent } from "@/features/event/utils/types";
import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ViewEventPage = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("id");

  const [event, setEvent] = useState<IEvent | null>(null);
  const [_, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        setError("Aucun ID d'événement fourni.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const resp = await getEventData(eventId);
        const { error: eventError, eventData } = resp;

        if (eventData) {
          setEvent(eventData as IEvent);
          setError("");
        } else if (eventError) {
          setError(eventError);
          setEvent(null);
        }
      } catch (err) {
        setError("Erreur lors de la récupération de l'événement.");
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  return (
    <MainLayout>
      {loading ? (
        <div className="text-center py-10 text-lg">Chargement...</div>
      ) : (
        <div>
          <p>{event?.message}</p>
          ViewEvent
        </div>
      )}
    </MainLayout>
  );
};

export default ViewEventPage;
