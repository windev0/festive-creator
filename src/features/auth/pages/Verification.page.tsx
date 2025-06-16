import { toast } from "sonner";
import { account } from "@/lib/appwrite";

const VerificationPage = () => {
  const verifyAccount = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret") ?? "";
    const userId = urlParams.get("userId") ?? "";

    const token = await account.updateVerification(userId, secret);
    if (token?.$id) {
      const udpdatedUser = await account.get();
      window.localStorage.setItem("user", JSON.stringify(udpdatedUser)); // update user infos

      toast.success("Votre compte a été vérifié avec succès !", {
        position: "top-center",
        duration: 5000,
        className: "",
        description: "Vous pouvez fermer cette page.",
        action: {
          label: "Fermer",
          onClick: () => {
            window.close();
          },
        },
      });
      return;
    }
    return;
  };
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "2.5rem 2rem",
            borderRadius: "1.5rem",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
            textAlign: "center",
            maxWidth: 400,
          }}
          className="flex flex-col items-center justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Verification"
            style={{ width: 64, marginBottom: 24 }}
          />
          <h2 style={{ color: "#4f46e5", marginBottom: 12 }}>
            Vérification de votre compte
          </h2>
          <p style={{ color: "#555", marginBottom: 24 }}>
            Cliquez sur le bouton ci-dessous pour vérifier votre compte et
            finaliser votre inscription.
          </p>
          <button
            onClick={verifyAccount}
            style={{
              background: "linear-gradient(90deg, #4f46e5 0%, #6d28d9 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(79, 70, 229, 0.15)",
              transition: "background 0.2s",
            }}
          >
            Vérifier mon compte
          </button>
        </div>
      </div>
    </>
  );
};

export default VerificationPage;
