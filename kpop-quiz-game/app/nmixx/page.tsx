"use client";
import { useState, useEffect, useRef } from "react";
import songsData from "../assets/nmixx.json"; // Certifique-se de ter o nmixx.json nos assets
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
    const savedRecord = localStorage.getItem("nmixx-quiz-highscore");
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
          `/api/songs?track=${encodeURIComponent(trackName)}&artist=NMIXX`
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
          backgroundImage: `url('https://www.hollywoodreporter.com/wp-content/uploads/2025/03/Nmixx-e1742758681594.jpg?w=2000&h=1126&crop=1')`,
          filter: "brightness(0.3) blur(2px)",
        }}
      />

      <Link
        href="/"
        className="fixed top-4 left-4 z-50 bg-blue-600/20 backdrop-blur-md p-2 rounded-lg border border-blue-400/50 text-blue-300 hover:bg-blue-500 hover:text-white transition-all"
      >
        ← Menu
      </Link>

      <div className="fixed top-4 right-4 flex flex-col gap-2 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-blue-400/30 shadow-2xl z-50">
        <div className="flex justify-between items-center gap-4">
          <span className="text-xs uppercase text-slate-400 font-bold">
            Score
          </span>
          <span className="text-xl font-black text-blue-400">{score}</span>
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
        <p className="text-[10px] tracking-[0.4em] font-light text-blue-300 mt-2 uppercase">
          NMIXX
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {!songInfo && (
          <p className="animate-pulse text-blue-200">
            Misturando as frequências...
          </p>
        )}

        {songInfo && !songInfo.error && (
          <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500 w-full max-w-2xl">
            <div className="flex gap-2">
              <span className="bg-blue-500/20 text-blue-300 text-[10px] px-3 py-1 rounded-full border border-blue-500/30 uppercase font-bold tracking-widest">
                {currentSong?.category}
              </span>
            </div>

            <div className="relative w-56 h-56 md:w-72 md:h-72 mb-2">
              <img
                src={songInfo.artwork}
                alt="Song Hint"
                className={`w-full h-full object-cover rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-1000 ${
                  isRevealed
                    ? "blur-0 scale-100"
                    : "blur-3xl scale-90 opacity-40"
                }`}
              />
              {!isRevealed && (
                <div className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-blue-500/10">
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
                  ? "border-blue-400 scale-90 opacity-50 shadow-[0_0_25px_#60a5fa]"
                  : "border-white hover:scale-110 hover:bg-blue-500/20"
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
                            "nmixx-quiz-highscore",
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
                      alert(`Oops! Era: ${currentSong.track}`);
                      setScore(0);
                      setCurrentIndex((prev) => (prev + 1) % songsData.length);
                    }
                  }}
                  className={`p-4 rounded-xl border-2 transition-all w-full max-w-[260px] font-semibold backdrop-blur-sm ${
                    isRevealed && choice === currentSong.track
                      ? "bg-green-600 border-green-400 text-white scale-105 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                      : "bg-slate-900/60 border-slate-700 hover:border-blue-400 text-slate-200"
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
