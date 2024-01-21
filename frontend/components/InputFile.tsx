"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadVideo } from "@/app/api/video";
import { getOrCreateIndex } from "@/app/api";
import { INDEX_NAME } from "@/lib/constants";
import { checkTaskStatus } from "@/app/api/task";
import { getVideo } from "@/app/api/video";
import { Video } from "@/types/video";
import { useToast } from "@/components/ui/use-toast";

interface InputFileProps {
  setVideoDetails: (videoDetails: Video) => void;
  setLoading: (loading: boolean) => void;
}

export function InputFile({ setVideoDetails, setLoading }: InputFileProps) {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setUploading(true);

      try {
        const index = await getOrCreateIndex(INDEX_NAME);
        const uploadResponse = await uploadVideo(index._id, "en", selectedFile);
        setUploading(false);
        checkTaskStatusPeriodically(uploadResponse._id);
      } catch (error) {
        console.error("Upload failed:", error);
        toast({
          title: "Upload failed",
          description: "Please try again later.",
        });
        setUploading(false);
      }
    }
  };

  const checkTaskStatusPeriodically = async (taskId: string) => {
    setLoading(true);
    const intervalId = setInterval(async () => {
      try {
        const taskStatus = await checkTaskStatus(taskId);
        if (taskStatus.status === "ready") {
          toast({
            title: "Your video is ready!",
          });
          clearInterval(intervalId);
          const videoDetails = await getVideo(
            taskStatus.index_id,
            taskStatus.video_id
          );
          setVideoDetails(videoDetails);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking task status:", error);
        clearInterval(intervalId);
      }
    }, 15000);
  };

  return (
    <div className="grid max-w-sm gap-1.5 items-center px-4 py-3 border border-dashed border-black bg-white rounded-lg hover:border-solid hover:border-black">
      <Label htmlFor="video-file" className="mb-2 text-lg font-medium">
        Upload a video
      </Label>
      <Input
        id="video-file"
        type="file"
        accept=".mp4"
        className="block text-sm justify-left bg-gray-50 rounded-lg border  cursor-pointer "
        onChange={handleFileChange}
        disabled={uploading}
      />
      <p className="text-xs text-gray-500 mt-1">
        {uploading ? "Uploading..." : "MP4 only"}
      </p>
    </div>
  );
}
