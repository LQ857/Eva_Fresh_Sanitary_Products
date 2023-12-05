import "./globals.css";
import { AuthProvider } from "./Providers";

export const metadata = {
  title: "EvaFresh",
  description: "A website for selling sanitary products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>{children}</AuthProvider>
    </html>
  );
}
