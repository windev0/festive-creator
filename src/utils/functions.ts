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

export { isAuthenticated };
