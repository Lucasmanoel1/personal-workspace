import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/sign-in",
  },
})

export const config = {
  matcher: [
    // Protege tudo, EXCETO:
    // - /api/auth (rotas internas do NextAuth)
    // - /sign-in
    // - /portfolio
    // - assets do Next e favicon
    "/((?!api/auth|sign-in|portfolio|_next/static|_next/image|favicon.ico).*)",
  ],
}
