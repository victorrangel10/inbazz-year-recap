import {
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
  Img,
} from "remotion";
import { Lottie } from "@remotion/lottie";
import { useLottie } from "../hooks/useLottie";

interface Creator {
  name: string;
  username: string;
  profilePhoto: string;
  value: string | number;
}

interface TopCreatorsProps {
  topByRevenue?: Creator;
  topBySales?: Creator;
  topByViews?: Creator;
}

function CreatorCard({
  creator,
  category,
  delay,
  categoryIcon,
  useEmoji = false,
  emoji,
}: {
  creator: Creator;
  category: string;
  delay: number;
  categoryIcon?: any;
  useEmoji?: boolean;
  emoji?: string;
}) {
  const frame = useCurrentFrame();
  const animationDuration = 40;

  const opacity = interpolate(
    frame,
    [delay, delay + animationDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scale = interpolate(
    frame,
    [delay, delay + animationDuration],
    [0.8, 1],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const translateY = interpolate(
    frame,
    [delay, delay + animationDuration],
    [50, 0],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      className="flex flex-col items-center justify-between p-8 rounded-3xl border-2 border-[#FFB088]/30 w-full h-[520px]"
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        background:
          "linear-gradient(135deg, rgba(255, 176, 136, 0.2) 0%, rgba(255, 176, 136, 0.1) 100%)",
      }}
    >
      {/* Category with icon */}
      <div className="text-[40px] text-gray-300 mb-6 flex items-center justify-center gap-3 h-[60px]">
        {useEmoji ? (
          <span style={{ fontSize: "70px" }}>{emoji}</span>
        ) : (
          categoryIcon && (
            <Lottie
              animationData={categoryIcon}
              className="inline-block"
              style={{ width: 70, height: 70 }}
              loop
            />
          )
        )}
        <span>{category}</span>
      </div>

      {/* Profile Photo */}
      <Img
        src={creator.profilePhoto}
        className="w-32 h-32 rounded-full mb-6 object-cover border-4 border-[#FFB088]"
        alt={creator.name}
      />

      {/* Creator Info */}
      <div className="text-[50px] font-bold mb-2 text-center h-[60px] flex items-center">
        {creator.name}
      </div>
      <div className="text-[35px] text-gray-300 mb-6 h-[45px] flex items-center">
        @{creator.username}
      </div>

      {/* Value */}
      <div className="text-[60px] font-bold text-[#FFB088] h-[75px] flex items-center">
        {creator.value}
      </div>
    </div>
  );
}

export default function TopCreators({
  topByRevenue = {
    name: "Maria Silva",
    username: "mariasilva",
    profilePhoto: "https://i.pravatar.cc/300?img=1",
    value: "$45.2K",
  },
  topBySales = {
    name: "João Santos",
    username: "joaosantos",
    profilePhoto: "https://i.pravatar.cc/300?img=2",
    value: "1,234",
  },
  topByViews = {
    name: "Ana Costa",
    username: "anacosta",
    profilePhoto: "https://i.pravatar.cc/300?img=3",
    value: "2.5M",
  },
}: TopCreatorsProps) {
  const frame = useCurrentFrame();

  // Title animation
  const titleDelay = 0;
  const titleDuration = 40;
  const cardsDelay = titleDelay + titleDuration + 20;

  const titleOpacity = interpolate(
    frame,
    [titleDelay, titleDelay + titleDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const titleTranslateY = interpolate(
    frame,
    [titleDelay, titleDelay + titleDuration],
    [50, 0],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Load animations
  const moneyAnimationData = useLottie("/lottie/money.json");
  const coinAnimationData = useLottie("/lottie/coin.json");
  const fireAnimationData = useLottie("/lottie/fire.json");

  return (
    <div className="w-full h-full relative">
      <Img
        src={staticFile("Inbazz-Background.jpg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 1 }} />
      <div
        className="flex flex-col items-center justify-center w-full h-full p-16 relative"
        style={{ zIndex: 2 }}
      >
        {/* Title */}
        <div
          className="text-[100px] font-bold mb-12 text-center"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          Top Creators
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-12 w-full max-w-[1700px]">
          <CreatorCard
            useEmoji={true}
            emoji="💵"
            creator={topByRevenue}
            category="Maior Receita"
            delay={cardsDelay}
            categoryIcon={moneyAnimationData}
          />
          <CreatorCard
            useEmoji={true}
            emoji="🪙"
            creator={topBySales}
            category="Mais Vendas"
            delay={cardsDelay + 15}
            categoryIcon={coinAnimationData}
          />
          <CreatorCard
            creator={topByViews}
            category="Mais Views"
            delay={cardsDelay + 30}
            categoryIcon={fireAnimationData}
          />
        </div>
      </div>
    </div>
  );
}
