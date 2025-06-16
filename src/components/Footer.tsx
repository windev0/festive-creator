import { ROUTES } from "@/utils/constants";
import { useLocation } from "react-router-dom";

// components/Footer.tsx
const Footer = () => {
  const { pathname } = useLocation();

  return pathname === ROUTES.HOME ? (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20 py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600 text-sm">
        {/* Section gauche */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            FestiCréateur 🎉
          </h2>
          <p>
            Créez des messages vidéo personnalisés pour chaque occasion
            spéciale. Simple, rapide et festif !
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Accueil
              </a>
            </li>
            <li>
              <a href="/create" className="hover:underline">
                Créer un message
              </a>
            </li>
            <li>
              <a href="/messages" className="hover:underline">
                Mes messages
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email : contact@festicreateur.com</p>
          <p>Téléphone : +228 90 00 00 00</p>
        </div>
      </div>

      {/* Bas de page */}
      <div className="text-center mt-8 text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} FestiCréateur. Tous droits réservés.
      </div>
    </footer>
  ) : null;
};

export default Footer;
