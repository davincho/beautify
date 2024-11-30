import { useState } from "react";
import { TextInput } from "./../components/TextInput";

import { useNavigate } from "@tanstack/react-router";
import { compressToEncodedURIComponent } from "lz-string";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-1/2">
      <header className="mb-8">
        <h1 className="text-4xl font-bold relative w-fit block">
          🦄
          <span
            className="ml-2
              text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 border-r-emerald-600"
          >
            Beautify
            <span className="ml-2 type-texts" />
          </span>
        </h1>

        <p className="text-slate-600 mt-2 text-2xl">
          Universal text beautification with zero data transfer 🔒 and smart
          format detection 🧠
        </p>
        <p className="text-slate-600 mt-2 text-xl">
          Paste, detect, beautify. ✨
        </p>
      </header>

      <div className="space-y-6 h-72">
        <TextInput
          value={inputText}
          onChange={setInputText}
          onFormat={(text, format) =>
            navigate({
              to: "/format",
              search: { format },
              hash: compressToEncodedURIComponent(text),
            })
          }
        />
      </div>
    </div>
  );
}
