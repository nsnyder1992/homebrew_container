// import { insertLink } from "./insert-link";
import { fromMarkdown } from "mdast-util-from-markdown";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function wikiToMDLinks(options) {
  const self = this;
  self.options = options;
  self.parser = parser;

  function parser(document, file) {
    document = replace(document, file, self.options);

    return fromMarkdown(document, {
      ...self.data("settings"),
      ...options,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: self.data("micromarkExtensions") || [],
      mdastExtensions: self.data("fromMarkdownExtensions") || [],
    });
  }
}

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

export function replace(document, file, options) {
  const dir = options && options.dir ? options.dir : process.cwd();
  const imports = {};

  if (
    !/{\s?frontmatter\.title\s?}/g.test(document) &&
    /title:/g.test(document) &&
    document.trim().startsWith("---")
  ) {
    let pos = getPosition(document, "---", 2) + 3;
    document =
      document.slice(0, pos) +
      "\r\n\r\n# {frontmatter.title}\r\n\r\n" +
      document.slice(pos);
  }

  const wikilinks = /\!?\[\[[a-zA-Z0-9-\s+#_&\.\/|]+\]\]/g;
  document = document.replaceAll(wikilinks, (node) => {
    if (node) {
      let start = node.startsWith("!") ? "!" : "";
      let value = node;
      value = value.replaceAll("!", "");
      let arr = value.split("|");

      //get link part
      let link = arr.length > 1 ? arr[0] : value;
      link = link.toLowerCase();
      link = link.replaceAll("[[", "");
      link = link.replaceAll("]]", "");
      link = link.replaceAll(/\s+/g, "-");

      //get text part
      let text = arr.length > 1 ? arr[1] : value;
      text = text.replaceAll("[[", "");
      text = text.replaceAll("]]", "");
      link = link.replaceAll("\\", "/");

      if (link.includes("/")) return `${start}[${text}](${link})`;

      let [l, header] = getHeaderLink(link);

      if (link.startsWith("#")) {
        link = path.relative(
          path.join(process.cwd(), "./app"),
          file?.history[0]
        );
        link = link.replaceAll("\\", "/");
        link = link.replaceAll("..", "");

        if (!link.startsWith(".") && !link.startsWith("/")) link = "/" + link;
        if (text.startsWith("#")) text = text.replace("#", "");
        link = link.replace("/page.mdx", `#${header}`);

        return `${start}[${text}](${link})`;
      }

      let linkpath = searchFile(dir, link);

      if (!linkpath)
        return `${start}[${text}](${link}${header ? `#${header}` : ""})`;

      link = path.relative(path.join(process.cwd(), "./app"), linkpath);
      link = link.replaceAll("\\", "/");
      link = link.replaceAll("..", "");

      if (!link.startsWith(".") && !link.startsWith("/")) link = "/" + link;

      return `${start}[${text}](${link}${header ? `#${header}` : ""})`;
    }

    return "";
  });

  let tempId = 0;
  const mdImportlinks =
    /\!\[[a-zA-Z0-9-\s+#_&\.\/|]+\]\([a-zA-Z0-9-\s+#_&\.\/|]+\)|\!\[\]\([a-zA-Z0-9-\s+#_&\.\/|]+\)/g;
  return document.replaceAll(mdImportlinks, (node) => {
    if (node) {
      let value = node;
      let arr = value.split("(");

      //get link part
      let link = arr.length > 1 ? arr[1] : value;
      link = link.replaceAll(")", "");
      if (!/(.*\.jpg$|.*\.img$|.*\.png$|.*\.jpeg$|.*\.svg$)/g.test(link)) {
        let importStatement = "";
        let componentId;

        let f = path.join(process.cwd(), "./app", link, "/page.mdx");

        if (!fs.existsSync(f)) {
          return `### Couldn't Import file at: ${link}`;
        }

        if (!(link in imports)) {
          let [cid, p] = getImportString(link, file, tempId++);
          importStatement = p;
          componentId = cid;
          imports[link] = componentId;
        } else {
          componentId = imports[link];
        }
        return importStatement + `<${componentId} />`;
      }
      return node;
    }

    return "";
  });
}

function getHeaderLink(link) {
  let header;
  let l;
  if (link.includes("#")) {
    header = link.split("#")[1];
    l = link.split("#")[0];
  }
  return [l, header];
}

function getImportString(link, file, tempId) {
  let f = path.join(process.cwd(), "./app", link, "/page.mdx");
  let relative = path.relative(file?.history[0], f);
  let componentId = `Component${tempId}`;
  relative = relative.replaceAll("\\", "/");

  if (relative.startsWith("../"))
    relative = relative.substring(3, relative.length);

  return [
    componentId,
    `import ${componentId} from "${relative.replaceAll("\\", "/")}";\r\n\r\n`,
  ];
}

function searchFile(dir, link) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory() && file === link) {
      return filePath;
    } else if (fileStat.isDirectory()) {
      let f = searchFile(filePath, link);
      if (f) return f;
    } else if (
      fileStat.isFile() &&
      file.includes(link) &&
      /(.*\.jpg$|.*\.img$|.*\.png$|.*\.jpeg$|.*\.svg$)/g.test(file)
    ) {
      return path.relative(path.join(process.cwd(), "./public"), filePath);
    }
  }

  return null;
}
