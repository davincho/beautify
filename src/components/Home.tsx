import { useState } from "react";
import * as prettierStandalone from "prettier/standalone";
import * as prettierBabel from "prettier/parser-babel";
import * as prettierEstree from "prettier/plugins/estree";
import * as LZString from "lz-string";

export function Home() {
  const [inputText, setInputText] = useState(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return "";
    try {
      return LZString.decompressFromEncodedURIComponent(hash) || "";
    } catch {
      return "";
    }
  });
  const [formattedText, setFormattedText] = useState("");
  const [detectedFormat, setDetectedFormat] = useState<string>("text");

  const detectFormat = (text: string): string => {
    // Remove leading/trailing whitespace
    const trimmed = text.trim();

    // Check for JSON
    try {
      JSON.parse(trimmed);
      return "json";
    } catch {}

    // Check for HTML
    if (/<[a-z][\s\S]*>/i.test(trimmed)) {
      return "html";
    }

    // Check for CSS
    if (/{[\s\S]*}/.test(trimmed) && /[\w-]+\s*:/.test(trimmed)) {
      return "css";
    }

    // Check for JavaScript/TypeScript
    if (/function|const|let|var|import|export|class|interface/.test(trimmed)) {
      return "javascript";
    }

    return "text";
  };

  const formatText = async () => {
    try {
      const format = detectFormat(inputText);
      setDetectedFormat(format);

      const formatted = await prettierStandalone.format(inputText, {
        parser: format === "json" ? "json" : "babel", // Use appropriate parser
        plugins: [prettierBabel, prettierEstree],
        semi: true,
        singleQuote: true,
      });

      setFormattedText(formatted);
      const compressed = LZString.compressToEncodedURIComponent(inputText);
      window.location.hash = compressed;
    } catch (error) {
      console.error("Formatting error:", error);
      setFormattedText("Error formatting text");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-100 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
              Beautifier
            </span>
            🦄
          </h1>

          <p className="text-slate-400 mt-2">
            Paste your code, format it, and share the URL with others.
          </p>
        </header>

        <div className="space-y-6">
          <div className="relative">
            <textarea
              className="w-full h-64 bg-slate-800 border border-slate-700 rounded-lg p-4 font-mono 
                         text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent resize-y"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setDetectedFormat(detectFormat(e.target.value));
              }}
              placeholder="Paste your code here..."
            />
            {detectedFormat && (
              <div
                className="absolute top-2 right-2 px-2 py-1 rounded-md bg-slate-700 
                            text-xs font-medium text-slate-200 opacity-80"
              >
                {detectedFormat.toUpperCase()}
              </div>
            )}
          </div>

          <button
            onClick={formatText}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg 
                     font-semibold text-white shadow-lg hover:from-blue-600 hover:to-emerald-600 
                     transition-all duration-200 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Format Code
          </button>

          {formattedText && (
            <div className="mt-6">
              <h2 className="text-xl font-bold ">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                  Formatted Code
                </span>
              </h2>
              <pre className="mt-2 bg-slate-800 border border-slate-700 rounded-lg p-4 font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                {formattedText}
              </pre>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-slate-400 text-sm">
          <p>Share your formatted code by copying the URL</p>
        </footer>
      </div>
    </div>
  );
}
