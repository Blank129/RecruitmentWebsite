import type { Metadata } from "next";
import "../../styles/globals.css";
import { AuthProvider } from "../context/authContext";
import { JobProvider } from "../context/jobContext";
//import HomeCmsPageContent from "../../cms/home/page";
export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <JobProvider>{children}</JobProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
