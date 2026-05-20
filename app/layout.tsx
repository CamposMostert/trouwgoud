import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trouwgoud",
  description: "Voor jullie mooiste belofte",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}