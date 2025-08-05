import clsx from "clsx";
import React from "react";
import Link from "@docusaurus/Link";

export const LandingAiHeroSection = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "bg-[#C9D3E2]",
        "w-full",
        "px-6",
        "py-6",
        "landing-sm:px-10",
        "landing-sm:py-12",
        "relative",
        "z-[1]",
        "overflow-hidden",
        "rounded-3xl",
        "max-[375px]:rounded-none",
        "max-[375px]:w-screen",
        "max-[375px]:left-1/2",
        "max-[375px]:-translate-x-1/2",
        className,
      )}
    >
      <div className={clsx("relative", "z-[4]")}>
        <h2
          className={clsx(
            "text-2xl",
            "landing-sm:text-[32px]",
            "landing-sm:leading-10",
            "tracking-[-0.02em]",
            "text-gray-600",
          )}
        >
          다른 회사들은 이미 시작했습니다.
        </h2>
        <h2
          className={clsx(
            "text-[32px]",
            "leading-10",
            "landing-sm:text-[56px]",
            "landing-sm:leading-[72px]",
            "tracking-[-0.02em]",
            "font-bold",
            "text-gray-900",
          )}
        >
          당신도 AI 팀을 직접 만드세요!
        </h2>

        <p className={clsx("max-w-[446px]", "text-gray-900", "mt-4")}>
          슬랙에서 바로 사용하는 AI 어시스턴트부터 복잡한 워크플로우까지,
          개발자 없이도 5분 만에 AI 팀을 구축할 수 있습니다.
        </p>        <div
          className={clsx(
            "flex",
            "items-center",
            "gap-10",
            "mt-6",
            "z-[4]",
            "relative",
          )}
        >
          <a
            href="https://slack.sowonai.com"
            target="_blank"
            rel="noreferrer"
            className={clsx(
              "appearance-none",
              "bg-refine-indigo",
              "text-white",
              "hover:text-white",
              "no-underline",
              "px-5",
              "py-3",
              "rounded-[48px]",
              "z-[4]",
            )}
          >
            슬랙에서 시작하기
          </a>
          <Link
            to="/docs"
            className={clsx("text-refine-indigo", "underline", "z-[4]")}
          >
            사용법 알아보기
          </Link>
        </div>
      </div>

      <div className={clsx("absolute", "inset-0", "bg-noise", "z-[2]")} />

      <video
        className={clsx(
          "z-[1]",
          "absolute",
          "inset-0",
          "w-full",
          "h-full",
          "object-cover",
        )}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        controls={false}
        preload="auto"
      >
        <source
          type="video/mp4"
          src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-banner-bg-video.mp4"
        />
      </video>

      <video
        className={clsx(
          "hidden",
          "landing-md:block",
          "z-[3]",
          "absolute",
          "w-[50px]",
          "h-[50px]",
          "top-[100px]",
          "right-[166px]",
          "landing-lg:top-[100px]",
          "landing-lg:right-[320px]",
          "rounded-full",
          "object-cover",
          "object-right",
        )}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        controls={false}
        preload="auto"
      >
        <source
          type="video/mp4"
          src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-banner-logo-ball.mp4"
        />
      </video>

      <img
        src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-banner-logo.png"
        alt="Refine AI Banner Logo"
        className={clsx(
          "hidden",
          "landing-md:block",
          "absolute",
          "inset-0",
          "w-full",
          "h-full",
          "object-cover",
          "z-[2]",
        )}
        loading="eager"
      />
    </div>
  );
};
