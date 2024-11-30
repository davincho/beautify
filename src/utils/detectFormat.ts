export type FormatType =
  | "acorn"
  | "angular"
  | "babel-flow"
  | "babel-ts"
  | "babel"
  | "css"
  | "espree"
  | "flow"
  | "glimmer"
  | "graphql"
  | "html"
  | "json-stringify"
  | "json"
  | "json5"
  | "jsonc"
  | "less"
  | "lwc"
  | "markdown"
  | "mdx"
  | "meriyah"
  | "scss"
  | "typescript"
  | "vue"
  | "yaml";

export function detectFormat(text: string): FormatType {
  // Remove leading/trailing whitespace
  const trimmed = text.trim();

  if (trimmed === "") {
    return "babel"; // Default to babel for empty text
  }

  // Check for JSON formats
  try {
    const firstChar = trimmed[0];
    const lastChar = trimmed[trimmed.length - 1];
    if (
      (firstChar === "{" && lastChar === "}") ||
      (firstChar === "[" && lastChar === "]")
    ) {
      JSON.parse(trimmed);
      // Check for JSON with comments
      if (trimmed.includes("//") || trimmed.includes("/*")) {
        return "jsonc";
      }
      return "json";
    }
  } catch {
    /* empty */
  }

  // Check for YAML
  if (
    /^(---|[\w-]+:\s|[\w-]+:\n\s+[\w-]+:)/i.test(trimmed) &&
    !trimmed.includes("{") &&
    !trimmed.includes("<")
  ) {
    return "yaml";
  }

  // Check for HTML/Vue
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    if (/<template|<script|<style/.test(trimmed)) {
      return "vue";
    }
    return "html";
  }

  // Check for CSS/SCSS/Less
  if (/{[\s\S]*}/.test(trimmed) && /[\w-]+\s*:/.test(trimmed)) {
    if (trimmed.includes("@import") || trimmed.includes("$")) {
      return "scss";
    }
    if (trimmed.includes("@import") || trimmed.includes("@variable")) {
      return "less";
    }
    return "css";
  }

  // Check for GraphQL
  if (
    /^(query|mutation|subscription|type|input|interface|enum|schema)\s/.test(
      trimmed
    )
  ) {
    return "graphql";
  }

  // Check for Markdown/MDX
  if (trimmed.startsWith("#") || /^[-*]\s/.test(trimmed)) {
    if (trimmed.includes("export") || trimmed.includes("import")) {
      return "mdx";
    }
    return "markdown";
  }

  // Check for TypeScript
  if (/interface\s+\w+|type\s+\w+\s*=|:\s*[A-Z]\w+|<[A-Z]\w+>/.test(trimmed)) {
    return "typescript";
  }

  // Check for Flow
  if (/@flow/.test(trimmed)) {
    return "flow";
  }

  // Check for Angular
  if (/@Component|@Injectable|@NgModule/.test(trimmed)) {
    return "angular";
  }

  // Default to babel for JavaScript and unknown formats
  return "babel";
}
