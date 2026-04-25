import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import FloatingStack from "@/components/FloatingStack";



export const metadata: Metadata = {
  title: "Lab",
  description: "Healthcare Diagnostic Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">

        {/* ✅ Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        {children}

        {/* 🔥 FLOATING STACK (RIGHT SIDE) */}
       <FloatingStack/>
      </body>
    </html>
  );
}