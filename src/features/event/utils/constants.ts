import type { ICategoryItem } from "@/features/event/utils/types";

export const FestiveEventCategory: ICategoryItem[] = [
  { key: "ANNIVERSAIRE", label: "Anniversaire" },
  { key: "BABY_SHOWER", label: "Baby shower / Gender reveal" },
  { key: "FIANCAILLES", label: "Fiançailles" },
  { key: "MARIAGE", label: "Mariage / Célébration de noces" },
  { key: "NAISSANCE", label: "Fête de naissance" },
  { key: "POT_DE_DEPART", label: "Pot de départ" },
  { key: "RETRAITE", label: "Retraite" },
  { key: "REUNION_FAMILLE", label: "Réunion de famille" },

  // 🎓 Célébrations académiques
  { key: "REMISE_DIPLOME", label: "Remise de diplôme" },
  { key: "FIN_ANNEE_SCOLAIRE", label: "Soirée de fin d’année scolaire" },
  { key: "SOUTENANCE", label: "Soutenance de mémoire / thèse" },
  { key: "ACCUEIL_ETUDIANTS", label: "Accueil des nouveaux étudiants" },

  // 🥳 Fêtes sociales & communautaires
  { key: "FETE_QUARTIER", label: "Fête de quartier" },
  { key: "SOIREE_ENTRE_AMIS", label: "Soirée entre amis / afterwork" },
  { key: "REVEILLON", label: "Réveillon (Nouvel an)" },
  { key: "BARBECUE", label: "Barbecue, garden party" },
  { key: "CARNAVAL", label: "Carnaval / défilé costumé" },
  { key: "FETE_RELIGIEUSE", label: "Fête religieuse (Noël, Aïd, Pâques…)" },

  // 💼 Événements pro festifs
  { key: "TEAM_BUILDING", label: "Team building" },
  { key: "LANCEMENT_PRODUIT", label: "Lancement de produit (launch party)" },
  { key: "INAUGURATION", label: "Inauguration / ouverture" },
  { key: "REMISE_PRIX", label: "Remise de prix interne" },
  { key: "AFTERWORK_ENTREPRISE", label: "Afterworks d'entreprise" },

  // 🌍 Événements culturels & artistiques
  { key: "CONCERT", label: "Concert / Festival" },
  { key: "SPECTACLE", label: "Spectacle (danse, théâtre)" },
  { key: "EXPOSITION", label: "Exposition / vernissage" },
  { key: "CINEMA_PLEIN_AIR", label: "Soirée cinéma plein air" },
  { key: "DEFILE_MODE", label: "Défilé de mode" },

  // 💖 Causes & solidarité
  { key: "GALA_CARITATIF", label: "Gala caritatif" },
  { key: "HOMMAGE", label: "Journée d’hommage / souvenir" },
  { key: "COLLECTE_DONS", label: "Collecte de dons festive" },
  { key: "MARCHE_ASSOCIATIVE", label: "Marche / fête associative" },

  // 🕹️ Autres catégories fun et modernes
  { key: "SOIREE_JEUX", label: "Soirée jeux / jeux vidéo / LAN party" },
  { key: "QUIZ", label: "Soirée quiz ou blind test" },
  { key: "FETE_COSTUMEE", label: "Fête costumée à thème" },
  { key: "KARAOKE", label: "Soirée karaoké" },
  { key: "BAPTEME", label: "Baby naming / baptême laïque" },
];

export type FestiveEventCategoryType = (typeof FestiveEventCategory)[number];
