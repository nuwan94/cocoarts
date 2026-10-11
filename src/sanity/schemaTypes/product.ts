import { defineArrayMember, defineField, defineType } from "sanity";

import { richTextMembers } from "./richText";

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
      of: richTextMembers,
    }),
    defineField({
      name: "dimensions",
      type: "string",
      description: "e.g. 12 cm × 8 cm",
    }),
    defineField({
      name: "artist",
      title: "Made by",
      type: "reference",
      to: [{ type: "artist" }],
      description: "Links the product to the artist's page.",
    }),
    defineField({
      name: "madeBy",
      title: "Made by (old text field)",
      type: "string",
      deprecated: { reason: "Pick an artist in the field above instead." },
      hidden: ({ value }) => !value,
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
