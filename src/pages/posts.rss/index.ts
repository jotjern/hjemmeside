import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts");

  return rss({
    title: "jotjern.no blog posts",
    description: "Jo Gramnæs Tjernshaugen's blog posts",
    site: "https://jotjern.no",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      customData: `<language>nb-no</language>`,
      link: `/posts/${post.id}`,
    })),
    customData: `<language>nb-no</language>`,
  });
}
