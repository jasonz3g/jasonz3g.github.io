import { getCollection } from "astro:content";

const staticPaths = ["/", "/archives/"];

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(context) {
  const site = context.site?.toString() ?? "https://jasonz3g.github.io/";
  const posts = await getCollection("blog");
  const years = [...new Set(posts.map((post) => post.data.date.getFullYear()))];
  const months = [
    ...new Set(
      posts.map((post) => {
        const year = post.data.date.getFullYear();
        const month = String(post.data.date.getMonth() + 1).padStart(2, "0");
        return `/archives/${year}/${month}/`;
      }),
    ),
  ];
  const categories = [
    ...new Set(
      posts
        .map((post) => post.data.category)
        .filter((category): category is string => Boolean(category))
        .map((category) => `/categories/${category}/`),
    ),
  ];

  const paths = [
    ...staticPaths,
    ...years.map((year) => `/archives/${year}/`),
    ...months,
    ...categories,
    ...posts.map((post) => `/${post.data.permalink}/`),
  ];

  const urls = paths
    .map((path) => new URL(path, site).toString())
    .map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`)
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
