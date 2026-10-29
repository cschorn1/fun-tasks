import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FunTasks",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
