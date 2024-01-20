"use client";

import React, { useRef } from "react";
import { InputFile } from "@/components/ui/upload";
import ReactPlayer from "react-player";
import { secondsToTimestamp } from "@/utils/timestamp";
interface Chapter {
  chapter_number: number;
  chapter_summary: string;
  chapter_title: string;
  end: number;
  start: number;
}

interface Highlight {
  end: number;
  highlight: string;
  highlight_summary: string;
  start: number;
}

export default function Home() {
  const videoUrl =
    "https://deuqpmn4rs7j5.cloudfront.net/658b1f079bbca19fea568a74/65a91eff627beda40b8df9b4/stream/3ab04d93-71bf-4244-9e6b-e280855386d5.m3u8";
  const playerRef = useRef<ReactPlayer>(null);

  const chapters: Chapter[] = [
    {
      chapter_number: 0,
      chapter_summary:
        "In this chapter, we are introduced to a man in black attire who uses a laptop to browse various websites. He explores the world of interactive internet browsing, showcasing the potential of software tools like VPNs and Tailwagging.",
      chapter_title: "Introduction to Interactive Internet Browsing",
      end: 30,
      start: 0,
    },
    {
      chapter_number: 1,
      chapter_summary:
        "The man discovers something exciting online and expresses his enthusiasm. This highlights the captivating nature of the internet and its ability to provide thrilling experiences.",
      chapter_title: "Exciting Discoveries Online",
      end: 45,
      start: 30,
    },
    {
      chapter_number: 2,
      chapter_summary:
        "This chapter focuses on the man's use of software to browse and interact with various websites, including the YouTube platform. It showcases his seamless interaction with textual content, buttons, and images.",
      chapter_title: "Seamless Interaction with Online Platforms",
      end: 60,
      start: 45,
    },
    {
      chapter_number: 3,
      chapter_summary:
        "In this final chapter, the video demonstrates a dynamic animated world where viewers can engage in interactive internet browsing. It showcases a range of scenes and characters, highlighting the capabilities of the platform and leaving us eager to embark on our own explorations.",
      chapter_title: "Engaging with a Dynamic Animated World",
      end: 75,
      start: 60,
    },
  ];

  const highlights: Highlight[] = [
    {
      end: 15,
      highlight:
        "A man in black attire uses a laptop to browse various websites.",
      highlight_summary:
        "The video showcases a man using a laptop to browse different websites.",
      start: 0,
    },
    {
      end: 30,
      highlight:
        "The situation in the video is an instructional tutorial for interactive internet browsing using software tools such as VPNs and Tailwagging.",
      highlight_summary:
        "The video demonstrates an instructional tutorial for interactive internet browsing with software tools like VPNs and Tailwagging.",
      start: 15,
    },
    {
      end: 45,
      highlight:
        "A person discovers something exciting online and expresses their enthusiasm.",
      highlight_summary:
        "A person discovers something exciting online and expresses their enthusiasm.",
      start: 30,
    },
  ];

  const seekToTime = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-center p-24 space-y-4">
      <InputFile />
      <div className="player-wrapper w-full flex justify-center">
        {" "}
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>

      <h1 className="text-3xl font-bold text-left mb-6">
        {" "}
        Exploring the World of Interactive Internet Browsing: A Guide to VPNs,
        Tailwagging, and Exciting Discoveries
      </h1>

      <div className="hashtags flex flex-wrap justify-center mb-6">
        {" "}
        {[
          "man in black attire",
          "laptop",
          "browse",
          "websites",
          "instructional tutorial",
          "interactive internet browsing",
          "software tools",
          "VPNs",
          "Tailwagging",
          "exciting online",
        ].map((hashtag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-primary"
          >
            #{hashtag}
          </span>
        ))}
      </div>

      <p className="text-left mb-6 w-full">
        {" "}
        In this captivating video, we follow a man dressed in black as he delves
        into the mesmerizing world of interactive internet browsing...
      </p>

      <div className="chapters w-full mb-6">
        <h2 className="text-2xl font-bold mb-4 text-left ">Chapters</h2>
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="mb-4 p-4 border-l-4 border-primary space-y-2 text-left hover:bg-primary cursor-pointer"
            onClick={() => seekToTime(chapter.start)}
          >
            <h3 className="text-lg font-bold ">{chapter.chapter_title}</h3>
            <h3 className="text-lg font-bold"></h3>
            <p className="text-sm text-gray-600">
              Chapter {chapter.chapter_number} -{" "}
              {secondsToTimestamp(chapter.start)} to{" "}
              {secondsToTimestamp(chapter.end)}
            </p>
            <p>{chapter.chapter_summary}</p>
          </div>
        ))}
      </div>

      <div className="highlights w-full mb-6">
        <h2 className="text-2xl font-bold mb-4 text-left">Highlights</h2>
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="mb-4 p-4 border-l-4 border-primary space-y-2 text-left hover:bg-primary cursor-pointer"
            onClick={() => seekToTime(highlight.start)}
          >
            <p className="text-lg text-gray-900">{highlight.highlight}</p>
            <p className="text-sm text-gray-600">
              {secondsToTimestamp(highlight.start)} to{" "}
              {secondsToTimestamp(highlight.end)}
            </p>
            <p className="text-sm text-gray-600">
              {highlight.highlight_summary}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
