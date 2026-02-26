"use client";
import { useState, useEffect, useRef } from "react";
import songsData from "../assets/twice.json";
import Link from "next/link";

export default function Game() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songInfo, setSongInfo] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSong = songsData ? songsData[currentIndex] : null;

  useEffect(() => {
    const savedRecord = localStorage.getItem("skz-quiz-highscore");
    if (savedRecord) {
      setHighScore(parseInt(savedRecord));
    }
  }, []);

  useEffect(() => {
    if (!currentSong) return;

    const fetchSong = async () => {
      setSongInfo(null);
      setIsRevealed(false);
      try {
        const trackName = currentSong.track;
        const response = await fetch(
          `/api/songs?track=${encodeURIComponent(trackName)}&artist=TWICE`
        );
        const data = await response.json();
        setSongInfo(data);
      } catch (err) {
        setSongInfo({ error: "Erro na conexão" });
      }
    };

    fetchSong();
  }, [currentIndex, currentSong]);

  const playSnippet = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
      }, 5000);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url('https://dynamicmedia.livenationinternational.com/p/l/m/7edc73df-70ef-49b8-93ac-7f8bff7e8e5a.jpg')`,
          filter: "brightness(0.2) blur(2px)",
        }}
      />

      <Link
        href="/"
        className="fixed top-4 left-4 z-50 bg-yellow-600/10 backdrop-blur-md p-2 rounded-lg border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"
      >
        ← Menu
      </Link>

      <div className="fixed top-4 right-4 flex flex-col gap-2 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-yellow-400/30 shadow-2xl z-50">
        <div className="flex justify-between items-center gap-4">
          <span className="text-xs uppercase text-slate-400 font-bold">
            Score
          </span>
          <span className="text-xl font-black text-yellow-400">{score}</span>
        </div>
        <div className="h-[1px] bg-slate-700"></div>
        <div className="flex justify-between items-center gap-4">
          <span className="text-xs uppercase text-slate-400 font-bold">
            Best
          </span>
          <span className="text-xl font-black text-green-400">{highScore}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center mb-8">
        <p className="text-[10px] tracking-[0.5em] font-light text-yellow-500 mt-2 uppercase">
          TWICE
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {!songInfo && (
          <p className="animate-pulse text-yellow-200">ONCE... TWICE...</p>
        )}

        {songInfo && !songInfo.error && (
          <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500 w-full max-w-2xl">
            <div className="flex gap-2">
              <span className="bg-yellow-500/20 text-yellow-400 text-[10px] px-3 py-1 rounded-full border border-yellow-500/30 uppercase font-bold">
                {currentSong?.category}
              </span>
            </div>

            <div className="relative w-56 h-56 md:w-72 md:h-72 mb-2">
              <img
                src={songInfo.artwork}
                alt="Album Hint"
                className={`w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10 transition-all duration-1000 ${
                  isRevealed
                    ? "blur-0 scale-100"
                    : "blur-3xl scale-90 opacity-40"
                }`}
              />
              {!isRevealed && (
                <div className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-yellow-500/10">
                  ?
                </div>
              )}
            </div>

            <audio ref={audioRef} src={songInfo.previewUrl} />

            <button
              onClick={playSnippet}
              disabled={isPlaying}
              className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-3xl transition-all ${
                isPlaying
                  ? "border-yellow-400 scale-90 opacity-50 shadow-[0_0_20px_#facc15]"
                  : "border-white hover:scale-110 hover:bg-yellow-500/20"
              }`}
            >
              {isPlaying ? "🎶" : "▶️"}
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full px-4 md:px-0 justify-items-center">
              {currentSong?.choices.map((choice: string) => (
                <button
                  key={choice}
                  disabled={isRevealed}
                  onClick={() => {
                    setIsRevealed(true);
                    if (choice === currentSong.track) {
                      setScore((prev) => {
                        const newScore = prev + 1;
                        if (newScore > highScore) {
                          setHighScore(newScore);
                          localStorage.setItem(
                            "skz-quiz-highscore",
                            newScore.toString()
                          );
                        }
                        return newScore;
                      });
                      setTimeout(() => {
                        setCurrentIndex(
                          (prev) => (prev + 1) % songsData.length
                        );
                      }, 2500);
                    } else {
                      alert(`Errou! A música era: ${currentSong.track}`);
                      setScore(0);
                      setCurrentIndex((prev) => (prev + 1) % songsData.length);
                    }
                  }}
                  className={`p-4 rounded-xl border-2 transition-all w-full max-w-[260px] font-semibold backdrop-blur-md ${
                    isRevealed && choice === currentSong.track
                      ? "bg-green-600 border-green-400 text-white scale-105 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                      : "bg-slate-900/60 border-slate-700 hover:border-yellow-400 text-slate-200"
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        )}
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
