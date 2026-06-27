import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: "山海 's Blog",
    description: "山海的个人博客",
    site: context.site,
    stylesheet: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.data.permalink}/`,
    })),
    customData: "<language>zh-CN</language>",
  });
}
