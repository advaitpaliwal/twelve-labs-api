import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function InputFile() {
  return (
    <div className="grid max-w-sm gap-1.5 items-center px-4 py-3 border border-dashed rounded-lg hover:border-solid hover:border-primary transition duration-300 ease-in-out ">
      <Label htmlFor="video-file" className="mb-2 text-lg font-medium ">
        Upload a video
      </Label>
      <Input
        id="video-file"
        type="file"
        accept=".mp4"
        className="block text-sm justify-left bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
      />
      <p className="text-xs text-gray-500 mt-1">MP4 only</p>
    </div>
  );
}
