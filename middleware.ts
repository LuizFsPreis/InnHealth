import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { authRoutePrefix, dashboardRoute } from "./lib/routes";
import { signOut } from "next-auth/react";

export default withAuth(
  async function middleware({ headers, nextUrl, nextauth: { token } }) {
    const { pathname } = nextUrl;

    if (token?.sub) {
      if (pathname.startsWith(authRoutePrefix))
        return NextResponse.redirect(new URL(dashboardRoute, nextUrl));
    }
  },
  {
    callbacks: {
      authorized: ({
        req: {
          nextUrl: { pathname },
        },
        token,
      }) => {
        if (!token?.sub) return false;
        return true;
      },
    },
  }
);

export const config = { matcher: ["/perfil/:path*", '/empresa/cadastro'] };
