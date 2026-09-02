import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Streakly — Build Habits. Track Progress. Stay Consistent.",
  description:
    "Streakly helps you build and maintain positive habits by tracking your daily progress, streaks, and completion rates.",
  keywords: ["habit tracker", "streaks", "productivity", "daily habits", "consistency"],
  openGraph: {
    title: "Streakly",
    description: "Build habits. Track progress. Stay consistent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
