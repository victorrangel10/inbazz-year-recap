import {
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
  Img,
} from "remotion";
import { Lottie } from "@remotion/lottie";
import { useLottie } from "../hooks/useLottie";

export default function BestCampaign({
  campaignName = "Summer Collection 2025",
  totalViews = 0,
  totalRevenue = 0,
}: {
  campaignName?: string;
  totalViews?: number;
  totalRevenue?: number;
}) {
  const frame = useCurrentFrame();

  // Animation timing
  const titleDuration = 60; // 1 second at 60fps
  const titleDelay = 0;
  const campaignNameStartFrame = titleDelay + titleDuration;
  const campaignNameDuration = 60;
  const statsStartFrame = campaignNameStartFrame + campaignNameDuration;
  const statsDuration = 90; // 1.5 seconds for counter animation

  // "Sua melhor campanha foi" animation: bottom-up fade in
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

  // Campaign name animation: same bottom-up fade in
  const campaignNameOpacity = interpolate(
    frame,
    [campaignNameStartFrame, campaignNameStartFrame + campaignNameDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const campaignNameTranslateY = interpolate(
    frame,
    [campaignNameStartFrame, campaignNameStartFrame + campaignNameDuration],
    [100, 0],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Stats animation: fade in
  const statsOpacity = interpolate(
    frame,
    [statsStartFrame, statsStartFrame + statsDuration / 3],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const statsTranslateY = interpolate(
    frame,
    [statsStartFrame, statsStartFrame + statsDuration / 2],
    [50, 0],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Animate numbers counting up
  const animatedViews = interpolate(
    frame,
    [statsStartFrame, statsStartFrame + statsDuration],
    [0, totalViews],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const animatedRevenue = interpolate(
    frame,
    [statsStartFrame, statsStartFrame + statsDuration],
    [0, totalRevenue],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Format numbers
  const formatNumber = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else {
      return Math.floor(value).toLocaleString();
    }
  };

  const formatRevenue = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${Math.floor(value).toLocaleString()}`;
    }
  };

  const fireAnimationData = useLottie("/lottie/fire.json");
  const moneyFaceAnimationData = useLottie("/lottie/money-face.json");

  return (
    <div className="flex flex-col items-center justify-center text-center w-full h-full relative">
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
        className="flex flex-col items-center justify-center text-center w-full h-full relative"
        style={{ zIndex: 2 }}
      >
        <div
          className="text-[100px] mx-auto w-full"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          Sua melhor campanha foi
        </div>
        <div
          className="text-[140px] w-full font-bold mb-16"
          style={{
            opacity: campaignNameOpacity,
            transform: `translateY(${campaignNameTranslateY}px)`,
          }}
        >
          {campaignName}
        </div>

        {/* Stats Grid */}
        <div
          className="flex gap-32 items-center justify-center"
          style={{
            opacity: statsOpacity,
            transform: `translateY(${statsTranslateY}px)`,
          }}
        >
          {/* Views */}
          <div className="flex flex-col items-center">
            <div className="text-[70px] text-gray-300 mb-4 flex items-center gap-4">
              <span>Visualizações</span>
              {fireAnimationData && (
                <Lottie
                  animationData={fireAnimationData}
                  className="inline-block"
                  style={{ width: 70, height: 70 }}
                  loop
                />
              )}
            </div>
            <div className="text-[120px] font-bold">
              {formatNumber(animatedViews)}
            </div>
          </div>

          {/* Revenue */}
          <div className="flex flex-col items-center">
            <div className="text-[70px] text-gray-300 mb-4 flex items-center gap-4">
              <span>Receita</span>
              {moneyFaceAnimationData && (
                <Lottie
                  animationData={moneyFaceAnimationData}
                  className="inline-block"
                  style={{ width: 70, height: 70 }}
                  loop
                />
              )}
            </div>
            <div className="text-[120px] font-bold">
              {formatRevenue(animatedRevenue)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
