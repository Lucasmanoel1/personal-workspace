"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function AutoSignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    // O usuário nem vai ver, o comando é disparado instantaneamente
    signIn("auth0", { callbackUrl });
  }, [callbackUrl]);

  // Retornamos apenas uma div vazia com a cor do seu tema.
  // Se a internet for lenta, o usuário vê apenas uma tela da cor do site,
  // o que parece ser apenas um "carregamento" natural.
  return (
    <main className="min-h-screen w-full bg-[#FAF7F0] dark:bg-[#1c1814]" />
  );
}