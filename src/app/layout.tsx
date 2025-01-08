"use client";
import { UserProvider } from "@/context/UserContext";
import ApolloClientProvider from "./components/ApolloClientProvider";
import Navbar from "./components/Navbar";
import "./globals.css";
import { NotesProvider } from "@/context/NotesContext";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloClientProvider>
          <UserProvider>
            <NotesProvider>
              <ToastContainer autoClose={3000} />
              <Navbar />
              {children}
            </NotesProvider>
          </UserProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
