import { Suspense } from "react";
import AssistantClient from "./AssistantClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading AI...</div>}>
      <AssistantClient />
    </Suspense>
  );
}