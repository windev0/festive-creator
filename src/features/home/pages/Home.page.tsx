import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import Navbar from "@/components/NavBar";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="bg-blue-50 min-h-screen">
        {/* Hero Section */}
        <section className="px-6 py-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-snug">
              Créez un message festif pour toutes les occasions 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              Générez des messages personnalisés en vidéos ou cartes festives en
              quelques clics.
            </p>
            <Button
              className="text-white cursor-pointer bg-blue-600 hover:bg-blue-500"
              onClick={() => navigate(ROUTES.CREATE_EVENT)}
            >
              Créer un message
            </Button>
          </div>
          <div>
            <img
              src="/assets/images/img1.jpg"
              alt="Illustration festive"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </section>

        {/* Pourquoi utiliser notre plateforme */}
        <section className="bg-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-10 text-gray-800">
              Pourquoi utiliser notre plateforme ?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#F1F5FB] p-6 rounded-xl text-center">
                <img
                  src="/assets/images/confetti.gif"
                  alt="Joyeux anniversaire"
                  className="w-50 h-50 mx-auto rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  Joyeux anniversaire !
                </h3>
                <p className="text-gray-600 text-2sm mt-2">
                  Offrez à vos proches un souvenir inoubliable et personnalisé.
                </p>
              </div>
              <div className="bg-[#F1F5FB] p-6 rounded-xl text-center">
                <img
                  src="/assets/images/balloons.gif"
                  alt="Félicitations"
                  className="w-50 h-50 mx-auto rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  Félicitations !
                </h3>
                <p className="text-gray-600 text-2sm mt-2">
                  Célébrez les réussites et les grandes étapes avec style.
                </p>
              </div>
              <div className="bg-[#F1F5FB] p-6 rounded-xl text-center">
                <img
                  src="/assets/images/baby-girl.gif"
                  alt="Bienvenue bébé"
                  className="w-50 h-50 mx-auto rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  Bienvenue bébé !
                </h3>
                <p className="text-gray-600 text-2sm mt-2">
                  Souhaitez la bienvenue aux nouveaux-nés avec tendresse.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
