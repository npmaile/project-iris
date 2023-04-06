import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from the SU speed reading team" });

  return (
    <>
      <Head>
        <title>Speed Reading</title>
        <meta name="description" content="Schreiner University Speed Reading Study" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            A routine built<span className="text-[hsl(280,100%,70%)]"> just for you</span> 
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/signup"
              target="_self"
            >
              <h3 className="text-2xl font-bold">Sign up→</h3>
              <div className="text-lg">
                Submit your information to enter our beta program.
                Join us in creating a routine to enhance student&#39;s reading speed and academic potential.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/nav" //this will lead to a page that will serve games to the user
              target="_self"
            >
              <h3 className="text-2xl font-bold">Your <span className="text-[hsl(280,100%,70%)]">Routine</span>→</h3>
              <div className="text-lg">
                Train with your own custom built routine and help us build our system.
              </div>
            </Link>
          </div>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Connecting ..."}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
