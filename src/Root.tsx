import "./index.css";
import { Composition } from "remotion";
import HelloWorld from "./HelloWorld";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={60 * 43}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          storeName: "Creem",
          joinedDate: "2025-12-01",
          totalRevenue: 1274,
          totalCustomers: 5,
          countries: [
            "GB",
            "CA",
            "AU",
            "DE",
            "FR",
            "ES",
            "IT",
            "NL",
            "BE",
            "SE",
          ],
          bestCustomer: 124,
          saleEveryMinutes: 5400,
        }}
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
