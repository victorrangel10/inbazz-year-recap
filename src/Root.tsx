import "./index.css";
import { Composition } from "remotion";
import HelloWorld from "./HelloWorld";

const storeData = {
  storeName: "Zerezes",
  joinedDate: "2025-06-20",
  totalSales: 7059,
  totalRevenue: 4136554.73,
  totalViews: 20571729,
  totalPosts: 4593,
  topByRevenue: {
    name: "lauany schultz",
    username: "lauanyschultz",
    profilePhoto:
      "https://pyleyiwcydiznmrilviu.supabase.co/storage/v1/object/public/bucket/userprofilepicture/lauanyschultz",
    value: 296507.8,
  },
  topBySales: {
    name: "lauany schultz",
    username: "lauanyschultz",
    profilePhoto:
      "https://pyleyiwcydiznmrilviu.supabase.co/storage/v1/object/public/bucket/userprofilepicture/lauanyschultz",
    value: 517,
  },
  topByViews: {
    name: "lauany schultz",
    username: "lauanyschultz",
    profilePhoto:
      "https://pyleyiwcydiznmrilviu.supabase.co/storage/v1/object/public/bucket/userprofilepicture/lauanyschultz",
    value: 832198,
  },
  topProducts: [
    {
      name: "Conjunto Zerezes",
      quantity: 1804,
      value: 902119.93,
    },
    {
      name: "Conjunto Zerezes",
      quantity: 1463,
      value: 749441.51,
    },
    {
      name: "Conjunto Archt",
      quantity: 1139,
      value: 1073.0,
    },
  ],
  saleEveryMinutes: 74.45813854653633,
  bestCampaign: {
    name: "Campanha bonificada de engajamento de Agosto",
    views: 3156606,
    likes: 267005,
    posts: 347,
    averageViewsPerPost: 9097,
  },
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={60 * 47}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={storeData}
      />
    </>
  );
};

// Region = us-east-1
// Memory = 2048MB
// Disk size = 2048MB
// Timeout = 120sec
// Version = 4.0.384
// CloudWatch Logging Enabled = true
// CloudWatch Retention Period = 14 days
// Lambda Insights Enabled = false
// Deployed as remotion-render-4-0-384-mem2048mb-disk2048mb-120sec

// andreelias@Andres-MacBook-Pro-2 creem-year-review % npx remotion lambda sites create src/index.ts --site-name=creem-recap
// Bundled site         ━━━━━━━━━━━━━━━━━━ 2197ms
// Created bucket       ━━━━━━━━━━━━━━━━━━ 1641ms
// Uploaded to S3       ━━━━━━━━━━━━━━━━━━ 3508ms (+28 files)
// Serve URL            https://remotionlambda-useast1-5iy6mnvtvj.s3.us-east-1.amazonaws.com/sites/creem-recap/index.html
// Site name            creem-recap

// ℹ️   Redeploy your site everytime you make changes to it. You can overwrite the existing site by running:
// npx remotion lambda sites create src/index.ts --site-name=creem-recap
