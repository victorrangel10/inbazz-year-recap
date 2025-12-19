import {
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
  Img,
} from "remotion";
import { Lottie } from "@remotion/lottie";
import { useLottie } from "../hooks/useLottie";

export default function Customers({ totalViews }: { totalViews: number }) {
  const frame = useCurrentFrame();
  const fireAnimationData = useLottie("/lottie/fire.json");

  // Maracanã capacity (approximately 78,000)
  const maracanaCapacity = 78000;
  const stadiumsNumber = Math.floor(totalViews / maracanaCapacity);
  const stadiumsEquivalent = stadiumsNumber.toLocaleString("pt-BR");

  // Animation timing
  const titleDelay = 0;
  const titleDuration = 60;
  const numberStartFrame = titleDelay + titleDuration;
  const numberDuration = 80;
  const comparisonStartFrame = numberStartFrame + numberDuration;
  const comparisonDuration = 60;

  // "Você alcançou" animation
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
    [100, 0],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Number animation with counter
  const animatedViews = interpolate(
    frame,
    [numberStartFrame, numberStartFrame + numberDuration],
    [0, totalViews],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const numberOpacity = interpolate(
    frame,
    [numberStartFrame, numberStartFrame + numberDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const numberScale = interpolate(
    frame,
    [numberStartFrame, numberStartFrame + numberDuration],
    [0.8, 1],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // "visualizações" text
  const viewsTextOpacity = interpolate(
    frame,
    [numberStartFrame + 20, numberStartFrame + 40],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Comparison animation
  const comparisonOpacity = interpolate(
    frame,
    [comparisonStartFrame, comparisonStartFrame + comparisonDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const comparisonTranslateY = interpolate(
    frame,
    [comparisonStartFrame, comparisonStartFrame + comparisonDuration],
    [50, 0],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const formatNumber = (num: number): string => {
    return Math.floor(num).toLocaleString("pt-BR");
  };

  return (
    <div className="flex flex-col items-center w-full h-full relative">
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
        className="flex flex-col items-center justify-center w-full h-full relative px-16"
        style={{ zIndex: 2 }}
      >
        {/* Title */}
        <div
          className="text-[100px] mb-8"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          Você alcançou
        </div>

        {/* Number with animation */}
        <div
          className="flex items-center gap-8 mb-6"
          style={{
            opacity: numberOpacity,
            transform: `scale(${numberScale})`,
          }}
        >
          <div className="text-[180px] font-bold text-[#FFB088]">
            {formatNumber(animatedViews)}
          </div>
          {fireAnimationData && (
            <Lottie
              animationData={fireAnimationData}
              className="inline-block"
              style={{ width: 160, height: 160 }}
              loop
            />
          )}
        </div>

        {/* "visualizações" text */}
        <div
          className="text-[100px] mb-16"
          style={{ opacity: viewsTextOpacity }}
        >
          visualizações
        </div>

        {/* Comparison */}
        <div
          className="text-[70px] text-center max-w-[1400px] leading-tight"
          style={{
            opacity: comparisonOpacity,
            transform: `translateY(${comparisonTranslateY}px)`,
          }}
        >
          Isso equivale a{" "}
          <span className="text-[90px] font-bold text-[#FFB088]">
            {stadiumsEquivalent}
          </span>{" "}
          estádios do Maracanã lotados! 🏟️
        </div>
      </div>
    </div>
  );
}
