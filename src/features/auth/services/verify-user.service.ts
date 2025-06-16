import { account } from "@/lib/appwrite";
import { ROUTES } from "@/utils/constants";

export const sendVerificationEmail = async (userId: string) => {
  try {
    const secret = import.meta.env.VITE_APPWRITE_SECRET || "birthday"; // you can use any secret, here we use 'birthday' for simplicity
    const verify_url = `${import.meta.env.VITE_BASE_URL}${
      ROUTES.VERIFY
    }?userId=${userId}&secret=${secret}`;

    // Envoie du lien de vérification à l'utilisateur
    const createVerification = await account.createVerification(verify_url);

    return createVerification;
  } catch (error) {
    throw error;
  }
};
