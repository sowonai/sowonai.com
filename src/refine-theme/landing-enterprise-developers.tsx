import clsx from "clsx";
import React, { type FC } from "react";
import {
  AccessControlIcon,
  BlackBoxIcon,
  IdentityIcon,
  MonitorIcon,
  SelfHostedIcon,
  SupportIcon,
} from "../components/landing/icons";

import { LandingSectionCtaButtonAlt } from "./landing-section-cta-button";

const list = [
  {
    icon: <SelfHostedIcon />,
    title: "회사에서 써도 안전하겠어 🛡️",
    description:
      "조직관리, 권한설정, 감사로그까지. 기업 보안 요구사항을 모두 충족하는 엔터프라이즈급 기능을 제공합니다.",
  },
  {
    icon: <IdentityIcon />,
    title: "기존 시스템과 완벽 연동",
    description:
      "슬랙, 구글 워크스페이스, 마이크로소프트 365 등 기존 업무 도구와 즉시 연결 가능합니다.",
  },
  {
    icon: <AccessControlIcon />,
    title: "세밀한 권한 관리 체계",
    description:
      "팀별, 역할별 세분화된 접근 권한 설정으로 정보 보안을 강화하세요.",
  },
  {
    icon: <BlackBoxIcon />,
    title: "투명한 AI 의사결정 과정",
    description:
      "AI가 어떤 근거로 결정을 내렸는지 추적 가능한 투명한 AI 시스템을 구축하세요.",
  },
  {
    icon: <MonitorIcon />,
    title: "실시간 모니터링 & 알림",
    description:
      "AI 에이전트의 작업 현황을 실시간으로 모니터링하고 중요한 이벤트를 즉시 알림받으세요.",
  },
  {
    icon: <SupportIcon />,
    title: "전문가 지원 서비스",
    description:
      "AI 도입부터 운영까지, 소원랩스 전문가팀이 직접 지원합니다. 교육, 컨설팅, 우선 기술지원 제공.",
  },
];

type Props = {
  className?: string;
};

export const LandingEnterpriseDevelopers: FC<Props> = ({ className }) => {
  return (
    <div className={clsx(className, "w-full")}>
      <div className={clsx("not-prose", "w-full", "px-4 landing-md:px-10")}>
        <h2
          className={clsx(
            "text-2xl landing-sm:text-[32px] landing-sm:leading-[40px]",
            "tracking-tight",
            "text-start",
            "p-0",
            "dark:text-gray-0 text-gray-900",
          )}
        >
          중소기업 의사결정자들이{" "}
          <span className="font-sans text-[#FE251B] drop-shadow-[0_0_30px_rgba(254,37,27,0.3)]">
            ❤️
          </span>{" "}
          <span
            className={clsx(
              "font-semibold",
              "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
              "text-refine-blue drop-shadow-[0_0_30px_rgba(0,128,255,0.3)]",
            )}
          >
            SowonAI
          </span>
          를 선택하는 이유.
        </h2>
        <p
          className={clsx(
            "mt-4 landing-sm:mt-6",
            "max-w-md",
            "text-base",
            "dark:text-gray-400 text-gray-600",
          )}
        >
          SowonAI는 중소기업의 특별한 니즈를 위해 설계되었습니다.{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-0">
            보안성과 확장성
          </span>
          을 최우선으로 합니다.
        </p>
      </div>

      <div
        className={clsx(
          "mt-8 landing-sm:mt-12 landing-lg:mt-20",
          "grid",
          "grid-cols-1 landing-md:grid-cols-2 landing-lg:grid-cols-3",
          "gap-4 landing-sm:gap-12 landing-md:gap-6",
          "mb-4 landing-sm:mb-12 landing-md:mb-6",
        )}
      >
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "not-prose",
                "p-4 landing-sm:p-10",
                "flex",
                "flex-col landing-sm:flex-row landing-md:flex-col",
                "items-start",
                "gap-6",
                "dark:bg-landing-noise",
                "dark:bg-gray-800 bg-gray-50",
                "rounded-2xl landing-sm:rounded-3xl",
              )}
            >
              <div>{item.icon}</div>
              <div className={clsx("flex", "flex-col", "gap-4")}>
                <div
                  className={clsx(
                    "text-xl",
                    "font-semibold",
                    "text-gray-900 dark:text-gray-0",
                  )}
                >
                  {item.title}
                </div>
                <div
                  className={clsx(
                    "text-base",
                    "dark:text-gray-400 text-gray-600",
                  )}
                >
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <LandingSectionCtaButtonAlt to="/enterprise">
        Check out Enterprise Edition
      </LandingSectionCtaButtonAlt>
    </div>
  );
};
