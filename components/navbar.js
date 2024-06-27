import Link from "next/link";

export default function Navbar({ name }) {
  if (!name) {
    name = process.env.NEXT_PUBLIC_APP_NAME
      ? process.env.NEXT_PUBLIC_APP_NAME.replace('"', "")
      : "App Name";
  }

  return (
    <nav className="bg-white-800">
      <h2 className="shrink-0 ml-10 m-4 text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/" className="block">
          {name}
        </Link>
      </h2>
    </nav>
  );
}

export async function getStaticProps() {
  const name = process.env.NEXT_PUBLIC_APP_NAME
    ? process.env.NEXT_PUBLIC_APP_NAME.replace('"', "")
    : "App Name";
  console.log(name);
  return {
    props: {
      name,
    },
  };
}
