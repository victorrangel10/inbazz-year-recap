import {
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
  Img,
} from "remotion";

export default function YouJoined({
  joinedDate = "2025-01-01",
}: {
  joinedDate: string;
}) {
  const frame = useCurrentFrame();

  // Animation timing
  const youJoinedDuration = 60; // 1 second at 60fps
  const youJoinedDelay = 0; // Start immediately
  const dateStartFrame = youJoinedDelay + youJoinedDuration; // Start after "You joined" appears
  const dateDuration = 60; // Same duration as "You joined"

  // Format the joinedDate prop into a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return {
      firstLine: `${day} de ${month}`,
      secondLine: `de ${year}`,
    };
  };

  const dateText = formatDate(joinedDate);

  // "You joined" animation: bottom-up fade in
  const youJoinedOpacity = interpolate(
    frame,
    [youJoinedDelay, youJoinedDelay + youJoinedDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const youJoinedTranslateY = interpolate(
    frame,
    [youJoinedDelay, youJoinedDelay + youJoinedDuration],
    [100, 0], // Start 100px below, end at center
    {
      easing: Easing.out(Easing.back(1.2)), // Spring effect
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Date animation: same bottom-up fade in as "You joined"
  const dateOpacity = interpolate(
    frame,
    [dateStartFrame, dateStartFrame + dateDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const dateTranslateY = interpolate(
    frame,
    [dateStartFrame, dateStartFrame + dateDuration],
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
      {/* Optional: Add overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 1 }} />
      <div
        className="text-[100px] mx-auto w-full relative"
        style={{
          opacity: youJoinedOpacity,
          transform: `translateY(${youJoinedTranslateY}px)`,
          zIndex: 2,
        }}
      >
        Nossa parceria começou em
      </div>
      <div
        className="text-[180px] w-full font-bold relative flex flex-col items-center"
        style={{
          opacity: dateOpacity,
          transform: `translateY(${dateTranslateY}px)`,
          zIndex: 2,
        }}
      >
        <div>{dateText.firstLine}</div>
        <div>{dateText.secondLine}</div>
      </div>
    </div>
  );
}
