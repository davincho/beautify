import { useState } from "react";
import { detectFormat } from "../utils/detectFormat";

interface TextInputProps {
  value: string;
  onChange: (text: string, format: ReturnType<typeof detectFormat>) => void;
  onFormat?: (text: string, format: ReturnType<typeof detectFormat>) => void;
}

export function TextInput({ value, onChange, onFormat }: TextInputProps) {
  const [detectedFormat, setDetectedFormat] =
    useState<ReturnType<typeof detectFormat>>("html");
  const [selectedFormat, setSelectedFormat] = useState<
    "auto" | ReturnType<typeof detectFormat>
  >("auto");

  const formats = [
    "auto",
    "typescript",
    "tsx",
    "javascript",
    "jsx",
    "json",
    "babel",
    "html",
  ] as const;

  const handleChange = (text: string) => {
    const format =
      selectedFormat === "auto" ? detectFormat(text) : selectedFormat;
    onChange(text, format);
    if (selectedFormat === "auto") {
      setDetectedFormat(detectFormat(text));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatToUse =
      selectedFormat === "auto" ? detectedFormat : selectedFormat;
    onFormat?.(value, formatToUse);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col gap-2">
      <div className="relative h-full">
        <textarea
          className="w-full h-full bg-slate-800 border border-slate-700 rounded-lg p-4 font-mono 
                     text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent resize-y"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Paste your text here..."
          required
          minLength={1}
        />
        <select
          value={selectedFormat}
          onChange={(e) =>
            setSelectedFormat(e.target.value as typeof selectedFormat)
          }
          className="absolute top-2 right-2 px-2 py-1 rounded-md bg-slate-700 
                   text-xs font-medium text-slate-200 opacity-80 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500"
        >
          {formats.map((format) => (
            <option key={format} value={format}>
              {format === "auto"
                ? `Auto (${detectedFormat.toUpperCase()})`
                : format.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {onFormat && (
        <div className="w-full flex flex-col space-y-6">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg 
                     font-semibold text-white shadow-lg hover:from-blue-700 hover:to-emerald-700 
                     transition-all duration-200 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Beautify{" "}
            {selectedFormat === "auto" ? detectedFormat : selectedFormat}
          </button>
        </div>
      )}
    </form>
  );
}
