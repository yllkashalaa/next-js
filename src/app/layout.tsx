import Link from "next/link";
import "../styles/globals.css";
import ThemeToggle from "components/ThemeToggle";

export const metadata = {
  title: "Tash Management",
  description: "Task Management using NEXT.JS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <header className="header">
            <Link className="link" href="/">Task Management</Link>
            <ThemeToggle />
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
