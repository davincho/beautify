import { createFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { TextInput } from "../components/TextInput";
import { CodeFormatter } from "../components/CodeFormatter";
import { useState } from "react";
import {
  decompressFromEncodedURIComponent,
  compressToEncodedURIComponent,
} from "lz-string";
import { type FormatType } from "../utils/detectFormat";

export const Route = createFileRoute("/format")({
  component: Format,
  validateSearch: z.object({
    format: z.enum([
      "acorn",
      "angular",
      "babel-flow",
      "babel-ts",
      "babel",
      "css",
      "espree",
      "flow",
      "glimmer",
      "graphql",
      "html",
      "json-stringify",
      "json",
      "json5",
      "jsonc",
      "less",
      "lwc",
      "markdown",
      "mdx",
      "meriyah",
      "scss",
      "typescript",
      "vue",
      "yaml",
    ] as const satisfies readonly FormatType[]),
  }).parse,
});

export function Format() {
  const router = useRouter();
  const [inputText, setInputText] = useState(() => {
    const hash = router.state.location.hash;
    if (hash) {
      try {
        return decompressFromEncodedURIComponent(hash) || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  return (
    <div className="flex h-full gap-3">
      <div className="flex-1">
        <TextInput
          value={inputText}
          onChange={(newText, format) => {
            setInputText(newText);
            router.navigate({
              to: "/format",
              hash: newText ? compressToEncodedURIComponent(newText) : "",
              search: {
                format,
              },
            });
          }}
        />
      </div>
      <div className="flex-1">
        <CodeFormatter inputText={inputText} />
      </div>
    </div>
  );
}
