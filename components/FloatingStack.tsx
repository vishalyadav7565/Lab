"use client";

import AIChatWidget from "./AIChatWidget";
import WhatsAppButton from "./WhatsAppButton";
import FacebookButton from "./FacebookButton";
import MailButton from "./MailButton";

export default function FloatingStack() {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

      <AIChatWidget />
      <FacebookButton />
      <WhatsAppButton />
      <MailButton/>

    </div>
  );
}