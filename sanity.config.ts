import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { deskStructure } from "./src/sanity/structure";
import { projectId, dataset } from "./src/sanity/env";

export default defineConfig({
  name: "default",
  title: "Harikrishnan Photography Archive",
  // Fallback string prevents build crashes when env variables are not yet configured in local dev
  projectId: projectId || "placeholder-project-id",
  dataset: dataset || "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
