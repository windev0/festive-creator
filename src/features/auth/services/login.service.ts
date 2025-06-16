import type { LoginData, User } from "@/auth/utils/types";
import { account } from "@/lib/appwrite";
import { ROUTES } from "@/utils/constants";
import type { OAuthProvider } from "appwrite";

export async function signInWithEmailPassword(
  data: LoginData
): Promise<User | null> {
  // Tentative de suppression des sessions existantes (sécurité)
  await deleteSessions();

  try {
    if (!data) {
      return null;
    }

    const { email, password } = data;
    const session = await account.createEmailPasswordSession(email, password);

    if (!session.$id) return null;

    const user = await account.get();
    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem("email", email);
    return user;
  } catch (error) {
    console.error("signInWithEmailPassword failed:", error);
    throw error;
  }
}

export async function signInWithOAuth(
  provider: OAuthProvider
): Promise<boolean> {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const authCallbackUrl = baseUrl + ROUTES.AUTH_CALLBACK;
  const onSuccessUrl = baseUrl + ROUTES.HOME;

  // Tentative de suppression des sessions existantes (sécurité)
  await deleteSessions();

  try {
    if (!provider) {
      return false;
    }

    account.createOAuth2Session(provider, onSuccessUrl!, authCallbackUrl!, [
      "email",
      "openid",
      "profile",
    ]);
    return true;
  } catch (error) {
    console.error("OAuth login failed:", error);
    throw error;
  }
}

export async function fetchLoggedInUser(): Promise<User | null> {
  try {
    const user = await account.get();
    window.localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    console.error("Erreur lors de la récupération de l'utilisateur :", err);
    return null;
  }
}

export async function deleteSessions() {
  try {
    await account.deleteSessions();
    console.log("Sessions supprimées avec succès.");
  } catch (error: any) {
    // Si l'erreur indique qu'il n'y a pas de session active, on continue quand même
    if (
      error?.type === "general_unauthorized_scope" ||
      error?.type === "user_session_not_found"
    ) {
      console.warn("Aucune session active à supprimer, on continue.");
    } else {
      console.error(
        "Erreur inattendue lors de la suppression des sessions :",
        error
      );
      // ⚠️ continue here!
    }
  }
}
