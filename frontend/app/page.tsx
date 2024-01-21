"use client";

import React, { useRef, useState, useEffect } from "react";
import { InputFile } from "@/components/InputFile";

import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-4 bg-primary">
      <div className="flex flex-col items-center justify-center w-3/4 mx-auto">
        <InputFile />
      </div>
    </main>
  );
}
