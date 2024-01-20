"use client";

import React, { useRef, useState, useEffect } from "react";
import { InputFile } from "@/components/ui/upload";
import ReactPlayer from "react-player";
import { secondsToTimestamp } from "@/lib/utils";
import { Video } from "@/types/video";
import {
  GistResponse,
  SummaryResponse,
  ChapterResponse,
  HighlightResponse,
} from "@/types/generate";
import { getVideo } from "@/app/api/video";
import { TextSkeleton } from "@/components/ui/textSkeleton";
import Image from "next/image";
import HorseLoading from "@/public/horse_loading.gif";
import {
  generateGist,
  generateSummary,
  generateChapter,
  generateHighlight,
} from "@/app/api/generate";

export default function Home() {
  const [videoDetails, setVideoDetails] = useState<Video>();
  const [videoLoading, setVideoLoading] = useState(false);
  const [gistResponse, setGistResponse] = useState<GistResponse>();
  const [summaryResponse, setSummaryResponse] = useState<SummaryResponse>();
  const [chapterResponse, setChapterResponse] = useState<ChapterResponse>();
  const [highlightResponse, setHighlightResponse] =
    useState<HighlightResponse>();
  const playerRef = useRef<ReactPlayer>(null);

  // useEffect(() => {
  //   if (!videoDetails) {
  //     const videoID = "65ac419e4981af6e637c8e7c";
  //     const indexID = "65a91ba0627beda40b8df9b1";
  //     console.log("Fetching video details...");
  //     setVideoLoading(true);
  //     getVideo(indexID, videoID)
  //       .then((video) => {
  //         setVideoDetails(video);
  //       })
  //       .catch((error) => console.error("Error fetching video details:", error))
  //       .finally(() => setVideoLoading(false));
  //   }
  // }, []);

  useEffect(() => {
    if (videoDetails) {
      generateGist(videoDetails._id)
        .then((gist) => {
          setGistResponse(gist);
        })
        .catch((error) => console.error("Error fetching gist details:", error));
      generateSummary(videoDetails._id)
        .then((summary) => {
          setSummaryResponse(summary);
        })
        .catch((error) =>
          console.error("Error fetching summary details:", error)
        );
      generateChapter(videoDetails._id)
        .then((chapter) => {
          setChapterResponse(chapter);
        })
        .catch((error) =>
          console.error("Error fetching chapter details:", error)
        );
      generateHighlight(videoDetails._id)
        .then((highlight) => {
          setHighlightResponse(highlight);
        })
        .catch((error) =>
          console.error("Error fetching highlight details:", error)
        );
    }
  }, [videoDetails]);

  const handleVideoReady = (videoDetails: Video) => {
    setVideoDetails(videoDetails);
  };

  const seekToTime = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");
    }
  };

  if (videoLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={HorseLoading} alt="Loading" />
      </div>
    );
  }

  if (!videoDetails) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-4">
        <div className="flex flex-col items-center justify-center w-3/4  mx-auto">
          <InputFile
            onVideoReady={handleVideoReady}
            setLoading={setVideoLoading}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-start justify-center p-24 space-y-4">
      <div className="player-wrapper w-3/4 flex justify-center mx-auto">
        <ReactPlayer
          ref={playerRef}
          url={videoDetails.hls.video_url}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
      <div>
        {gistResponse && (
          <>
            <h1 className="text-3xl font-bold text-left mb-6 w-3/4  mx-auto">
              {gistResponse.title}
            </h1>
            <div className="topics flex flex-wrap justify-left mb-6 w-3/4  mx-auto">
              {gistResponse.topics.map((topic, index) => (
                <span key={index}>{topic}</span>
              ))}
            </div>
            <div className="hashtags flex flex-wrap justify-left w-3/4  mx-auto">
              {gistResponse.hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-primary"
                >
                  #{hashtag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      {summaryResponse ? (
        <p className="text-left mb-6 w-3/4  mx-auto">
          {summaryResponse.summary}
        </p>
      ) : (
        <TextSkeleton />
      )}
      {chapterResponse ? (
        <div className="chapters w-3/4 mb-6  mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-left ">Chapters</h2>
          {chapterResponse.chapters.map((chapter, index) => (
            <div
              key={index}
              className="mb-4 p-4 border-l-4 border-primary space-y-2 text-left hover:bg-primary cursor-pointer"
              onClick={() => seekToTime(chapter.start)}
            >
              <h3 className="text-lg font-bold ">{chapter.chapter_title}</h3>
              <p className="text-sm text-gray-600">
                Chapter {chapter.chapter_number} -
                {secondsToTimestamp(chapter.start)} to{" "}
                {secondsToTimestamp(chapter.end)}
              </p>
              <p>{chapter.chapter_summary}</p>
            </div>
          ))}
        </div>
      ) : (
        <TextSkeleton />
      )}
      {highlightResponse ? (
        <div className="highlights w-3/4 mb-6  mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-left">Highlights</h2>
          {highlightResponse.highlights.map((highlight, index) => (
            <div
              key={index}
              className="mb-4 p-4 border-l-4 border-primary space-y-2 text-left hover:bg-primary cursor-pointer"
              onClick={() => seekToTime(highlight.start)}
            >
              <h3 className="text-lg font-bold ">{highlight.highlight}</h3>
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
      ) : (
        <TextSkeleton />
      )}
    </main>
  );
}
