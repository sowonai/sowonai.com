import Head from "@docusaurus/Head";
import clsx from "clsx";
import React from "react";

import { CommonLayout } from "../refine-theme/common-layout";
import { LandingFooter } from "../refine-theme/landing-footer";
import { LandingCommunity } from "../refine-theme/landing-community";
import { LandingEnterpriseDevelopers } from "../refine-theme/landing-enterprise-developers";
import { LandingTrustedByDevelopers } from "../refine-theme/landing-trusted-by-developers";
import { LandingPackages } from "../refine-theme/landing-packages";
import { LandingAlreadyInvented } from "../refine-theme/landing-already-invented";
import { LandingPureReactCode } from "../refine-theme/landing-pure-react-code";
import { LandingSweetSpot } from "../refine-theme/landing-sweet-spot";
import { LandingHeroSection } from "../refine-theme/landing-hero-section";
import { LandingTryItSection } from "../refine-theme/landing-try-it-section";
import { CommonHeader } from "../refine-theme/common-header";
import { LandingTestimonial } from "../refine-theme/landing-testimonial";
import { LandingAiHeroSection } from "../refine-theme/landing-ai-hero-section";
import { LandingSlackDemoScenarios } from "../refine-theme/landing-slack-demo-scenarios";
import { LandingYamlWorkflowBuilder } from "../refine-theme/landing-yaml-workflow-builder";
import { LandingSowonFlowFeatures } from "../refine-theme/landing-sowonflow-features";

function Home() {
  const title = "SowonAI | Build your AI team yourself";
  return (
    <>
      <Head>
        <html data-active-page="index" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content="세상에... 다른 회사들은 이미 이렇게 쓰고 있구나! AI를 어려워하는 사람들에게 슈퍼파워를 제공합니다. 개발자 없이도 5분 만에 AI 팀을 구축하고 업무를 자동화하세요. Build your AI team yourself." />
        <link
          rel="preload"
          href="https://sowonai.com/embed-form"
          as="document"
        />
      </Head>
      <CommonLayout description="세상에... 다른 회사들은 이미 이렇게 쓰고 있구나! AI를 어려워하는 사람들에게 슈퍼파워를 제공합니다. 개발자 없이도 5분 만에 AI 팀을 구축하고 업무를 자동화하세요. Build your AI team yourself.">
        <div className={clsx()}>
          <CommonHeader />
          <div
            className={clsx(
              "flex flex-col",
              "gap-16 landing-sm:gap-20 landing-md:gap-28 landing-lg:gap-40",
              "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
              "px-2 landing-sm:px-0",
              "pb-12 landing-sm:pb-16 landing-md:pb-20 landing-lg:pb-40",
              "mx-auto",
            )}
          >
            <div
              className={clsx("mt-0", "landing-sm:mt-8", "landing-lg:mt-20")}
            >
              <LandingAiHeroSection />
              <LandingSlackDemoScenarios 
                className={clsx("mt-12", "landing-sm:mt-20", "landing-md:mt-28")} 
              />
              <LandingHeroSection className={clsx("mt-8")} />
              <LandingTrustedByDevelopers
                className={clsx(
                  "mt-12",
                  "landing-sm:mt-20",
                  "landing-md:mt-28",
                  "landing-lg:mt-10",
                )}
              />
            </div>
            <LandingSweetSpot />
            <LandingYamlWorkflowBuilder 
              className={clsx("mt-12", "landing-sm:mt-20", "landing-md:mt-28")} 
            />
            <LandingSowonFlowFeatures 
              className={clsx("mt-12", "landing-sm:mt-20", "landing-md:mt-28")} 
            />
            <div className={clsx("flex flex-col", "gap-12 landing-md:gap-6")}>
              <LandingPackages />
              <div
                className={clsx(
                  "flex flex-col landing-md:flex-row",
                  "gap-12 landing-md:gap-6",
                )}
              >
                <LandingAlreadyInvented
                  className={clsx(
                    "w-full landing-md:w-[50%] landing-lg:w-[538px]",
                  )}
                />
                <LandingPureReactCode
                  className={clsx(
                    "w-full landing-md:w-[50%] landing-lg:w-[640px]",
                  )}
                />
              </div>
            </div>
            <LandingEnterpriseDevelopers />
            <LandingCommunity />
            <LandingTestimonial />
            <LandingTryItSection />
          </div>
          <LandingFooter />
        </div>
      </CommonLayout>
    </>
  );
}

export default Home;
