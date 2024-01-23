import Image from "next/image";
import HorseLoading from "@/public/horse_loading.gif";
import { Fact } from "@/types/fact";

interface LoadingDisplayProps {
  fact: Fact | undefined;
}

export const LoadingDisplay: React.FC<LoadingDisplayProps> = ({ fact }) => {
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
};
