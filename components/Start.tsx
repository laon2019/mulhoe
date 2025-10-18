import Image from "next/image";
import { motion } from "framer-motion";

export const StartComponent = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="w-full h-[100svh] relative">
      <Image
        src="/imgs/startPoster.webp"
        alt="Start Poster"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-1 w-full flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05, cursor: "pointer" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Image
            src="/imgs/startBtn.svg"
            alt="Start Button"
            width={360}
            height={80}
            className="object-contain"
            onClick={onStart}
          />
        </motion.div>
      </div>
    </div>
  );
};