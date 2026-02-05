import { Lexend } from "next/font/google";
import { use, useEffect, useState } from "react";
import { Song } from "@/types";

const lexend = Lexend({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Play() {
  // add DELAY seconds to duration to account for slight delay when youtube video starts
  const DELAY = 0.8;

  const [phase, setPhase] = useState("start");

  const [addedSongsList, setAddedSongsList] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const [startTime, setStartTime] = useState(Date.now() / 1000);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= 0) return;

    const timerId = setInterval(() => {
      const timePassed = Date.now() / 1000 - startTime;

      const remaining =
        addedSongsList[currentSongIndex].duration + DELAY - timePassed;

      if (remaining <= 0) {
        setSeconds(0);
        clearInterval(timerId);
      } else {
        setSeconds(remaining);
      }

      console.log(seconds);
    }, 10);

    return () => clearInterval(timerId);
  }, [seconds]);

  function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <div
      className={`${lexend.className} flex min-h-screen w-full items-center justify-center`}
    >
      <div>
        <div className="mb-8 w-full border-b-2 border-neutral-200 pb-4">
          <h1 className="text-2xl font-bold">Songish</h1>
        </div>

        <button
          className={`${phase == "start" ? "" : "hidden"} w-full rounded-lg bg-yellow-600 p-2 text-center text-white transition hover:bg-yellow-500 active:bg-yellow-600`}
          onClick={() => {
            const shuffledSavedAddedSongsList = shuffle(
              JSON.parse(
                localStorage.getItem("addedSongsList") ?? "[]",
              ) as Song[],
            );
            setAddedSongsList(shuffledSavedAddedSongsList);

            setStartTime(Date.now() / 1000);
            setSeconds(
              shuffledSavedAddedSongsList[currentSongIndex].duration + DELAY,
            );

            setPhase("playing");
          }}
        >
          Play!
        </button>

        {seconds > 0 && addedSongsList.length > 0 && phase == "playing" ? (
          <iframe
            className="mb-4 rounded-xl border-2 border-yellow-500"
            width="337"
            height="190"
            src={
              addedSongsList[currentSongIndex].embedLink + "&autoplay=1&mute=0"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : null}

        <button
          className={`${phase == "playing" ? "" : "hidden"} w-full rounded-lg bg-neutral-500 p-2 text-white transition hover:bg-neutral-600 active:bg-neutral-500`}
          onClick={() => {
            if (currentSongIndex == addedSongsList.length - 1) {
              setPhase("done");
              setSeconds(0);
            } else {
              const nextSongIndex = currentSongIndex + 1;
              setCurrentSongIndex(nextSongIndex);

              setStartTime(Date.now() / 1000);
              setSeconds(addedSongsList[nextSongIndex].duration + DELAY);
            }
          }}
        >
          {"Next ->"}
        </button>

        <p className={`${phase == "done" ? "" : "hidden"}`}>
          finished. ur done. congratulations.
        </p>

        {phase == "playing" ? (
          <>
            <p>
              remaining seconds:{" "}
              {seconds > addedSongsList[currentSongIndex].duration
                ? addedSongsList[currentSongIndex].duration
                : seconds < 0
                  ? "0"
                  : seconds.toFixed(2)}
            </p>
            <progress
              className="win-rate-bar h-6 w-32 appearance-none md:w-72 lg:w-96"
              value={
                Number(seconds.toFixed(2)) /
                addedSongsList[currentSongIndex].duration
              }
              max={1}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
