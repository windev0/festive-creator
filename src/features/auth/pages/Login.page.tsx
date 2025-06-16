import { LoginForm } from "@/auth/components/LoginForm";
import { ROUTES } from "@/utils/constants";
import { GalleryVerticalEnd } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href={ROUTES.HOME} className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Happy Birthday
        </a>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
