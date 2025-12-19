import { Lottie } from "@remotion/lottie";
import {
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
  Img,
} from "remotion";
import { useLottie } from "../hooks/useLottie";

export default function Revenue({ totalRevenue }: { totalRevenue: number }) {
  const frame = useCurrentFrame();

  // Animation timing
  const animationDuration = 120; // 2 seconds at 60fps
  const animationDelay = 0;

  // Interpolate revenue from 0 to target value
  const animatedRevenue = interpolate(
    frame,
    [animationDelay, animationDelay + animationDuration],
    [0, totalRevenue],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Format the revenue number
  const formatRevenue = (value: number): string => {
    return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const moneyAnimationData = useLottie("/lottie/money.json");
  const moneyFaceAnimationData = useLottie("/lottie/money-face.json");

  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full h-full">
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
      <div className="relative" style={{ zIndex: 2 }}>
        <div className="text-[100px] mx-auto w-full flex items-center justify-center gap-8">
          <span>Seus creators venderam</span>
          {moneyFaceAnimationData && (
            <Lottie
              animationData={moneyFaceAnimationData}
              className="inline-block align-middle"
              style={{ width: 100, height: 100 }}
              loop
            />
          )}
        </div>
        <div className="text-[150px] w-full font-bold px-8 break-words">
          {formatRevenue(animatedRevenue)}
        </div>
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          {moneyAnimationData && (
            <Lottie
              animationData={moneyAnimationData}
              className="w-[120%] mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
