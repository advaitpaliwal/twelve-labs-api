"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadVideo } from "@/app/api/video";
import { getOrCreateIndex } from "@/app/api/index";
import { getRandomFact } from "@/app/api/fact";
import { INDEX_NAME } from "@/lib/constants";
import { checkTaskStatus } from "@/app/api/task";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Fact } from "@/types/fact";
import { Button } from "@/components/ui/button";
import { LoadingDisplay } from "./LoadingDisplay";

export function InputFile() {
  const [uploading, setUploading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fact, setFact] = useState<Fact>();

  const router = useRouter();
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
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
    setTaskLoading(true);
    const intervalId = setInterval(async () => {
      try {
        const taskStatus = await checkTaskStatus(taskId);
        if (taskStatus.status === "ready") {
          router.push(`/video/${taskStatus.video_id}`);
          clearInterval(intervalId);
          setTaskLoading(false);
        } else {
          const randomFact = await getRandomFact();
          setFact(randomFact);
        }
      } catch (error) {
        console.error("Error checking task status:", error);
        clearInterval(intervalId);
      }
    }, 10000);
  };

  if (taskLoading) {
    return <LoadingDisplay fact={fact} />;
  } else {
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
        <Button
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          className="bg-primary font-semibold hover:bg-white outline outline-3 outline-primary rounded-sm"
          size="sm"
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>

        <p className="text-xs text-gray-500 mt-1">MP4 only</p>
      </div>
    );
  }
}
