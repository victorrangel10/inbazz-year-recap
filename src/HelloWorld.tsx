import { AbsoluteFill, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceMono";
import ImageBackground from "./components/ImageBackground";
import AnimatedText from "./components/AnimatedText";
import YouJoined from "./components/YouJoined";
import Revenue from "./components/Revenue";
import Customers from "./components/Customers";
import CommunityPosts from "./components/CommunityPosts";
import TopCreators from "./components/TopCreators";
import TopProducts from "./components/TopProducts";
import AverageHours from "./components/AverageHours";
import BestCampaign from "./components/BestCampaign";
import { ReactElement } from "react";
import YearSummary from "./components/YearSummary";
import FadeWrapper from "./components/FadeWrapper";
import { Colors } from "./theme";

const { fontFamily } = loadFont(); // "Titan One"

interface HelloWorldProps {
  joinedDate?: string;
  totalRevenue?: number;
  totalViews?: number;
  totalPosts?: number;
  topByRevenue?: any;
  topBySales?: any;
  topByViews?: any;
  topProducts?: any[];
  saleEveryMinutes?: number;
  bestCampaignName?: string;
  bestCampaignViews?: number;
  bestCampaignRevenue?: number;
}

interface SequenceConfig {
  component: ReactElement;
  duration: number;
  gap: number; // Space after this component before the next one starts
}

export default function HelloWorld({
  joinedDate = "2025-01-01",
  totalRevenue = 1400000,
  totalViews = 100,
  totalPosts = 1250,
  topByRevenue,
  topBySales,
  topByViews,
  topProducts,
  saleEveryMinutes = 2,
  bestCampaignName = "Summer Collection 2025",
  bestCampaignViews = 250000,
  bestCampaignRevenue = 45000,
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
      gap: -15,
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
      gap: -15,
    },
    {
      component: <Revenue totalRevenue={totalRevenue} />,
      duration: 60 * 3 + 40,
      gap: -15,
    },
    {
      component: <Customers totalViews={totalViews} />,
      duration: 60 * 4 + 40,
      gap: -15,
    },
    {
      component: <CommunityPosts totalPosts={totalPosts} />,
      duration: 60 * 3 + 40,
      gap: -15,
    },
    {
      component: (
        <TopCreators
          topByRevenue={topByRevenue}
          topBySales={topBySales}
          topByViews={topByViews}
        />
      ),
      duration: 60 * 5 + 40,
      gap: -15,
    },
    {
      component: <TopProducts products={topProducts} />,
      duration: 60 * 5 + 40,
      gap: -15,
    },
    {
      component: <AverageHours saleEveryMinutes={saleEveryMinutes} />,
      duration: 60 * 3 + 40,
      gap: -15,
    },
    {
      component: (
        <BestCampaign
          campaignName={bestCampaignName}
          totalViews={bestCampaignViews}
          totalRevenue={bestCampaignRevenue}
        />
      ),
      duration: 60 * 5 + 40,
      gap: -15,
    },
    {
      component: <YearSummary />,
      duration: 60 * 8 + 40, // 8+ seconds for screenshot opportunity
      gap: -15,
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
