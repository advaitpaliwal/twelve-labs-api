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
import HorseLoading from "@/public/horse_loading.gif";
import Image from "next/image";
import { Fact } from "@/types/fact";

export function InputFile() {
  const [uploading, setUploading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(true);
  const [fact, setFact] = useState<Fact>();

  const router = useRouter();
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
    setTaskLoading(true);
    const intervalId = setInterval(async () => {
      try {
        const taskStatus = await checkTaskStatus(taskId);
        if (taskStatus.status === "ready") {
          toast({
            title: "Your video is ready!",
          });
          clearInterval(intervalId);
          router.push(`/video/${taskStatus.video_id}`);
          setTaskLoading(false);
        }
        const randomFact = await getRandomFact();
        setFact(randomFact);
      } catch (error) {
        console.error("Error checking task status:", error);
        clearInterval(intervalId);
      }
    }, 10000);
  };

  if (taskLoading) {
    return (
      <div className="flex justify-center items-center bg-primary">
        <div className="flex flex-col justify-center items-center">
          <Image src={HorseLoading} alt="Horse Loading" />
          <p className="text-sm text-center text-gray-600 mt-2">
            Generating... This may take a while.
          </p>
          {fact && (
            <p className="text-sm text-center text-gray-600 mt-2">
              Did you know? {fact.data}
            </p>
          )}
        </div>
      </div>
    );
  }

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
