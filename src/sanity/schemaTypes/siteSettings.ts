import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Identity",
  type: "document",
  fields: [
    defineField({
      name: "photographerName",
      title: "Photographer Name",
      type: "string",
      description: "Primary personal brand name displayed in header, hero, and colophon.",
      initialValue: "Harikrishnan Nandanan",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Personal Tagline",
      type: "string",
      description: "e.g., Photography · Travel · Visual Stories",
      initialValue: "Photography · Travel · Visual Stories",
    }),
    defineField({
      name: "siteTitle",
      title: "Browser Tab Site Title",
      type: "string",
      description: "Default title metadata template for the website.",
      initialValue: "Harikrishnan Nandanan — Photography · Travel · Visual Stories",
    }),
    defineField({
      name: "personalIntro",
      title: "Homepage Editorial Premise",
      type: "text",
      rows: 3,
      description: "Curatorial premise paragraph displayed in Homepage Section 01.",
      initialValue:
        "A personal photography archive and visual exhibition — documenting travel journeys, wild landscapes, city streets, and quiet everyday moments.",
    }),
    defineField({
      name: "aboutBio",
      title: "Personal Biography Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "Paragraphs detailing your personal background, creative travel ethos, and hobbyist identity.",
    }),
    defineField({
      name: "portrait",
      title: "Personal Photographer Portrait",
      type: "image",
      description: "Personal portrait of Harikrishnan Nandanan to replace the temporary geometric placeholder frame in the About section.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Accessibility text (e.g., Harikrishnan Nandanan portrait).",
        }),
      ],
    }),
    defineField({
      name: "camera",
      title: "Personal Camera Gear",
      type: "object",
      description: "Attribution of your personal primary camera equipment.",
      fields: [
        defineField({
          name: "model",
          title: "Camera Model",
          type: "string",
          description: "Your verified personal camera body.",
          initialValue: "Canon EOS R6 Mark III",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Hardware Philosophy & Context",
          type: "text",
          rows: 3,
          description: "Reflections on working with the Canon EOS R6 Mark III.",
        }),
      ],
    }),
    defineField({
      name: "contactHeading",
      title: "Connect Section Heading",
      type: "string",
      initialValue: "Let's Connect",
    }),
    defineField({
      name: "contactDescription",
      title: "Connect Section Description",
      type: "text",
      rows: 3,
      initialValue:
        "A personal creative journal. Always happy to connect with fellow travelers, photographers, and curious observers.",
    }),
    defineField({
      name: "emailPlaceholder",
      title: "Contact Email Address",
      type: "string",
      description: "Public contact email displayed in the footer and About section.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social & Directory Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Platform / Name", type: "string" }),
            defineField({ name: "url", title: "URL / Profile Handle", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "placeholderDisclaimer",
      title: "Sample Image Fine-Art Disclaimer",
      type: "text",
      rows: 3,
      description: "Transparency disclaimer displayed for any placeholder/sample assets.",
      initialValue:
        "Temporary curated sample images are displayed to preview editorial layout geometry. Authentic plates captured with the Canon EOS R6 Mark III are marked accordingly.",
    }),
  ],
  preview: {
    select: {
      title: "photographerName",
      subtitle: "tagline",
      media: "portrait",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Site Settings",
        subtitle: subtitle || "Personal Identity & Global Metadata",
        media,
      };
    },
  },
});
