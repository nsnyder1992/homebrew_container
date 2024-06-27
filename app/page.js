import path from "path";
import { getSortedData } from "../lib/posts.mjs";

import Link from "next/link";

export default function Home() {
  const allRulesData = getLinks();
  console.log(allRulesData);
  return (
    <div>
      <section className="grid grid-cols-1 gap-4 m-10 justify-center">
        <p className="">
          Homebrew Container is a container to post MDX notes from a CMS, like
          obsidian
        </p>
      </section>
      <section className="grid grid-cols-1 gap-4 m-10">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
          Rules
        </h2>
        <ul>
          {allRulesData ? (
            allRulesData.map(({ id, date, title, isTitlePage }) => {
              if (!isTitlePage) return null;

              return (
                <li key={id} className="list-disc list-inside">
                  <Link href={`rules/${id}`}>{title}</Link>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </section>
    </div>
  );
}

const rulesDirectory = path.join(process.cwd(), "./app/rules");
function getLinks() {
  return getSortedData(rulesDirectory);
}
