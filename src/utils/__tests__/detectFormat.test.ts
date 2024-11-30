import { describe, it, expect } from "vitest";
import { detectFormat } from "../detectFormat";

describe("detectFormat", () => {
  it("should detect JSON format", () => {
    const jsonSamples = [
      '{"name": "test"}',
      "[1, 2, 3]",
      '{"nested": {"object": true}}',
      "[]",
      "{}",
    ];

    jsonSamples.forEach((sample) => {
      expect(detectFormat(sample)).toBe("json");
    });
  });

  it("should detect HTML format", () => {
    const htmlSamples = [
      "<div>Hello</div>",
      '<p class="test">Content</p>',
      "<br />",
      "<custom-element></custom-element>",
    ];

    htmlSamples.forEach((sample) => {
      expect(detectFormat(sample)).toBe("html");
    });
  });

  it("should detect CSS format", () => {
    const cssSamples = [
      ".class { color: red; }",
      "body { margin: 0; padding: 0; }",
      "@media (max-width: 768px) { .class { display: none; } }",
      "#id { background-color: #fff; }",
    ];

    cssSamples.forEach((sample) => {
      expect(detectFormat(sample)).toBe("css");
    });
  });

  it("should detect JavaScript/TypeScript format", () => {
    const jsSamples = [
      "function test() { return true; }",
      "const x = 42;",
      "let array = [];",
      'var oldVar = "test";',
      'import React from "react";',
      "export const Component = () => {};",
      "class MyClass {}",
      "interface MyInterface {}",
    ];

    jsSamples.forEach((sample) => {
      expect(detectFormat(sample)).toBe("javascript");
    });
  });

  it('should return "text" for unrecognized formats', () => {
    const textSamples = [
      "Hello, world!",
      "123456",
      "Just some random text",
      "",
      "   ",
    ];

    textSamples.forEach((sample) => {
      expect(detectFormat(sample)).toBe("text");
    });
  });

  it("should handle whitespace correctly", () => {
    const samples = [
      '   {"name": "test"}   ', // JSON with whitespace
      "\n\n<div>Hello</div>\n\n", // HTML with newlines
      "  .class { color: red; }  ", // CSS with spaces
      "\tconst x = 42;\t", // JavaScript with tabs
    ];

    expect(detectFormat(samples[0])).toBe("json");
    expect(detectFormat(samples[1])).toBe("html");
    expect(detectFormat(samples[2])).toBe("css");
    expect(detectFormat(samples[3])).toBe("javascript");
  });

  it("should handle invalid JSON correctly", () => {
    const invalidJson = '{"name": "test"'; // Missing closing brace
    expect(detectFormat(invalidJson)).not.toBe("json");
  });
});
