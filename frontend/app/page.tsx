"use client";

import React, { useRef, useState, useEffect } from "react";
import { InputFile } from "@/components/InputFile";
import ReactPlayer from "react-player";
import { secondsToTimestamp } from "@/lib/utils";
import { Video } from "@/types/video";
import {
  GistResponse,
  SummaryResponse,
  ChapterResponse,
  HighlightResponse,
  CustomResponse,
} from "@/types/generate";
import Draggable from "react-draggable";
import { getVideo } from "@/app/api/video";
import { TextSkeleton } from "@/components/ui/textSkeleton";
import Image from "next/image";
import HorseLoading from "@/public/horse_loading.gif";
import GreenHorseLoading from "@/public/green_horse_loading.gif";
import { PlayCircle } from "lucide-react";
import {
  generateGist,
  generateSummary,
  generateChapter,
  generateHighlight,
  generateCustom,
} from "@/app/api/generate";
import { Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [videoDetails, setVideoDetails] = useState<Video>();
  const [videoLoading, setVideoLoading] = useState(false);
  const [gistResponse, setGistResponse] = useState<GistResponse>();
  const [summaryResponse, setSummaryResponse] = useState<SummaryResponse>();
  const [chapterResponse, setChapterResponse] = useState<ChapterResponse>();
  const [customResponse, setCustomResponse] = useState<CustomResponse>();
  const [customPrompt, setCustomPrompt] = useState("");
  const [customLoading, setCustomLoading] = useState(false);
  const { toast } = useToast();
  const [highlightResponse, setHighlightResponse] =
    useState<HighlightResponse>();
  const playerRef = useRef<ReactPlayer>(null);

  // useEffect(() => {
  //   if (!videoDetails) {
  //     const videoID = "65ac4f634981af6e637c8e7f";
  //     const indexID = "65a91ba0627beda40b8df9b1";
  //     setVideoLoading(true);
  //     getVideo(indexID, videoID)
  //       .then((video) => {
  //         setVideoDetails(video);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching video details:", error);
  //         toast({
  //           title: "Error",
  //           description: "Error fetching video details",
  //         });
  //       })
  //       .finally(() => setVideoLoading(false));
  //   }
  // }, []);

  useEffect(() => {
    if (videoDetails) {
      generateGist(videoDetails._id)
        .then((gist) => {
          setGistResponse(gist);
        })
        .catch((error) => {
          console.error("Error fetching gist details:", error);
          toast({
            title: "Error",
            description: "Error generating gist",
          });
        });
      generateSummary(videoDetails._id)
        .then((summary) => {
          setSummaryResponse(summary);
        })
        .catch((error) => {
          console.error("Error fetching summary details:", error);
          toast({
            title: "Error",
            description: "Error generating summary",
          });
        });
      generateHighlight(videoDetails._id)
        .then((highlight) => {
          setHighlightResponse(highlight);
        })
        .catch((error) => {
          console.error("Error fetching highlight details:", error);
          toast({
            title: "Error",
            description: "Error generating highlight",
          });
        });
      generateChapter(videoDetails._id)
        .then((chapter) => {
          setChapterResponse(chapter);
        })
        .catch((error) => {
          console.error("Error fetching chapter details:", error);
          toast({
            title: "Error",
            description: "Error generating chapter",
          });
        });
    }
  }, [videoDetails]);

  const handleVideoReady = (videoDetails: Video) => {
    setVideoDetails(videoDetails);
  };

  const handleCustomPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
  };

  const handleCustomSubmit = () => {
    if (videoDetails && customPrompt) {
      setCustomLoading(true);
      generateCustom(videoDetails._id, customPrompt)
        .then((custom) => {
          setCustomResponse(custom);
        })
        .catch((error) =>
          console.error("Error fetching custom details:", error)
        )
        .finally(() => setCustomLoading(false));
    }
  };

  const seekToTime = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");
    }
  };

  if (videoLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-primary">
        <div className="flex flex-col justify-center items-center">
          <Image src={HorseLoading} alt="Horse Loading" />
          <p className="text-sm text-center text-gray-600 mt-2">
            Generating... This may take a while
          </p>
        </div>
      </div>
    );
  }

  if (!videoDetails) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-4 bg-primary">
        <div className="flex flex-col items-center justify-center w-3/4 mx-auto">
          <InputFile
            setVideoDetails={handleVideoReady}
            setLoading={setVideoLoading}
          />
        </div>
      </main>
    );
  }

  return (
    <>
      <Draggable>
        <div className="fixed bottom-5 right-5 z-10 h-1/5">
          <ReactPlayer
            ref={playerRef}
            url={videoDetails.hls.video_url}
            playing={true}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
      </Draggable>
      <main className="flex min-h-screen flex-col justify-center space-y-4 pt-20 pb-10">
        <div>
          {gistResponse ? (
            <div className="gist w-3/4 mx-auto">
              <h1 className="text-3xl font-bold mb-6 ">{gistResponse.title}</h1>
              <p className="text-sm text-gray-600 mb-6 flex items-center">
                <VideoIcon size={16} className="mr-2" />
                {videoDetails.metadata.filename}
              </p>
              <h3 className="text-2xl font-bold mb-4 text-left ">Topic</h3>
              <div className="topics flex flex-wrap justify-left mb-6 ">
                {gistResponse.topics.map((topic, index) => (
                  <span key={index}>{topic}</span>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-left ">Hashtags</h3>
              <div className="hashtags flex flex-wrap justify-left">
                {gistResponse.hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="inline-block outline outline-2 outline-primary rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-primary"
                  >
                    #{hashtag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <TextSkeleton />
          )}
        </div>

        {summaryResponse ? (
          <div className="text-left summary w-3/4 mb-6 mx-auto">
            <h3 className="text-2xl font-bold mb-4  ">Summary</h3>
            <p>{summaryResponse.summary}</p>
          </div>
        ) : (
          <TextSkeleton />
        )}
        {highlightResponse ? (
          <div className="highlights w-3/4 mb-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-left">Highlights</h2>
            {highlightResponse.highlights.map((highlight, index) => (
              <div
                key={index}
                className="mb-4 p-4 border-l-4 border-primary space-y-2 text-left hover:bg-primary cursor-pointer"
                onClick={() => seekToTime(highlight.start)}
              >
                <h3 className="text-lg font-bold ">{highlight.highlight}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <PlayCircle size={16} className="mr-2" />
                  {secondsToTimestamp(highlight.start)} -{" "}
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
        {chapterResponse ? (
          <div className="chapters w-3/4 mb-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-left ">Chapters</h2>
            {chapterResponse.chapters.map((chapter, index) => (
              <div
                key={index}
                className="mb-4 p-4 border-l-4 border-primary space-y-2 text-left hover:bg-primary cursor-pointer"
                onClick={() => seekToTime(chapter.start)}
              >
                <h3 className="text-lg font-bold ">{chapter.chapter_title}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <PlayCircle size={16} className="mr-2" />
                  {secondsToTimestamp(chapter.start)} -{" "}
                  {secondsToTimestamp(chapter.end)}
                </p>
                <p>{chapter.chapter_summary}</p>
              </div>
            ))}
          </div>
        ) : (
          <TextSkeleton />
        )}
        <div className="custom w-3/4 mb-6 mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-left ">Custom</h2>
          <div className="mt-2 mb-4">
            <Input
              value={customPrompt}
              onChange={handleCustomPromptChange}
              placeholder="Write your own prompt"
              className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-sm"
            />
          </div>
          {customLoading ? (
            <div className="flex justify-left items-center space-x-2">
              <Image
                src={GreenHorseLoading}
                alt="Green Horse Loading"
                width={65}
                height={65}
              />
              <span className="text-sm text-gray-600">Generating...</span>{" "}
            </div>
          ) : (
            <Button
              onClick={handleCustomSubmit}
              disabled={customLoading}
              className="bg-primary font-semibold hover:bg-white outline outline-3 outline-primary rounded-sm"
              size="sm"
            >
              Generate
            </Button>
          )}
          {customResponse && !customLoading && (
            <div className="mt-4 p-4 border border-primary rounded-sm">
              <h3 className="text-lg font-bold mb-2">Response</h3>
              <p>{customResponse.data}</p>{" "}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
