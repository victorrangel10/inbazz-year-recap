import {
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
  Img,
} from "remotion";
import { Lottie } from "@remotion/lottie";
import { useLottie } from "../hooks/useLottie";

export default function AverageHours({
  saleEveryMinutes,
}: {
  saleEveryMinutes: number;
}) {
  const frame = useCurrentFrame();
  const fireAnimationData = useLottie("/lottie/fire.json");

  // Animation timing
  const textDuration = 60; // 1 second at 60fps
  const textDelay = 0; // Start immediately
  const hoursStartFrame = textDelay + textDuration; // Start after "You made a sale every" appears
  const hoursDuration = 60; // Same duration as text

  const hours = Math.floor(saleEveryMinutes / 60);
  const minutes = Math.floor(saleEveryMinutes % 60);
  const timeToDisplay =
    hours > 0
      ? `${hours} ${hours === 1 ? "hora" : "horas"}${minutes > 0 ? ` e ${minutes} ${minutes === 1 ? "minuto" : "minutos"}` : ""}`
      : `${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;

  // "Seus creators fizeram uma venda a cada" animation: bottom-up fade in
  const textOpacity = interpolate(
    frame,
    [textDelay, textDelay + textDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const textTranslateY = interpolate(
    frame,
    [textDelay, textDelay + textDuration],
    [100, 0], // Start 100px below, end at center
    {
      easing: Easing.out(Easing.back(1.2)), // Spring effect
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Hours animation: same bottom-up fade in as text
  const hoursOpacity = interpolate(
    frame,
    [hoursStartFrame, hoursStartFrame + hoursDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const hoursTranslateY = interpolate(
    frame,
    [hoursStartFrame, hoursStartFrame + hoursDuration],
    [100, 0], // Start 100px below, end at center
    {
      easing: Easing.out(Easing.back(1.2)), // Spring effect
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

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
        className="flex flex-col items-center justify-center text-center w-full relative"
        style={{ zIndex: 2 }}
      >
        <div
          className="text-[80px] mx-auto w-full flex items-center justify-center gap-4 px-8"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          <span>Seus creators fizeram uma venda a cada</span>
        </div>
        <div
          className="text-[150px] w-full font-bold px-8 break-words"
          style={{
            opacity: hoursOpacity,
            transform: `translateY(${hoursTranslateY}px)`,
          }}
        >
          {timeToDisplay}
        </div>
      </div>
    </div>
  );
}
