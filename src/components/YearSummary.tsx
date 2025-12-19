import {
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { useLottie } from "../hooks/useLottie";
import { Colors } from "../theme";

interface StatCardProps {
  label: string;
  value: string;
  animationData?: LottieAnimationData | null;
  delay: number;
  index: number;
}

function StatCard({
  label,
  value,
  animationData,
  delay,
  index,
}: StatCardProps) {
  const frame = useCurrentFrame();
  const animationStart = delay + index * 15; // Stagger each card
  const animationDuration = 40;

  const opacity = interpolate(
    frame,
    [animationStart, animationStart + animationDuration],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scale = interpolate(
    frame,
    [animationStart, animationStart + animationDuration],
    [0.8, 1],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const translateY = interpolate(
    frame,
    [animationStart, animationStart + animationDuration],
    [50, 0],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      className="flex flex-col items-center justify-center rounded-3xl p-12 border-2"
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        backgroundColor: Colors.surface,
        borderColor: Colors.border,
      }}
    >
      {animationData && (
        <div className="text-8xl mb-4">
          <Lottie
            animationData={animationData}
            className="inline-block"
            style={{ width: 80, height: 80 }}
            loop
          />
        </div>
      )}
      <div className="text-6xl font-bold mb-2" style={{ color: Colors.text }}>
        {value}
      </div>
      <div
        className="text-3xl text-center"
        style={{ color: Colors.textSecondary }}
      >
        {label}
      </div>
    </div>
  );
}

export default function YearSummary() {
  const frame = useCurrentFrame();
  const titleDelay = 0;
  const titleDuration = 40;
  const cardsDelay = titleDelay + titleDuration + 20;

  // Load all Lottie animations
  const moneyFaceAnimationData = useLottie("/lottie/money-face.json");
  const sunglassesAnimationData = useLottie("/lottie/sunglasses.json");
  const coinAnimationData = useLottie("/lottie/coin.json");
  const fireAnimationData = useLottie("/lottie/fire.json");
  const yellowHeartAnimationData = useLottie("/lottie/yellow-heart.json");
  const shoppingCartAnimationData = useLottie("/lottie/shopping_bag.json");

  const stats = [
    {
      label: "Receita Total",
      value: "$1.4M",
      animationData: moneyFaceAnimationData,
    },
    {
      label: "Visualizações",
      value: "5",
      animationData: sunglassesAnimationData,
    },
    {
      label: "Produtos Vendidos",
      value: "47",
      animationData: shoppingCartAnimationData,
    },
    {
      label: "Melhor Creator",
      value: "$1.2K",
      animationData: coinAnimationData,
    },
    {
      label: "Venda a Cada",
      value: "2.5 horas",
      animationData: fireAnimationData,
    },
    {
      label: "Entrou em",
      value: "4 Jan 2025",
      animationData: yellowHeartAnimationData,
    },
  ];

  // Title animation
  const titleOpacity = interpolate(
    frame,
    [titleDelay, titleDelay + titleDuration],
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

  // Store name animation
  const lastCardDelay = cardsDelay + (stats.length - 1) * 15;
  const storeNameDelay = lastCardDelay + 20;

  const storeNameOpacity = interpolate(
    frame,
    [storeNameDelay, storeNameDelay + titleDuration],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const storeNameTranslateY = interpolate(
    frame,
    [storeNameDelay, storeNameDelay + titleDuration],
    [50, 0],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
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
          className="text-8xl font-bold mb-16 text-center flex items-center justify-center gap-4"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          <span>Seu 2025 com a Inbazz</span>
          <Img
            src={staticFile("creem.png")}
            alt="Creem"
            width={100}
            height={100}
            className="translate-y-[5px]"
            style={{ display: "inline-block", verticalAlign: "middle" }}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-[1600px] mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              animationData={stat.animationData}
              delay={cardsDelay}
              index={index}
            />
          ))}
        </div>
        <div
          style={{
            opacity: storeNameOpacity,
            transform: `translateY(${storeNameTranslateY}px)`,
          }}
          className="text-4xl"
        >
          Awesome Store
        </div>
      </div>
    </div>
  );
}
