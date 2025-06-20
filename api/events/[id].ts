import { VercelRequest, VercelResponse } from "@vercel/node";
import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT!)
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID!); // ← Ton ID Appwrite
//   .setKey("TON_API_KEY_PRIVÉ"); // ← 🔐 clé API Server (cf. remarque ci-dessous)

client.headers["x-appwrite-key"] = process.env.APPWRITE_API_KEY!;
const databases = new Databases(client);
const storage = new Storage(client);
const bucketId = process.env.VITE_EVENT_STORAGE_BUCKET_ID;
const baseUrl = process.env.VITE_BASE_URL;

function getFileUrl(fileId: string): string {
  try {
    return storage.getFileView(bucketId!, fileId);
  } catch (error: any) {
    console.log("getFileUrl error", error);
    return error?.message;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const eventId = req.query.id as string;

  // if (eventId) {
  //   const html = `
  //     <!DOCTYPE html>
  //     <html lang="fr">
  //     <head>
  //       <meta charset="UTF-8" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //       <title>hello</title>
  //       <meta property="og:title" content="hello" />
  //       <meta property="og:description" content="babababab" />
  //       <meta property="og:image" content="" />
  //       <meta property="og:url" content="https://tonsite.com/event/" />
  //       <meta name="twitter:card" content="summary_large_image" />
  //     </head>
  //     <body>
  //       Redirection vers l’événement...
  //       hello
  //       <p>
  //         hello
  //       </p>
  //     </body>
  //     </html>
  //   `;
  //   return res.send(html);
  // }
  if (!eventId) {
    return res.status(400).send("ID manquant");
  }

  try {
    const event = await databases.getDocument(
      process.env.VITE_FESTIVE_DATABASE_ID!, // id de ta base
      process.env.VITE_EVENTS_COLLECTION_ID!, // id de ta collection
      eventId
    );

    // const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${event.photoIds?.[0]}/preview?width=1200&height=630`;
    const imageUrl = `${getFileUrl(event.photoIds?.[0])}`;

    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${event.title}</title>
        <meta property="og:title" content="${event.title}" />
        <meta property="og:description" content="${event.message}" />
        <meta property="og:image" content="${imageUrl}" />
        <meta property="og:url" content="${baseUrl}/events/${event.$id}" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>
        Redirection vers l’événement...
        <script>
          window.location.href = "${baseUrl}/events/shared/${event.$id}";
        </script>
      </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html");
    console.log("object");
    res.send(html);
  } catch (err) {
    res.status(404).send("Événement non trouvé");
  }
}
