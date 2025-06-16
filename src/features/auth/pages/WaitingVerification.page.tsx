import { sendVerificationEmail } from "@/auth/services/verify-user.service";
import { account } from "@/lib/appwrite";
import { ROUTES } from "@/utils/constants";
import { customToastMsg } from "@/utils/functions";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function WaitingVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  useEffect(() => {
    const handleFocus = async () => {
      try {
        const user = await account.get();
        if (user?.emailVerification) {
          navigate(ROUTES.HOME, { replace: true });
        }
      } catch (err) {
        console.error("Pas de session active");
      }
    };

    // 🔁 Vérifie chaque fois que l'utilisateur revient sur l'onglet
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [navigate]);

  const handleResendEmail = async () => {
    const user = await account.get();
    const isSuccess = await sendVerificationEmail(user?.$id);
    if (isSuccess) {
      customToastMsg({
        msg: "Email a été envoyé",
        description: "Un nouvel email de vérification a été envoyé.",
      });
    }
  };
  return (
    <div className="max-w-md mx-auto mt-24 px-8 py-12 bg-gradient-to-br from-blue-50 to-purple-100 rounded-3xl shadow-2xl text-center font-sans border border-blue-100">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="w-14 h-14 text-blue-400 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.879 1.797l-7.5 5.625a2.25 2.25 0 01-2.742 0l-7.5-5.625A2.25 2.25 0 012.25 6.993V6.75"
          />
        </svg>
        <h2 className="text-3xl font-extrabold mb-2 text-gray-800 tracking-tight">
          Vérification de l'adresse email
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Un lien de vérification a été envoyé à&nbsp;
          <span className="font-semibold text-blue-600">{email}</span>.
          <br />
          Veuillez cliquer sur ce lien, puis revenir ici.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Si vous ne voyez pas l'email, vérifiez votre dossier spam.
        </p>
        <div className="mt-4">
          <span className="text-sm text-gray-500">
            Vous n'avez rien reçu ?&nbsp;
          </span>
          <button
            type="button"
            onClick={handleResendEmail}
            className="inline-block cursor-pointer text-blue-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            Renvoyer l'email de vérification
          </button>
        </div>
      </div>
    </div>
  );
}
