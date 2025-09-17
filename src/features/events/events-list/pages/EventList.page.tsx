import { useEffect, useState } from "react";
import { getEvents } from "@/features/events/services/event.service";
import EventCard from "@/features/events/events-list/components/EventCard";
import type { IEvent } from "@/features/events/utils/types";

const EventListPage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getEvents().then((resp) => {
      const { data, error } = resp;
      if (data) {
        setEvents(data as IEvent[]);
        setLoading(false);
      } else if (error) {
        setError(error);
        setLoading(false);
      }
    });
  }, []);

  if (loading)
    return <div className="text-center py-10 text-lg">Chargement...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="flex p-4 flex-col items-center py-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-pink-700">
      Mes évènements 🎉
      </h2>
      {events.length === 0 ? (
      <p className="text-gray-500">Aucun événement trouvé.</p>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {events.map((event) => (
        <EventCard key={event.$id} event={event} />
        ))}
      </div>
      )}
    </div>
  );
};
export default EventListPage;
