import clsx from "clsx";
import React, { type FC, useState } from "react";

type Props = {
  className?: string;
};

const demoScenarios = [
  {
    id: "sales-analysis",
    title: "🚀 매출분석 AI",
    emoji: "📊",
    scenario: "매출분석해줘",
    description: "월별 매출 데이터를 분석하고 트렌드를 시각화",
    time: "응답시간: 3초",
    result: "전월 대비 15% 증가, Q4 목표 달성률 92%",
  },
  {
    id: "schedule-management", 
    title: "📅 일정관리 AI",
    emoji: "⏰",
    scenario: "내일 회의실 예약해줘",
    description: "팀 캘린더 확인 후 최적 시간대 제안",
    time: "응답시간: 2초",
    result: "오후 2시 대회의실 예약 완료, 참석자 알림 발송",
  },
  {
    id: "email-processing",
    title: "📧 메일처리 AI", 
    emoji: "✉️",
    scenario: "긴급 메일만 골라서 요약해줘",
    description: "받은편지함 스캔 후 우선순위별 분류",
    time: "응답시간: 5초",
    result: "긴급 메일 3건 발견, 핵심 내용 요약 첨부",
  },
];

export const LandingSlackDemoScenarios: FC<Props> = ({ className }) => {
  const [activeScenario, setActiveScenario] = useState(0);

  return (
    <div className={clsx(className, "w-full")}>
      <div className={clsx("not-prose", "w-full", "px-4 landing-md:px-10")}>
        <h2
          className={clsx(
            "text-2xl landing-sm:text-[32px]",
            "tracking-tight",
            "text-start",
            "p-0",
            "dark:text-gray-0 text-gray-900",
            "mb-8",
          )}
        >
          슬랙에서 이런 식으로 AI를 사용하고 있어요 👀
        </h2>
        
        <div className={clsx("bg-gray-50 dark:bg-gray-800 rounded-2xl p-6")}>
          {/* 시나리오 탭 */}
          <div className={clsx("flex gap-4 mb-6")}>
            {demoScenarios.map((scenario, index) => (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(index)}
                className={clsx(
                  "px-4 py-2 rounded-lg transition-all",
                  activeScenario === index
                    ? "bg-refine-indigo text-white"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                )}
              >
                {scenario.emoji} {scenario.title}
              </button>
            ))}
          </div>

          {/* 활성 시나리오 표시 */}
          <div className={clsx("bg-white dark:bg-gray-900 rounded-xl p-6")}>
            <div className={clsx("flex items-start gap-4")}>
              {/* 슬랙 UI 모방 */}
              <div className={clsx("w-8 h-8 rounded bg-gray-300 dark:bg-gray-600 flex items-center justify-center")}>
                👤
              </div>
              <div className={clsx("flex-1")}>
                <div className={clsx("text-sm text-gray-600 dark:text-gray-400 mb-1")}>
                  김대리 • 오후 2:30
                </div>
                <div className={clsx("text-gray-900 dark:text-gray-100 mb-3")}>
                  @SowonAI {demoScenarios[activeScenario].scenario}
                </div>
              </div>
            </div>

            {/* AI 응답 */}
            <div className={clsx("flex items-start gap-4 mt-4 ml-8")}>
              <div className={clsx("w-8 h-8 rounded bg-refine-indigo flex items-center justify-center text-white text-sm")}>
                AI
              </div>
              <div className={clsx("flex-1")}>
                <div className={clsx("text-sm text-gray-600 dark:text-gray-400 mb-1")}>
                  SowonAI • 오후 2:30 • {demoScenarios[activeScenario].time}
                </div>
                <div className={clsx("text-gray-900 dark:text-gray-100 mb-2")}>
                  {demoScenarios[activeScenario].description}
                </div>
                <div className={clsx("bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3")}>
                  <div className={clsx("text-green-800 dark:text-green-300 font-medium")}>
                    ✅ {demoScenarios[activeScenario].result}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 설명 */}
          <div className={clsx("mt-6 text-center")}>
            <p className={clsx("text-gray-600 dark:text-gray-400")}>
              💡 이런 시나리오들이 실제로 우리 슬랙에서 돌아가고 있다면?<br/>
              <span className={clsx("font-semibold text-refine-indigo")}>
                "어? 우리도 할 수 있는 거야?"
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
