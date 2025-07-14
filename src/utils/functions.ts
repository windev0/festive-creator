import type { User } from "@/auth/utils/types";
import type { customToastMsgType } from "@/utils/type";
import { toast } from "sonner";

function isAuthenticated(): boolean {
  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
  return user?.emailVerification && user?.$id ? true : false;
}

export function customToastMsg({
  msg,
  className,
  description,
}: customToastMsgType): any {
  return toast(msg, {
    position: "top-center",
    className,
    description,
    duration: 4000,
    action: {
      label: "Fermer",
      onClick: () => null,
    },
  });
}

// Génère un nom unique basé sur la date, l'index et le nom original
export function getFileUniqueName(file: File, index: number): string {
  return `${new Date().toISOString().replace(/[:.]/g, "-")}_${index + 1}_${
    file?.name?.substring(0, 5) || "photo"
  }`;
}

export { isAuthenticated };
