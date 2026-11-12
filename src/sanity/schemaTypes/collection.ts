import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Travel Journey (Collection)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Journey Title",
      type: "string",
      description: "e.g., Wanderings & Wild Places, City Streets & Travel Notes.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-safe journey identifier.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "journeyNumber",
      title: "Journey Indicator",
      type: "string",
      description: "Display label (e.g., JOURNEY 01, JOURNEY 02).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Thematic Subtitle",
      type: "string",
      description: "Concise thematic summary (e.g., The High Sierra & Alpine Solitude).",
    }),
    defineField({
      name: "description",
      title: "Expedition Narrative",
      type: "text",
      rows: 4,
      description: "Curatorial background and narrative description of this travel journey.",
    }),
    defineField({
      name: "coverImage",
      title: "Journey Cover Image",
      type: "image",
      description: "Lead visual for journey cards and expedition dossiers.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Accessibility description for the journey cover image.",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "yearRange",
      title: "Chronological Timeframe",
      type: "string",
      description: "e.g., 2024 — 2026, Autumn 2025.",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Sequence order on the Travel Journeys overview page.",
      validation: (Rule) => Rule.required().integer().min(0),
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "title",
      journeyNumber: "journeyNumber",
      yearRange: "yearRange",
      media: "coverImage",
    },
    prepare({ title, journeyNumber, yearRange, media }) {
      const parts = [journeyNumber, yearRange].filter(Boolean).join(" · ");
      return {
        title: title || "Untitled Journey",
        subtitle: parts,
        media,
      };
    },
  },
});
