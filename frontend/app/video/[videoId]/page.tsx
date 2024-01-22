"use client";

import { useEffect, useRef, useState } from "react";
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
import { INDEX_NAME } from "@/lib/constants";
import { getOrCreateIndex } from "@/app/api/index";

export default function VideoView({ params }: { params: { videoId: string } }) {
  const videoId = params.videoId;
  const [videoDetails, setVideoDetails] = useState<Video>();
  const [isClient, setIsClient] = useState(false);
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

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      try {
        const index = await getOrCreateIndex(INDEX_NAME);
        const video = await getVideo(index._id, videoId);
        setVideoDetails(video);
        generateAll();
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Error fetching data",
        });
      }
    };

    if (videoId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const generateAll = async () => {
    generateGist(videoId)
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
    generateSummary(videoId)
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
    generateHighlight(videoId)
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
    generateChapter(videoId)
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
  };

  const handleCustomPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCustomSubmit();
    }
  };

  const handleCustomSubmit = () => {
    if (videoDetails && customPrompt && !customLoading) {
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

  return (
    <>
      <Draggable>
        <div className="fixed bottom-5 right-5 z-10 h-1/5">
          {isClient && (
            <ReactPlayer
              ref={playerRef}
              url={videoDetails?.hls?.video_url ?? ""}
              playing={true}
              controls={true}
              width="100%"
              height="100%"
              muted={true}
            />
          )}
        </div>
      </Draggable>
      <main className="flex min-h-screen flex-col justify-center space-y-4 pt-20 pb-10">
        <div>
          {gistResponse ? (
            <div className="gist w-3/4 mx-auto">
              <h1 className="text-3xl font-bold mb-6 ">{gistResponse.title}</h1>
              <p className="text-sm text-gray-600 mb-6 flex items-center">
                <VideoIcon size={16} className="mr-2" />
                {videoDetails ? (
                  videoDetails.metadata.filename
                ) : (
                  <TextSkeleton />
                )}
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
        {videoDetails ? (
          <div className="custom w-3/4 mb-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-left ">Custom</h2>
            <div className="mt-2 mb-4">
              <Input
                value={customPrompt}
                onChange={handleCustomPromptChange}
                onKeyDown={handleKeyPress}
                placeholder="Write your own prompt"
                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-sm"
              />
            </div>
            {customLoading && isClient ? (
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
        ) : (
          <TextSkeleton />
        )}
      </main>
    </>
  );
}
