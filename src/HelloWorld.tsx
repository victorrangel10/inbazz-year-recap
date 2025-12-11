import { AbsoluteFill, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceMono";
import ImageBackground from "./components/ImageBackground";
import AnimatedText from "./components/AnimatedText";
import YouJoined from "./components/YouJoined";
import Revenue from "./components/Revenue";
import Customers from "./components/Customers";
import Countries from "./components/Countries";
import BigCustomer from "./components/BigCustomer";
import AverageHours from "./components/AverageHours";
import { ReactElement } from "react";
import YearSummary from "./components/YearSummary";
import FadeWrapper from "./components/FadeWrapper";
import { Colors } from "./theme";

const { fontFamily } = loadFont(); // "Titan One"

interface HelloWorldProps {
  joinedDate?: string;
  totalRevenue?: number;
  totalCustomers?: number;
  countries?: string[];
  bestCustomer?: number;
  saleEveryMinutes?: number;
}

interface SequenceConfig {
  component: ReactElement;
  duration: number;
  gap: number; // Space after this component before the next one starts
}

export default function HelloWorld({
  joinedDate = "2025-01-01",
  totalRevenue = 1400000,
  totalCustomers = 5,
  countries = [],
  bestCustomer = 1234,
  saleEveryMinutes = 540,
}: HelloWorldProps) {
  const sequences: SequenceConfig[] = [
    {
      component: (
        <>
          <ImageBackground />
          <AnimatedText />
        </>
      ),
      duration: 60 * 3,
      gap: 22,
    },
    // {
    //   component: <Ready />,
    //   duration: 60 * 2.6,
    //   gap: -4,
    // },
    // {
    //   component: <Sprinkles />,
    //   duration: 60 * 0.6,
    //   gap: 30,
    // },
    {
      component: <YouJoined joinedDate={joinedDate} />,
      duration: 60 * 3 + 40,
      gap: 30,
    },
    {
      component: <Revenue totalRevenue={totalRevenue} />,
      duration: 60 * 3 + 40,
      gap: 30,
    },
    {
      component: <Customers totalCustomers={totalCustomers} />,
      duration: 60 * 4 + 40,
      gap: 30,
    },
    {
      component: <Countries countries={countries} />,
      duration: 60 * 6.3 + 40,
      gap: 30,
    },
    {
      component: <BigCustomer bestCustomer={bestCustomer} />,
      duration: 60 * 5 + 40,
      gap: 30, // Negative gap means it starts before the previous one ends
    },
    {
      component: <AverageHours saleEveryMinutes={saleEveryMinutes} />,
      duration: 60 * 3 + 40,
      gap: 30,
    },
    {
      component: <YearSummary />,
      duration: 60 * 8 + 40, // 8+ seconds for screenshot opportunity
      gap: 30,
    },
    // {
    //   component: <ThatsIt />,
    //   duration: 60 * 1 + 40,
    //   gap: 30,
    // },
    // {
    //   component: <ThankYou />,
    //   duration: 60 * 6 + 40,
    //   gap: 0, // Last component, no gap needed
    // },
  ];

  let currentFrame = 0;

  return (
    <>
      <AbsoluteFill
        style={{
          fontFamily,
          backgroundColor: Colors.background,
          color: Colors.text,
        }}
      >
        {sequences.map((seq, index) => {
          const from = currentFrame;
          currentFrame += seq.duration + seq.gap;
          return (
            <Sequence key={index} from={from} durationInFrames={seq.duration}>
              <FadeWrapper duration={seq.duration}>{seq.component}</FadeWrapper>
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </>
  );
}
