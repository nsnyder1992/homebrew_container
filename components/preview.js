import fs from "fs";
import path from "path";
import { VFile, VFileCompatible } from "vfile";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import wikiToMDLinks from "@/lib/wiki-to-md-links.mjs";
import matter from "gray-matter";

export default async function Preview({ link }) {
  return (
    <iframe
      src={link}
      type="text/html"
      width="100%"
      height="10%"
      style={{
        objectFit: "contain",
        objectPosition: "50% 50%",
        overflow: "hidden",
      }}
    />
  );
}

// export default async function Preview({ link }) {
//   let file = path.join(process.cwd(), "./app", link, "/page.mdx");
//   if (!fs.existsSync(file)) return <a href={link}>{link}</a>;

//   let markdown = String(fs.readFileSync(file));
//   const mdxSource = await serialize(markdown, {
//     mdxOptions: {
//       remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, wikiToMDLinks],
//       rehypePlugins: [],
//       format: "mdx",
//     },
//     parseFrontmatter: true,
//   });

//   return <MDXRemote source={mdxSource} />;
// }

async function getMdxLinks() {
  const app = path.join(process.cwd(), "./app");
  const files = fs.readdirSync(app);
  let routes = [];

  for (const file of files) {
    const filePath = path.join(app, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      routes.push(getMdxLinks(filePath));
    } else if (fileStat.isFile() && /(page.md|page.mdx)/g.test(file)) {
      let link = path.relative(app, filePath);
      link.replace("/page.mdx", "");
      link.replace("/page.md", "");
      link = link.replaceAll("\\", "/");
      link = link.replaceAll("..", "");
      if (!link.startsWith(".") && !link.startsWith("/")) link = "/" + link;
      routes[link] = path.relative(app, filePath);
      return routes;
    }
  }

  return routes;
}
