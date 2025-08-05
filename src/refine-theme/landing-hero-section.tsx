import React from "react";
import clsx from "clsx";
import { LandingHeroGithubStars } from "./landing-hero-github-stars";
import { LandingStartActionIcon } from "./icons/landing-start-action";

import { LandingHeroAnimation } from "./landing-hero-animation";
import { LandingCopyCommandButton } from "./landing-copy-command-button";
import Link from "@docusaurus/Link";
import { LandingHeroShowcaseSection } from "./landing-hero-showcase-section";

export const LandingHeroSection = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "w-full",
        "gap-4",
        "landing-sm:gap-12",
        "landing-md:gap-[59px]",
        "landing-lg:gap-20",
        className,
      )}
    >
      <div
        className={clsx(
          "px-2 landing-sm:px-0",
          "flex",
          "flex",
          "w-full",
          "relative",
          "min-h-[360px]",
          "landing-lg:min-h-[480px]",
          "py-4",
        )}
      >
        <div
          className={clsx(
            "landing-sm:pl-10",
            "flex",
            "flex-col",
            "justify-center",
            "gap-6",
            "z-[1]",
            "landing-lg:justify-between",
            "landing-lg:py-8",
          )}
        >
          <LandingHeroGithubStars />
          <div className={clsx("flex", "flex-col", "gap-6")}>
            <h1
              className={clsx(
                "text-[32px] leading-[40px]",
                "tracking-[-0.5%]",
                "landing-sm:text-[56px] landing-sm:leading-[72px]",
                "landing-sm:max-w-[588px]",
                "landing-sm:tracking-[-2%]",
                "font-extrabold",
                "text-gray-900 dark:text-gray-0",
              )}
            >
              Build your AI team yourself
            </h1>
            <p
              className={clsx(
                "font-normal",
                "text-base",
                "text-gray-600 dark:text-gray-300",
                "landing-xs:max-w-[384px]",
              )}
            >
              AI를 어려워하는 사람들에게 슈퍼파워를 제공합니다. 
              Everyone, Everywhere, EveryAI로 당신의 업무를 혁신하세요.
            </p>
          </div>
          <div
            className={clsx(
              "flex",
              "items-center",
              "justify-start",
              "gap-4",
              "landing-lg:gap-6",
            )}
          >
            <Link
              to="/docs"
              className={clsx(
                "self-start",
                "rounded-3xl",
                "!text-gray-0 dark:!text-gray-900",
                "bg-refine-blue dark:bg-refine-cyan-alt",
                "transition-[filter]",
                "duration-150",
                "ease-in-out",
                "hover:brightness-110",
                "py-3",
                "pl-3 pr-5",
                "w-[200px] landing-sm:w-max",
                "flex",
                "items-center",
                "justify-center",
                "gap-2",
                "hover:!no-underline",
              )}
            >
              <LandingStartActionIcon />
              <span className={clsx("text-base", "font-semibold")}>
                시작하기
              </span>
            </Link>
            <LandingCopyCommandButton
              className={clsx("hidden", "landing-sm:block")}
            />
          </div>
        </div>
        <div
          className={clsx(
            "hidden landing-md:block",
            "absolute",
            "top-0",
            "right-0",
          )}
        >
          <LandingHeroAnimation />
        </div>
      </div>
      <LandingHeroShowcaseSection />
    </div>
  );
};
