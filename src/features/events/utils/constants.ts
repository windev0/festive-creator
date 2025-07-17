import type {
  FormDataType,
  MusicLibraryYpe,
} from "@/features/events/utils/types";
import {
  Cake,
  GraduationCap,
  Users,
  Briefcase,
  Music,
  HandHeart,
  Gamepad2,
  ArrowRight,
  Heart,
  RotateCcw,
  Smile,
  Zap,
  ZoomIn,
} from "lucide-react";

const initialData: FormDataType = {
  title: "",
  category: "",
  duration: "",
  photos: [],
  musicUploaded: null,
  videoDuration: 60,
  selectedMusicID: "",
  selectedTheme: "elegant",
  selectedAnimation: "zoom",
  musicUrl: "",
  recordedVoice: null,
  message: "",
  userId: "",
};

const eventCategories = [
  {
    id: "personal",
    name: "Événements personnels",
    description:
      "Célébrations liées à la vie privée, comme anniversaires, mariages, naissances, et réunions familiales.",
    icon: Cake,
    color: "bg-pink-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    id: "academic",
    name: "Célébrations académiques",
    description:
      "Événements marquant des étapes scolaires ou universitaires, tels que remises de diplôme et soirées de fin d’année.",
    icon: GraduationCap,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: "social",
    name: "Fêtes sociales & communautaires",
    description:
      "Rassemblements festifs entre amis, voisins ou membres d’une communauté, comme barbecues, carnavals et fêtes religieuses.",
    icon: Users,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    id: "professional",
    name: "Événements pro festifs",
    description:
      "Occasions festives en entreprise ou dans le cadre professionnel, telles que team building, inaugurations et afterworks.",
    icon: Briefcase,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "cultural",
    name: "Événements culturels & artistiques",
    description:
      "Manifestations artistiques ou culturelles, comme concerts, spectacles, expositions et festivals.",
    icon: Music,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: "solidarity",
    name: "Causes & solidarité",
    description:
      "Événements dédiés à la solidarité ou à des causes caritatives, tels que galas, collectes de dons et marches associatives.",
    icon: HandHeart,
    color: "bg-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "fun",
    name: "Autres catégories fun et modernes",
    description:
      "Soirées ludiques et originales, comme jeux vidéo, quiz, fêtes costumées et karaoké.",
    icon: Gamepad2,
    color: "bg-indigo-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
];

const eventTitleExamples: Record<string, string[]> = {
  // 🎂 Événements personnels
  personal: [
    "Anniversaire surprise de Marie",
    "Baby shower pour l’arrivée de Lucas",
    "Fiançailles de Sophie et Julien",
    "Mariage de Claire et Thomas",
    "Fête de naissance pour Emma",
    "Pot de départ de Lucie",
    "Célébration de retraite de Monsieur Dupont",
    "Réunion familiale annuelle des Martin",
  ],

  // 🎓 Célébrations académiques
  academic: [
    "Remise de diplôme de la promotion 2023",
    "Soirée de fin d’année scolaire du lycée",
    "Soutenance de mémoire de Maître en Histoire",
    "Accueil des nouveaux étudiants de la fac",
  ],

  // 🥳 Fêtes sociales & communautaires
  social: [
    "Fête de quartier",
    "Soirée entre amis / afterwork",
    "Réveillon (Nouvel an)",
    "Barbecue, garden party",
    "Carnaval / défilé costumé",
    "Fête religieuse (Noël, Aïd, Pâques…)",
  ],

  // 💼 Événements pro festifs
  professional: [
    "Team building",
    "Lancement de produit (launch party)",
    "Inauguration / ouverture",
    "Remise de prix interne",
    "Afterworks d'entreprise",
  ],

  // 🌍 Événements culturels & artistiques
  cultural: [
    "Concert / Festival",
    "Spectacle (danse, théâtre)",
    "Exposition / vernissage",
    "Soirée cinéma plein air",
    "Défilé de mode",
  ],

  // 💖 Causes & solidarit
  solidarity: [
    "Gala caritatif",
    "Journée d’hommage / souvenir",
    "Collecte de dons festive",
    "Marche / fête associative",
  ],

  // 🕹️ Autres catégories fun et modernes
  fun: [
    "Soirée jeux / jeux vidéo / LAN party",
    "Soirée quiz ou blind test",
    "Fête costumée à thème",
    "Soirée karaoké",
    "Baby naming / baptême laïque",
  ],
};

const defaultSteps = [
  { id: 1, label: "Content", icon: "FileText" },
  { id: 2, label: "Design", icon: "Palette" },
  { id: 3, label: "Preview", icon: "Eye" },
  { id: 4, label: "Share", icon: "Share2" },
];

const musicLibrary: MusicLibraryYpe[] = [
  {
    id: "personal",
    name: "Événements personnels",
    artist: "Classique",
    duration: "0:30",
    category: "Anniversaire",
    url: "https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b8b7c7.mp3", // Joyful birthday tune
  },
  {
    id: "academic",
    name: "Célébrations académiques",
    artist: "Instrumental",
    duration: "1:00",
    category: "Remise de diplôme",
    url: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b7b6b7b.mp3", // Graduation march
  },
  {
    id: "social",
    name: "Fêtes sociales & communautaires",
    artist: "Festif",
    duration: "1:20",
    category: "Fête",
    url: "https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b8b7c7.mp3", // Upbeat party music
  },
  {
    id: "professional",
    name: "Événements pro festifs",
    artist: "Corporate",
    duration: "0:45",
    category: "Entreprise",
    url: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b7b6b7b.mp3", // Motivational background
  },
  {
    id: "cultural",
    name: "Événements culturels & artistiques",
    artist: "Orchestre",
    duration: "1:30",
    category: "Concert",
    url: "https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b8b7c7.mp3", // Artistic/cultural music
  },
  {
    id: "solidarity",
    name: "Causes & solidarité",
    artist: "Émotion",
    duration: "1:10",
    category: "Caritatif",
    url: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b7b6b7b.mp3", // Hopeful/solidarity tune
  },
  {
    id: "fun",
    name: "Autres catégories fun et modernes",
    artist: "Moderne",
    duration: "1:05",
    category: "Jeux",
    url: "https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b8b7c7.mp3", // Fun/modern party music
  },
];

const themes = [
  {
    id: "elegant",
    name: "Élégant",
    description: "Design sophistiqué avec des transitions douces",
    preview:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
    colors: ["#1a1a1a", "#f5f5f5", "#d4af37"],
  },
  {
    id: "playful",
    name: "Ludique",
    description: "Couleurs vives et animations amusantes",
    preview:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop",
    colors: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  },
  {
    id: "romantic",
    name: "Romantique",
    description: "Tons pastel et effets doux",
    preview:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
    colors: ["#ffc0cb", "#ffb6c1", "#f0e68c"],
  },
  {
    id: "modern",
    name: "Moderne",
    description: "Design minimaliste et contemporain",
    preview:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop",
    colors: ["#2c3e50", "#ecf0f1", "#3498db"],
  },
  {
    id: "festive",
    name: "Festif",
    description: "Parfait pour les célébrations",
    preview:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop",
    colors: ["#e74c3c", "#f39c12", "#27ae60"],
  },
  {
    id: "classic",
    name: "Classique",
    description: "Intemporel et raffiné",
    preview:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    colors: ["#8b4513", "#daa520", "#f5f5dc"],
  },
];

const animations = [
  {
    id: "fade",
    name: "Fondu",
    description: "Transition en fondu entre les photos",
    icon: Zap,
    preview: "Doux et élégant",
  },
  {
    id: "slide",
    name: "Glissement",
    description: "Les photos glissent de côté",
    icon: ArrowRight,
    preview: "Dynamique et fluide",
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Effet de zoom sur les photos",
    icon: ZoomIn,
    preview: "Dramatique et captivant",
  },
  {
    id: "flip",
    name: "Retournement",
    description: "Les photos se retournent",
    icon: RotateCcw,
    preview: "Ludique et original",
  },
  {
    id: "bounce",
    name: "Rebond",
    description: "Animation avec effet de rebond",
    icon: Smile,
    preview: "Amusant et énergique",
  },
  {
    id: "heart",
    name: "Cœurs",
    description: "Particules de cœurs flottants",
    icon: Heart,
    preview: "Romantique et tendre",
  },
];

export {
  initialData,
  eventCategories,
  eventTitleExamples,
  defaultSteps,
  musicLibrary,
  themes,
  animations,
};
