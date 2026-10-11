import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      type: "array",
      description: "The first image is used on product cards.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "One or two sentences shown next to the price.",
    }),
    defineField({
      name: "details",
      title: "Detailed description",
      type: "array",
      description:
        "The full story: how it's made, materials, care instructions. Supports headings, lists, links, quotes and photos.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bulleted list", value: "bullet" },
            { title: "Numbered list", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "dimensions",
      type: "string",
      description: "e.g. 12 cm × 8 cm",
    }),
    defineField({
      name: "madeBy",
      title: "Made by",
      type: "string",
      description: "Artisan or workshop name (optional)",
    }),
    defineField({
      name: "inStock",
      title: "In stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured on home page",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category.title", media: "images.0" },
  },
});
