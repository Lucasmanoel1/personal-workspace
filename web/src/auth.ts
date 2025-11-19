import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

// Debug: Verificar se as variáveis estão carregando (Isso vai aparecer no terminal do VSCode)
console.log("Auth Debug - ClientID:", process.env.AUTH0_CLIENT_ID ? "Carregado" : "Faltando");
console.log("Auth Debug - Secret:", process.env.AUTH0_CLIENT_SECRET ? "Carregado" : "Faltando");
console.log("Auth Debug - Issuer:", process.env.AUTH0_ISSUER_BASE_URL ? "Carregado" : "Faltando");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      authorization: { params: { prompt: "login" } }, // Opcional: força o prompt de login
    }),
  ],
  secret: process.env.AUTH_SECRET, // Forçando a leitura explicita do secret
});