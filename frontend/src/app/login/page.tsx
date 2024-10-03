"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import api from "@/lib/api";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // eslint-disable-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/api/flask/users/login", {
        name,
        password,
      });

      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        setError("usuário ou senha incorretos");
      }
    } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setError("ocorreu um erro, tente novamente");
    }
  };

  return (
    <>
      <head>
        <title>OPTIMATECH TEST</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Digite seu usuário"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link
                href="/register"
                className="text-sm text-muted-foreground hover:underline"
              >
                Não tem uma conta? Cadastre-se
              </Link>
            </CardFooter>
          </Card>
        </div>
      </body>
    </>
  );
}
