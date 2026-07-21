import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";

export const metadata = {
  title: "Internova — Where Talent Meets Opportunity",
  description:
    "AI-powered, blockchain-verified internship management platform. Connecting students, faculty mentors, and industry partners on a unified digital ecosystem.",
  keywords:
    "internship management, AI matching, blockchain verification, student tracking, placement, skill gap analysis",
  authors: [{ name: "Team Internova" }],
  openGraph: {
    title: "Internova — Where Talent Meets Opportunity",
    description:
      "The next-gen internship intelligence platform for smarter ecosystems.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#06070a" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
