import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Exhibition Archive")
    .items([
      // Singleton: Site Settings & Identity
      S.listItem()
        .title("Site Settings & Identity")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings & Identity")
        ),

      S.divider(),

      // All Photograph Plates
      S.documentTypeListItem("photograph").title("Photographs (Plates)"),

      // All Travel Collections / Journeys
      S.documentTypeListItem("collection").title(
        "Travel Journeys (Collections)"
      ),
    ]);
