import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import createMDX from "@next/mdx";
import wikiToMDLinks from "./lib/wiki-to-md-links.mjs";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, wikiToMDLinks],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
