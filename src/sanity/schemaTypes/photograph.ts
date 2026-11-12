import { defineField, defineType } from "sanity";

export const photograph = defineType({
  name: "photograph",
  title: "Photograph (Plate)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Exhibition plate title (e.g., Morning Mist on Alpine Waters).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-safe identifier generated from the title.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "plateNumber",
      title: "Plate Number",
      type: "string",
      description: "Exhibition plate indicator (e.g., PLATE 00, PLATE 01).",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Sequence order in the main gallery archive and lists.",
      validation: (Rule) => Rule.required().integer().min(0),
      initialValue: 1,
    }),
    defineField({
      name: "image",
      title: "Photograph Image Asset",
      type: "image",
      description: "High-resolution photographic file. Hotspot enables focal point cropping.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Descriptive accessibility text for screen readers.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Editorial Caption",
          type: "string",
          description: "Short caption displayed in plate modals and previews.",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect Ratio Override",
      type: "string",
      description: "Target presentation aspect ratio. If unset, original asset ratio is used.",
      options: {
        list: [
          { title: "4:5 (Fine Art Portrait)", value: "4:5" },
          { title: "16:9 (Cinematic Landscape)", value: "16:9" },
          { title: "1:1 (Square Study)", value: "1:1" },
          { title: "2.39:1 (Anamorphic Panoramic)", value: "2.39:1" },
          { title: "3:2 (Classic 35mm)", value: "3:2" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "category",
      title: "Subject / Genre Category",
      type: "string",
      description: "Primary photographic classification for gallery filtering.",
      options: {
        list: [
          { title: "Landscapes", value: "Landscapes" },
          { title: "Travel & Streets", value: "Travel & Streets" },
          { title: "Nature & Wildlife", value: "Nature & Wildlife" },
          { title: "People & Portraits", value: "People & Portraits" },
          { title: "Architecture", value: "Architecture" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Travel Journey / Collection",
      type: "reference",
      to: [{ type: "collection" }],
      description: "Optional assignment to a curated travel journey monograph.",
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      description: "Showcase in the curated selection on the homepage (Section 02).",
      initialValue: false,
    }),
    defineField({
      name: "isHero",
      title: "Hero Exhibition Prologue (Plate 00)",
      type: "boolean",
      description: "Designate this photograph as the monumental hero visual on the homepage.",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Curatorial Dossier / Essay",
      type: "text",
      rows: 4,
      description: "Curatorial text describing the light, environment, and background.",
    }),
    defineField({
      name: "notes",
      title: "Photographer's Notes",
      type: "text",
      rows: 3,
      description: "Personal creative thoughts, conditions, or technical reflections.",
    }),
    defineField({
      name: "location",
      title: "Geographic Location",
      type: "object",
      fields: [
        defineField({
          name: "placename",
          title: "Place Name",
          type: "string",
          description: "Specific landmark or location name (e.g., Mono Basin).",
        }),
        defineField({
          name: "region",
          title: "Region / State / Province",
          type: "string",
          description: "Regional identifier (e.g., Eastern Sierra, California).",
        }),
        defineField({
          name: "country",
          title: "Country",
          type: "string",
          description: "Country name.",
        }),
      ],
    }),
    defineField({
      name: "captureDate",
      title: "Capture Date",
      type: "date",
      description: "Optional calendar date when the photograph was taken (YYYY-MM-DD).",
    }),
    defineField({
      name: "cameraExif",
      title: "Verified Camera EXIF Telemetry",
      type: "object",
      description:
        "All telemetry fields are strictly optional. Only enter verified data captured for this specific photograph. Unset fields will remain hidden.",
      fields: [
        defineField({
          name: "cameraModel",
          title: "Camera Body",
          type: "string",
          description: "Specific camera body used (e.g., Canon EOS R6 Mark III). Leave blank if unverified.",
        }),
        defineField({
          name: "lens",
          title: "Lens Model",
          type: "string",
          description: "Specific lens used (e.g., RF 24-70mm f/2.8L IS USM). Leave blank if unverified.",
        }),
        defineField({
          name: "focalLength",
          title: "Focal Length",
          type: "string",
          description: "e.g., 24mm, 50mm, 85mm",
        }),
        defineField({
          name: "aperture",
          title: "Aperture",
          type: "string",
          description: "e.g., f/2.8, f/5.6, f/8",
        }),
        defineField({
          name: "shutterSpeed",
          title: "Shutter Speed",
          type: "string",
          description: "e.g., 1/250s, 1/1000s, 2s",
        }),
        defineField({
          name: "iso",
          title: "ISO Sensitivity",
          type: "string",
          description: "e.g., ISO 100, ISO 400",
        }),
      ],
    }),
    defineField({
      name: "isPlaceholder",
      title: "Is Sample / Placeholder",
      type: "boolean",
      description: "Mark true only for temporary sample images pending authentic photo upload.",
      initialValue: false,
    }),
    defineField({
      name: "sampleNote",
      title: "Sample Disclaimer Note",
      type: "string",
      description: "Notice displayed on placeholder plates (e.g., Temporary Sample Image).",
    }),
  ],
  preview: {
    select: {
      title: "title",
      plateNumber: "plateNumber",
      category: "category",
      media: "image",
      isPlaceholder: "isPlaceholder",
    },
    prepare({ title, plateNumber, category, media, isPlaceholder }) {
      const prefix = plateNumber ? `${plateNumber} · ` : "";
      const subtitle = [category, isPlaceholder ? "[Placeholder]" : ""]
        .filter(Boolean)
        .join(" ");
      return {
        title: `${prefix}${title}`,
        subtitle: subtitle || "No Category",
        media,
      };
    },
  },
});
