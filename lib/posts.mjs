import fs from "fs";
import path from "path";

import matter from "gray-matter";

// import MDXFileLoader from "../mdx-file-loader";

export function getRoute(dir, filename) {
  if (!filename || !dir) return {};
  console.log(dir, filename);
  filename = path.relative(dir, filename);

  const arr = filename.split("page.");
  const type = arr.pop();
  const id = arr.join("");
  return {
    id,
  };
}

export function getSortedData(dir) {
  const fileNames = fromDir(dir, ".mdx");
  console.log(dir, fileNames);
  const allRulesData = fileNames.map((fileName) => {
    const data = getRoute(dir, fileName);

    const fileContents = fs.readFileSync(fileName, "utf8");

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

// export function getAllIds(dir) {
//   const fileNames = getFilesRecursively(dir);

//   return fileNames.map((fileName) => {
//     const data = getFileData(fileName);
//     return {
//       params: {
//         id: data.id,
//       },
//     };
//   });
// }

function fromDir(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  let files = [];
  var f = fs.readdirSync(startPath);
  for (var i = 0; i < f.length; i++) {
    var filename = path.join(startPath, f[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      files.push(...fromDir(filename, filter)); //recurse
    } else if (filename.endsWith(filter)) {
      files.push(filename);
    }
  }
  return files;
}
