// src/middleware.ts
import { auth } from "@/auth";

export default auth((req) => {
  const isLogged = !!req.auth;
  const { nextUrl } = req;

  const publicRoutes = ["/portfolio", "/api/auth", "/signin-auto"]; // Adicione /signin-auto nas públicas
  const isPublic = publicRoutes.some((path) => nextUrl.pathname.startsWith(path));

  if (!isLogged && !isPublic) {
    const callbackUrl = encodeURIComponent(nextUrl.href);
    
    // A MUDANÇA: Redireciona para nossa página fantasma
    return Response.redirect(
      new URL(`/signin-auto?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};