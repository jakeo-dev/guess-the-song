import { Lexend } from "next/font/google";
import { useState } from "react";
import { Song } from "@/types";
import Link from "next/link";

const lexend = Lexend({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  const [enteredLink, setEnteredLink] = useState(
    "https://www.youtube.com/watch?v=jGj8oM9NUZk",
  );
  const [videoID, setVideoID] = useState("jGj8oM9NUZk");

  const [enteredStartTime, setEnteredStartTime] = useState("1:35");
  const [startTime, setStartTime] = useState(95);

  const [embedLink, setEmbedLink] = useState(
    "https://www.youtube.com/embed/jGj8oM9NUZk?start=95",
  );
  const [enteredDuration, setEnteredDuration] = useState("5");
  const [duration, setDuration] = useState(5);

  const [enteredTitle, setEnteredTitle] = useState("When I Kissed The Teacher");

  const [addedSongsList, setAddedSongsList] = useState<Song[]>([
    {
      uuid: "aaa",
      title: "Seaside Rendezvous",
      embedLink: "https://www.youtube.com/embed/36nqGs_Dvws?start=95",
      duration: 5,
      startTime: 30,
    },
    {
      uuid: "s",
      title: "'39",
      embedLink: "https://www.youtube.com/embed/kE8kGMfXaFU?start=95",
      duration: 5,
      startTime: 30,
    },
    {
      uuid: "ew",
      title: "Hammer To Fall",
      embedLink: "https://www.youtube.com/embed/JU5LMG3WFBw?start=95",
      duration: 5,
      startTime: 30,
    },
    {
      uuid: "ppl",
      title: "Good Old Fashioned Lover Boy",
      embedLink: "https://www.youtube.com/embed/PI3LAgGBxqU?start=95",
      duration: 5,
      startTime: 30,
    },
  ]);

  return (
    <div
      className={`${lexend.className} flex min-h-screen w-full items-center justify-center`}
    >
      <div>
        <div className="mb-8 w-full border-b-2 border-neutral-200 pb-4">
          <h1 className="text-2xl font-bold">Songish</h1>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-[0.3] flex-col gap-4">
            <div className="h-full rounded-lg bg-neutral-200 p-4">
              <h2 className="mb-4 text-lg font-medium">Added songs</h2>
              {addedSongsList.map((song, i) => (
                <div className="mt-3 flex gap-2" key={i}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Blumenwiese_bei_Obermaiselstein05.jpg"
                    className="h-10 w-10 rounded-md"
                  />
                  <div>
                    <h3 className="text-sm leading-4">{song.title}</h3>
                    <p className="mt-0.5 text-xs text-neutral-600">
                      {Math.floor(song.startTime / 60)}:
                      {(song.startTime % 60).toString().length == 1 ? "0" : ""}
                      {song.startTime % 60} -{" "}
                      {Math.floor((song.startTime + song.duration) / 60)}:
                      {((song.startTime + song.duration) % 60).toString()
                        .length == 1
                        ? "0"
                        : ""}
                      {(song.startTime + song.duration) % 60}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              className="w-full rounded-lg bg-yellow-600 p-2 text-center text-white transition hover:bg-yellow-500 active:bg-yellow-600"
              href="/play"
              onClick={() => {
                localStorage.setItem(
                  "addedSongsList",
                  JSON.stringify(addedSongsList),
                );
              }}
            >
              Continue to play
            </Link>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="flex gap-4 rounded-lg bg-neutral-200 p-4">
              <iframe
                className="rounded-xl border-2 border-yellow-500"
                width="337"
                height="190"
                src={embedLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                /* onClick={() => {
                  setTimeout(() => {
                    
                  }, duration * 1000);
                }} */
              />

              <div>
                <label className="text-sm text-neutral-500">Song title</label>
                <input
                  className="mb-4 w-full border-b-2 border-neutral-300 transition focus:border-yellow-400 focus:outline-none"
                  placeholder="Title..."
                  value={enteredTitle}
                  onChange={(e) => {
                    setEnteredTitle(e.currentTarget.value);
                  }}
                />
                <label className="text-sm text-neutral-500">
                  YouTube link (only audio will play when guessing)
                </label>
                <input
                  className="mb-4 w-full border-b-2 border-neutral-300 transition focus:border-yellow-400 focus:outline-none"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={enteredLink}
                  onChange={(e) => {
                    setEnteredLink(e.currentTarget.value);

                    const newVideoID = e.currentTarget.value
                      .replace("https://youtu.be/", "")
                      .replace(/.+watch\?v=/, "")
                      .replace(/\?.+/, "");
                    setVideoID(newVideoID);

                    setEmbedLink(
                      `https://www.youtube.com/embed/${newVideoID}?start=${startTime}`,
                    );
                  }}
                />
                <div className="flex w-full gap-4">
                  <div className="w-full">
                    <label className="text-sm text-neutral-500">
                      Start time (in seconds)
                    </label>
                    <input
                      className="w-full border-b-2 border-neutral-300 transition focus:border-yellow-400 focus:outline-none"
                      placeholder="0:00"
                      value={enteredStartTime}
                      onChange={(e) => {
                        setEnteredStartTime(e.currentTarget.value);

                        const minsSecs = e.currentTarget.value.split(":");
                        const newStartTime =
                          60 * Number(minsSecs[0]) + Number(minsSecs[1]);

                        setStartTime(newStartTime);
                        setEmbedLink(
                          `https://www.youtube.com/embed/${videoID}?start=${newStartTime}`,
                        );
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-neutral-500">
                      Duration (in seconds)
                    </label>
                    <input
                      className="w-full border-b-2 border-neutral-300 transition focus:border-yellow-400 focus:outline-none"
                      placeholder="5"
                      value={enteredDuration}
                      onChange={(e) => {
                        setEnteredDuration(e.currentTarget.value);

                        const newDuration = Number(e.currentTarget.value);
                        setDuration(newDuration);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              className="w-full rounded-lg bg-neutral-500 p-2 text-white transition hover:bg-neutral-600 active:bg-neutral-500"
              onClick={() => {
                if (enteredLink == "") {
                  alert("Enter a valid YouTube link to a song");
                } else if (enteredTitle == "") {
                  alert("Enter the title for this song");
                } else {
                  const newAddedSongsList = [
                    {
                      uuid: crypto.randomUUID(),
                      title: enteredTitle,
                      embedLink: embedLink,
                      duration: enteredDuration != "" ? duration : 5,
                      startTime: enteredStartTime != "" ? startTime : 0,
                    },
                    ...addedSongsList,
                  ];
                  setAddedSongsList(newAddedSongsList);

                  localStorage.setItem(
                    "addedSongsList",
                    JSON.stringify(newAddedSongsList),
                  );

                  setEnteredLink("");
                  setVideoID("");
                  setEnteredStartTime("");
                  setStartTime(0);
                  setEmbedLink("");
                  setEnteredDuration("");
                  setDuration(5);
                  setEnteredTitle("");
                }
              }}
            >
              + Add this song
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
