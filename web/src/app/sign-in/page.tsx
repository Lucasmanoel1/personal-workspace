"use client"

import { signIn } from "next-auth/react"

export default function SignInPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Entrar</h1>
      <p>Use sua conta do workspace para acessar os serviços.</p>
      <button
        onClick={() => signIn("auth0")}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Entrar com Auth0
      </button>
    </main>
  )
}
