import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

export default function FadeWrapper({
  children,
  duration,
  fadeInFrames = 15,
  fadeOutFrames = 15,
}: {
  children: React.ReactNode;
  duration: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}) {
  const frame = useCurrentFrame();

  const fadeInOpacity = useMemo(
    () =>
      interpolate(frame, [0, fadeInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    [frame, fadeInFrames],
  );

  const fadeOutOpacity = useMemo(
    () =>
      interpolate(frame, [duration - fadeOutFrames, duration], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    [frame, duration, fadeOutFrames],
  );

  const opacity = Math.min(fadeInOpacity, fadeOutOpacity);

  return (
    <AbsoluteFill
      style={{ opacity }}
      className="flex items-center justify-center"
    >
      {children}
    </AbsoluteFill>
  );
}
