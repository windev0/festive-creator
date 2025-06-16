import { useEffect, useState } from "react";
import { collectionId, databaseId, databases } from "@/lib/appwrite";

interface Event {
  $id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  $createdAt: string;
  $updatedAt: string;
}

const EventListPage = () => {
  const [events, setEvents] = useState<Event[] | any>([]);
  const [loading, setLoading] = useState(true);

  const getEvents = async () => {
    try {
      const data = await databases
        .listDocuments(databaseId, collectionId)
        .then((resp) => resp.documents);
      setEvents(data);
    } catch (error) {
      console.error("Erreur lors du chargement des événements :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Événements festifs 🎉</h2>
      <ul>
        {events.map((event: Event) => (
          <li key={event.$id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <small>{event.date}</small>
            <br />
            <small>cret {event.$createdAt}</small>
            <br />

            <small>updt {event.$updatedAt}</small>
            <br />

            <img src={event.image} alt="image" height={80} width={80} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
