"use client";

import React from "react";
import { InputFile } from "@/components/InputFile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-4 bg-primary">
      <InputFile />
    </main>
  );
}
