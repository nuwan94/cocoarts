import { defineField, defineType } from "sanity";

import { richTextMembers } from "./richText";

export const artist = defineType({
  name: "artist",
  title: "Artist",
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
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "location",
      type: "string",
      description: "Village, town or district, e.g. Hikkaduwa, Galle",
    }),
    defineField({
      name: "intro",
      title: "Short introduction",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the artists list.",
    }),
    defineField({
      name: "story",
      type: "array",
      description:
        "The artist's story: how they started, how they work, what they are known for.",
      of: richTextMembers,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "location", media: "photo" },
  },
});
