import path from "path";
// import { getSortedData } from "../lib/posts.mjs";

import Link from "next/link";

export default function Home({ allRulesData, allCampaignsData }) {
  return (
    <div>
      <section className="grid grid-cols-1 gap-4 m-10 justify-center">
        <p className="">
          Homebrew Container is a container to post TTRPG rules using markdown
          notes or MDX notes from a CMS, like obsidian
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>
          .)
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
      <section className="grid grid-cols-1 gap-4 m-10">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
          Campaigns
        </h2>
        <ul>
          {allCampaignsData ? (
            allCampaignsData.map(({ id, date, title }) => (
              <li key={id} className="list-disc list-inside">
                <Link href={`campaigns/${id}`}>{title}</Link>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </section>
    </div>
  );
}

// const campaignsDirectory = path.join(process.cwd(), "./pages/campaigns");
// const rulesDirectory = path.join(process.cwd(), "./pages/rules");
// Home.getInitialProps = async () => {
//   const allRulesData = getSortedData(rulesDirectory);
//   // const allCampaignsData = getSortedData(campaignsDirectory);

//   return {
//     props: {
//       allRulesData,
//       // allCampaignsData,
//     },
//   };
// };
