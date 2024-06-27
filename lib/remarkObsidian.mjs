import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { fromMarkdown } from "mdast-util-from-markdown";
import { is } from "unist-util-is";

export default function remarkObsidian(pluginOptions) {
  const self = this;

  self.parser = parser;

  /**
   * @type {Parser<Root>}
   */
  function parser(document) {
    return fromMarkdown(document);
  }
}
