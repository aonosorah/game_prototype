"use client";
import Link from "next/link";

export default function Game() {
  const artists = [
    {
      name: "skz",
      display: "Stray Kids",
      color: "border-red-600",
      hover: "hover:bg-red-600",
    },
    {
      name: "itzy",
      display: "ITZY",
      color: "border-pink-500",
      hover: "hover:bg-pink-500",
    },
    {
      name: "nmixx",
      display: "NMIXX",
      color: "border-blue-400",
      hover: "hover:bg-blue-400",
    },
    {
      name: "twice",
      display: "TWICE",
      color: "border-orange-400",
      hover: "hover:bg-orange-400",
    },
    {
      name: "xdinary",
      display: "Xdinary Heroes",
      color: "border-green-400",
      hover: "hover:bg-green-500",
    },
    {
      name: "day6",
      display: "DAY6",
      color: "border-white",
      hover: "hover:bg-slate-200",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url('https://www.allkpop.com/upload/2024/09/content/050217/1725517048-01.jpg')`,
          filter: "brightness(0.15) blur(3px)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 text-center drop-shadow-sm">
          JYP QUIZ MASTER
        </h1>
        <p className="text-slate-400 mb-12 tracking-[0.3em] text-xs font-light uppercase">
          Select your artist to start
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
          {artists.map((artist) => (
            <Link
              key={artist.name}
              href={`/${artist.name}`}
              className={`group relative p-8 border-2 ${artist.color} rounded-2xl text-center overflow-hidden transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity ${artist.hover.replace(
                  "hover:bg",
                  "bg"
                )}`}
              />

              <span
                className={`relative z-10 font-black text-xl uppercase transition-colors group-hover:text-white`}
              >
                {artist.display}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/5 text-[9px] md:text-[10px] text-slate-400 tracking-[0.2em] uppercase z-10 text-center mx-4">
        Developed by <span className="text-white font-bold">Mayara</span> for
        Portfolio • 2026 •{" "}
        <span className="text-grey-500/80 ml-2">
          All media and trademarks belong to JYP Entertainment. This is a
          non-commercial fan project. •
        </span>
        <span className="text-yellow-500/80 ml-2">
          Stacks: Next.js • Rest API • React Hooks • Tailwind • TypeScript{" "}
        </span>
      </div>
    </div>
  );
}
