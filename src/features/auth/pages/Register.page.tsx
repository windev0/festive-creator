import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import type { RegisterData } from "@/auth/utils/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { ROUTES } from "@/utils/constants";
import { Label } from "@radix-ui/react-label";
import { signUp } from "@/auth/services/register.service";

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear error message after 5 seconds
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const data: RegisterData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
    };

    if (!data) {
      setError("Please fill in all fields.");
      return;
    }
    const { email, password, username } = data;
    if (!email) {
      setError("Email is required.");
    }
    if (!password) {
      setError("Password is required.");
    }
    try {
      const user = await signUp({ email, password, username });
      if (user?.$id) {
        navigate(ROUTES.LOGIN);
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      setError(error ? error.message : "Registration failed");
      throw error;
    }
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen">  
      <Card className="mx-auto max-w-sm mt-10 w-full">
        <CardHeader>
          <CardTitle className="text-3xl text-center ">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
            {error}
          </div>
        )}

        <CardContent className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister(e);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input id="full-name" placeholder="John Doe" name="username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="me@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            <Button className="w-full">Register</Button>
          </form>
        </CardContent>
        
        <CardContent className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href={ROUTES.LOGIN} className="underline underline-offset-4">
            Login
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
