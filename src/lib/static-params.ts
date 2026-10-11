// The build needs at least one page per dynamic route. When Sanity has no
// documents of a type yet, this placeholder slug renders the "not found" page.
export function staticSlugs(documents: { slug: string }[]) {
  if (documents.length === 0) return [{ slug: "none-yet" }];
  return documents.map(({ slug }) => ({ slug }));
}
