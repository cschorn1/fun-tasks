import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FunTasks",
  description:
    "Organize suas tarefas com o FunTasks. Crie, edite, priorize e acompanhe suas atividades em um só lugar.",
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
