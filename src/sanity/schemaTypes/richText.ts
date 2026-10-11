import { defineArrayMember, defineField } from "sanity";

// Shared rich text editor: headings, lists, quotes, links and inline photos.
export const richTextMembers = [
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
];
