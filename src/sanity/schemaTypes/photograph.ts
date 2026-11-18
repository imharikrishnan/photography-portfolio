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
      description: "Exhibition plate title. Optional — automatically falls back to plate number or identifier if left blank.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-safe identifier. Optional — auto-generated from title, plate number, or document ID if left blank.",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "plateNumber",
      title: "Plate Number",
      type: "string",
      description: "Exhibition plate indicator (e.g., PLATE 00, PLATE 01).",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order (Legacy / Manual Override)",
      type: "number",
      description: "Optional manual sequence order. When omitted, intelligent visual sequencing determines the gallery flow.",
      validation: (Rule) => Rule.integer().min(0),
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
          description: "Descriptive accessibility text for screen readers. Optional — falls back to title, caption, or standard curatorial description.",
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
      description: "Optional photographic classification for gallery filtering. Uncategorized photographs remain fully visible in the visual journal.",
      options: {
        list: [
          { title: "Landscapes", value: "Landscapes" },
          { title: "Travel & Streets", value: "Travel & Streets" },
          { title: "Nature & Wildlife", value: "Nature & Wildlife" },
          { title: "People & Portraits", value: "People & Portraits" },
          { title: "Architecture", value: "Architecture" },
        ],
      },
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
      description: "Designate this photograph as candidate for the monumental hero visual on the homepage.",
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
      name: "visualMetadata",
      title: "Visual & Perceptual Metadata (Automated)",
      type: "object",
      description:
        "Computed perceptual metrics and color palette generated by the visual analysis pipeline. Read-only.",
      readOnly: true,
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "status",
          title: "Analysis Status",
          type: "string",
          options: {
            list: [
              { title: "Pending Analysis", value: "pending" },
              { title: "Analyzed", value: "analyzed" },
              { title: "Failed", value: "failed" },
            ],
          },
          initialValue: "pending",
        }),
        defineField({
          name: "version",
          title: "Pipeline Version",
          type: "number",
          description: "Version of the analysis algorithm used.",
        }),
        defineField({
          name: "sourceAssetRef",
          title: "Source Asset ID",
          type: "string",
          description: "Sanity image asset ID analyzed.",
        }),
        defineField({
          name: "analyzedAt",
          title: "Analyzed At",
          type: "datetime",
          description: "Timestamp when the analysis was performed.",
        }),
        defineField({
          name: "dominantColor",
          title: "Dominant Color",
          type: "object",
          fields: [
            defineField({ name: "hex", title: "Hex", type: "string" }),
            defineField({
              name: "rgb",
              title: "RGB",
              type: "object",
              fields: [
                defineField({ name: "r", type: "number", title: "Red" }),
                defineField({ name: "g", type: "number", title: "Green" }),
                defineField({ name: "b", type: "number", title: "Blue" }),
              ],
            }),
            defineField({
              name: "hsl",
              title: "HSL",
              type: "object",
              fields: [
                defineField({ name: "h", type: "number", title: "Hue" }),
                defineField({ name: "s", type: "number", title: "Saturation" }),
                defineField({ name: "l", type: "number", title: "Lightness" }),
              ],
            }),
            defineField({
              name: "lab",
              title: "CIE L*a*b*",
              type: "object",
              fields: [
                defineField({ name: "l", type: "number", title: "L*" }),
                defineField({ name: "a", type: "number", title: "a*" }),
                defineField({ name: "b", type: "number", title: "b*" }),
              ],
            }),
          ],
        }),
        defineField({
          name: "palette",
          title: "Extracted Color Palette",
          type: "array",
          of: [
            defineField({
              name: "colorSwatch",
              title: "Color Swatch",
              type: "object",
              fields: [
                defineField({ name: "hex", title: "Hex", type: "string" }),
                defineField({
                  name: "rgb",
                  title: "RGB",
                  type: "object",
                  fields: [
                    defineField({ name: "r", type: "number", title: "Red" }),
                    defineField({ name: "g", type: "number", title: "Green" }),
                    defineField({ name: "b", type: "number", title: "Blue" }),
                  ],
                }),
                defineField({
                  name: "hsl",
                  title: "HSL",
                  type: "object",
                  fields: [
                    defineField({ name: "h", type: "number", title: "Hue" }),
                    defineField({ name: "s", type: "number", title: "Saturation" }),
                    defineField({ name: "l", type: "number", title: "Lightness" }),
                  ],
                }),
                defineField({
                  name: "lab",
                  title: "CIE L*a*b*",
                  type: "object",
                  fields: [
                    defineField({ name: "l", type: "number", title: "L*" }),
                    defineField({ name: "a", type: "number", title: "a*" }),
                    defineField({ name: "b", type: "number", title: "b*" }),
                  ],
                }),
                defineField({
                  name: "population",
                  title: "Population Share (0–1)",
                  type: "number",
                }),
                defineField({
                  name: "role",
                  title: "Palette Role",
                  type: "string",
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "brightness",
          title: "Perceptual Brightness (0–1)",
          type: "number",
        }),
        defineField({
          name: "contrast",
          title: "Perceptual Contrast (0–1)",
          type: "number",
        }),
        defineField({
          name: "saturation",
          title: "Mean Saturation (0–1)",
          type: "number",
        }),
        defineField({
          name: "colorTemperature",
          title: "Color Temperature (Warmth)",
          type: "number",
          description: "Estimated warmth/temperature value.",
        }),
        defineField({
          name: "colorFamily",
          title: "Computed Color Family",
          type: "string",
          options: {
            list: [
              { title: "Monochrome / B&W", value: "monochrome" },
              { title: "Warm Earth & Ochre", value: "warm-earth" },
              { title: "Cool Slate & Azure", value: "cool-slate" },
              { title: "Emerald & Botanical", value: "emerald-forest" },
              { title: "Golden Hour & Amber", value: "golden-hour" },
              { title: "Crimson & Deep Red", value: "crimson-accent" },
              { title: "Deep Night & Twilight", value: "deep-night" },
              { title: "High-Key & Ethereal", value: "high-key-light" },
              { title: "Muted & Neutral", value: "muted-neutral" },
            ],
          },
        }),
        defineField({
          name: "orientation",
          title: "Geometric Orientation",
          type: "string",
          options: {
            list: [
              { title: "Portrait (Vertical)", value: "portrait" },
              { title: "Landscape (Horizontal)", value: "landscape" },
              { title: "Square (1:1)", value: "square" },
            ],
          },
        }),
        defineField({
          name: "aspectRatioNumeric",
          title: "Numeric Aspect Ratio (W/H)",
          type: "number",
        }),
        defineField({
          name: "error",
          title: "Analysis Error Information",
          type: "string",
          description: "Error message if pipeline analysis failed.",
        }),
      ],
    }),
    defineField({
      name: "curationControls",
      title: "Curatorial Overrides",
      type: "object",
      description: "Manual curation controls that take precedence over automated visual sequencing.",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "pinnedPosition",
          title: "Pinned Gallery Position",
          type: "number",
          description: "Optional 1-indexed fixed position in the gallery sequence (e.g., 1, 2, 5). Overrides automated sequencing.",
          validation: (Rule) => Rule.integer().min(1),
        }),
        defineField({
          name: "forcePunctuation",
          title: "Force Punctuation Plate",
          type: "boolean",
          description: "Mark this photograph as an intentional visual pause / contrast break in the exhibition rhythm.",
          initialValue: false,
        }),
        defineField({
          name: "manualColorFamily",
          title: "Manual Color Family Override",
          type: "string",
          description: "Manually override the automated color family classification.",
          options: {
            list: [
              { title: "Monochrome / B&W", value: "monochrome" },
              { title: "Warm Earth & Ochre", value: "warm-earth" },
              { title: "Cool Slate & Azure", value: "cool-slate" },
              { title: "Emerald & Botanical", value: "emerald-forest" },
              { title: "Golden Hour & Amber", value: "golden-hour" },
              { title: "Crimson & Deep Red", value: "crimson-accent" },
              { title: "Deep Night & Twilight", value: "deep-night" },
              { title: "High-Key & Ethereal", value: "high-key-light" },
              { title: "Muted & Neutral", value: "muted-neutral" },
            ],
          },
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
      colorFamily: "visualMetadata.colorFamily",
    },
    prepare({ title, plateNumber, category, media, isPlaceholder, colorFamily }) {
      const displayTitle =
        title?.trim() ||
        (plateNumber ? `Plate ${plateNumber}` : "Untitled Plate");
      const classification =
        category ||
        (colorFamily ? `Palette: ${colorFamily}` : "Uncategorized");
      const subtitle = [classification, isPlaceholder ? "[Placeholder]" : ""]
        .filter(Boolean)
        .join(" · ");
      return {
        title: displayTitle,
        subtitle,
        media,
      };
    },
  },
});
