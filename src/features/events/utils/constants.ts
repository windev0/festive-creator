import {
  Cake,
  GraduationCap,
  Users,
  Briefcase,
  Music,
  HandHeart,
  Gamepad2,
} from "lucide-react";

export const EventCategories = [
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

export const EventTitleExamples: Record<string, string[]> = {
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

export const defaultSteps = [
  { id: 1, label: "Content", icon: "FileText" },
  { id: 2, label: "Design", icon: "Palette" },
  { id: 3, label: "Preview", icon: "Eye" },
  { id: 4, label: "Share", icon: "Share2" },
];
