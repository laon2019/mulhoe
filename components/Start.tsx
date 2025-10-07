
import { GradientButton } from "@/components/Button";
import Image from "next/image";
import { motion } from "framer-motion";


// Components
export const StartComponent = ({ onStart }: { onStart: () => void }) => {
  const bubbles = Array.from({ length: 100 }).map(() => ({
    left: Math.random() * 100,
    size: Math.random() * 12 + 6,
    delay: Math.random() * 10,
    duration: Math.random() * 10 + 5,
    opacity: Math.random() * 0.5 + 0.3,
  }));

  return (
    <div className="w-full h-[100svh] bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] overflow-hidden relative">
      {/* 상단 제목 + 물방울 */}
      <header className="py-12 text-center relative z-20">
        {/* 물방울 */}
        {bubbles.map((bubble, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: -bubble.size,
              background: `rgba(255, 255, 255, ${bubble.opacity})`,
            }}
            animate={{ bottom: "110%", opacity: [0, bubble.opacity, 0] }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "linear",
            }}
          />
        ))}
        <motion.div
          className="absolute left-4 top-1/4 w-40 h-40"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/imgs/squid.svg" alt="squid" width={128} height={128} />
        </motion.div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 150" className="mx-auto">
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B9D" />
              <stop offset="50%" stopColor="#FEC163" />
              <stop offset="100%" stopColor="#FFD93D" />
            </linearGradient>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#FF6B9D" floodOpacity="0.3" />
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="transparent" />

          <text
            x="50%" y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Dongle, sans-serif"
            fontSize="72"
            fill="none"
            stroke="#FF6B9D"
            strokeWidth="8"
            strokeLinejoin="round"
            filter="url(#shadow)"
            paintOrder="stroke fill"
          >
            물회의 취향
          </text>

          <text
            x="50%" y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Dongle, sans-serif"
            fontSize="72"
            fill="url(#textGradient)"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
            paintOrder="stroke fill"
          >
            물회의 취향
          </text>
        </svg>
        <motion.div
          className="absolute -right-2 top-1/3 w-40 h-40"
          animate={{ rotate: [10, -10, 10] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/imgs/abalone.svg" alt="abalone" width={128} height={128} />
        </motion.div>
        <p className="text-white/80 mt-2 text-lg">
          나의 취향을 알아보는 재미있는 테스트!
        </p>
      </header>

      {/* 중간 이미지 + 해산물 */}
      <main className="flex-1 flex items-center justify-center w-full relative z-10">
        <div className="relative w-64 h-64">
          <Image
            src="/imgs/start2.png"
            alt="중간 이미지"
            width={256}
            height={256}
            className="rounded-2xl shadow-2xl object-cover relative z-10"
          />
        </div>
      </main>

      {/* 시작 버튼 */}
      <section className="py-16 w-full flex justify-center relative z-20">
        <GradientButton variant="primary" size="lg" className="w-full max-w-[300px]" onClick={onStart}>
          시작하기
        </GradientButton>
      </section>
    </div>
  );
};