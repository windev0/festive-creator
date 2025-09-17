import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite"; // <-- adapte le chemin selon ton projet
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import { deleteSessions } from "@/auth/services/login.service";
// import { isAuthenticated } from "@/utils/functions";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  // Removed unused isVerified state

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const localUser = window.localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    } else {
      account
        .get()
        .then((fetchedUser) => {
          setUser(fetchedUser);
          window.localStorage.setItem("user", JSON.stringify(fetchedUser));
        })
        .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await deleteSessions();
      setUser(null);

      const logoutWindow = window.open(
        "https://accounts.google.com/Logout",
        "_blank",
        "width=500,height=600"
      );

      window.localStorage.clear();
      setTimeout(() => {
        logoutWindow?.close();
        navigate(ROUTES.HOME);
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <nav className="w-full bg-gray-800 border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
      {/* Logo */}
      <h1
        className="text-xl font-bold text-white cursor-pointer"
        onClick={() => navigate(ROUTES.HOME)}
      >
        Festify
      </h1>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-4 text-white">
        {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
          <span>👋 {user.name}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate(ROUTES.EVENTS)}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            Déconnexion
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        ) : (
        <Button
          onClick={() => navigate(ROUTES.LOGIN)}
          className="text-sm px-4 py-2 cursor-pointer bg-gray-200 text-black rounded hover:bg-blue-500 transition"
        >
          Connexion
        </Button>
        )}
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
      <div className="md:hidden mt-4 flex flex-col gap-4 px-4">
        {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 transition w-full">
          <span>👋 {user.name}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
            navigate(ROUTES.EVENTS);
            setMenuOpen(false);
            }}
          >
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
            handleLogout();
            setMenuOpen(false);
            }}
            className="text-red-600"
          >
            Déconnexion
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        ) : (
        <Button
          onClick={() => {
          navigate(ROUTES.LOGIN);
          setMenuOpen(false);
          }}
          className="text-sm px-4 py-2 bg-gray-200 text-black rounded hover:bg-blue-500 transition"
        >
          Connexion
        </Button>
        )}
      </div>
      )}
    </nav>
  );
};

export default Navbar;
