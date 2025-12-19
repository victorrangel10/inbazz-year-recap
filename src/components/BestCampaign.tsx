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
  totalLikes = 0,
  totalPosts = 0,
}: {
  campaignName?: string;
  totalViews?: number;
  totalLikes?: number;
  totalPosts?: number;
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

  const animatedLikes = interpolate(
    frame,
    [statsStartFrame, statsStartFrame + statsDuration],
    [0, totalLikes],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const animatedPosts = interpolate(
    frame,
    [statsStartFrame, statsStartFrame + statsDuration],
    [0, totalPosts],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Format numbers
  const formatNumber = (value: number): string => {
    if (value >= 1000000) {
      return `${Math.round(value / 1000000)}M`;
    } else if (value >= 1000) {
      return `${Math.round(value / 1000)}K`;
    } else {
      return Math.floor(value).toLocaleString("pt-BR");
    }
  };

  const fireAnimationData = useLottie("/lottie/fire.json");
  const yellowHeartAnimationData = useLottie("/lottie/yellow-heart.json");

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
          className="text-[80px] mx-auto w-full px-8"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          Sua melhor campanha foi
        </div>
        <div
          className="text-[90px] w-full font-bold mb-16 px-8 break-words"
          style={{
            opacity: campaignNameOpacity,
            transform: `translateY(${campaignNameTranslateY}px)`,
          }}
        >
          {campaignName}
        </div>

        {/* Stats Grid */}
        <div
          className="flex gap-20 items-center justify-center flex-wrap px-8"
          style={{
            opacity: statsOpacity,
            transform: `translateY(${statsTranslateY}px)`,
          }}
        >
          {/* Views */}
          <div className="flex flex-col items-center min-w-[300px]">
            <div className="text-[50px] text-gray-300 mb-4 flex items-center gap-3">
              <span>Views</span>
              {fireAnimationData && (
                <Lottie
                  animationData={fireAnimationData}
                  className="inline-block"
                  style={{ width: 50, height: 50 }}
                  loop
                />
              )}
            </div>
            <div className="text-[90px] font-bold">
              {formatNumber(animatedViews)}
            </div>
          </div>

          {/* Likes */}
          <div className="flex flex-col items-center min-w-[300px]">
            <div className="text-[50px] text-gray-300 mb-4 flex items-center gap-3">
              <span>Likes</span>
              {yellowHeartAnimationData && (
                <Lottie
                  animationData={yellowHeartAnimationData}
                  className="inline-block"
                  style={{ width: 50, height: 50 }}
                  loop
                />
              )}
            </div>
            <div className="text-[90px] font-bold">
              {formatNumber(animatedLikes)}
            </div>
          </div>

          {/* Posts */}
          <div className="flex flex-col items-center min-w-[300px]">
            <div className="text-[50px] text-gray-300 mb-4">
              <span>Posts</span>
            </div>
            <div className="text-[90px] font-bold">
              {formatNumber(animatedPosts)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
