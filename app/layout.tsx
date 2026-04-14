import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab",
  description: "Healthcare Diagnostic Platform",
};
<head>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}