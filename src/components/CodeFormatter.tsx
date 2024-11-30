import { useState, useEffect } from "react";
import * as prettierStandalone from "prettier/standalone";
import { detectFormat } from "../utils/detectFormat";

interface CodeFormatterProps {
  inputText: string;
}

const loadPlugins = async (format: string) => {
  const [prettierEstree] = await Promise.all([
    import("prettier/plugins/estree"),
  ]);

  let plugins;
  switch (format) {
    case "typescript":
    case "tsx": {
      const [prettierTypescript] = await Promise.all([
        import("prettier/parser-typescript"),
      ]);
      plugins = [prettierTypescript.default, prettierEstree.default];
      break;
    }

    case "javascript":
    case "jsx":
    case "babel": {
      const [prettierBabel] = await Promise.all([
        import("prettier/parser-babel"),
      ]);
      plugins = [prettierBabel.default, prettierEstree.default];
      break;
    }

    case "json": {
      const [prettierJson] = await Promise.all([
        import("prettier/parser-babel"), // Babel parser can handle JSON
      ]);
      plugins = [prettierJson.default, prettierEstree.default];
      break;
    }

    default: {
      // Default to babel parser if format is not recognized
      const [prettierBabel] = await Promise.all([
        import("prettier/parser-babel"),
      ]);
      plugins = [prettierBabel.default, prettierEstree.default];
      break;
    }
  }
  return plugins;
};

export function CodeFormatter({ inputText }: CodeFormatterProps) {
  const [formattedText, setFormattedText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (formattedText) {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  useEffect(() => {
    const format = async () => {
      try {
        const detectedFormat = detectFormat(inputText);
        const plugins = await loadPlugins(detectedFormat);

        const formatted = await prettierStandalone.format(inputText, {
          parser: detectedFormat,
          plugins,
          semi: true,
          singleQuote: true,
        });
        setFormattedText(formatted);
      } catch (error) {
        console.error("Failed to format text:", error);
        setFormattedText(inputText);
      }
    };

    format();
  }, [inputText]);

  return (
    <>
      {formattedText && (
        <div className="h-full relative">
          <pre
            className="bg-slate-800 border border-slate-700 rounded-lg p-4 font-mono 
                       text-sm text-slate-200 overflow-x-auto whitespace-pre-wrap h-full"
          >
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-3 py-1 rounded-md 
                         bg-slate-700 hover:bg-slate-600 transition-colors
                         text-slate-200 text-sm font-sans"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            {formattedText}
          </pre>
        </div>
      )}
    </>
  );
}
