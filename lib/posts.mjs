import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { unified } from "unified";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { wikiToMDLinks } from "./remarkWikilinks";

// import MDXFileLoader from "../mdx-file-loader";

export function getFileData(filename) {
  const arr = filename.split(".");
  const type = arr.pop();
  const id = arr.join(".");
  return {
    id,
  };
}

export function getSortedData(dir) {
  const fileNames = getFilesRecursively(dir);
  const allRulesData = fileNames.map((fileName) => {
    const data = getFileData(fileName);

    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id: data.id,
      ...matterResult.data,
    };
  });

  // Sort rules by date
  return allRulesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getData(dir, id) {
  let fullPath = path.join(dir, `${id}.md`);
  let type = "md";
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(dir, `${id}.mdx`);
    type = "mdx";
  }
  if (!fs.existsSync(fullPath)) return null;

  let fileContents = fs.readFileSync(fullPath, "utf8");
  let matterResult = matter(fileContents);
  let doc = await wikiToMDLinks(matterResult.content);

  let processedContent;
  let contentHtml;
  switch (type) {
    case "mdx":
      processedContent = await unified()
        .use(remarkParse)
        .use(remarkMdx)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(doc);

      contentHtml = processedContent.toString();
      break;
    case "md":
      processedContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(doc);

      contentHtml = processedContent.toString();

      break;
  }

  console.log(contentHtml);
  return {
    id,
    content: contentHtml,
    type,
    fullPath,
    ...matterResult.data,
  };
}

export function getAllIds(dir) {
  const fileNames = getFilesRecursively(dir);

  return fileNames.map((fileName) => {
    const data = getFileData(fileName);
    return {
      params: {
        id: data.id,
      },
    };
  });
}

export function getFilesRecursively(dir) {
  let files = [];
  const filesInDirectory = fs.readdirSync(dir);
  for (const file of filesInDirectory) {
    const absolute = path.join(dir, file);
    if (fs.statSync(absolute).isDirectory()) {
      files.push(getFilesRecursively(absolute));
    } else if (
      path.extname(absolute).endsWith("md") ||
      path.extname(absolute).endsWith("mdx")
    ) {
      files.push(path.relative(dir, absolute));
    }
  }
  return files;
}
