import clsx from "clsx";
import React, { type FC } from "react";

type Props = {
  className?: string;
};

const sowonFlowFeatures = [
  {
    icon: "📝",
    title: "인간 친화적 YAML",
    description: "비즈니스 팀도 쉽게 읽고 수정할 수 있는 직관적인 워크플로우 정의",
    detail: "복잡한 코딩 없이 YAML로 AI 에이전트의 동작을 명확하게 정의하세요.",
    example: `version: "agentflow/v1"
kind: "WorkflowSpec"
metadata:
  name: "고객지원 봇"`
  },
  {
    icon: "🔗",
    title: "MCP 기반 시스템 연동",
    description: "Model Context Protocol로 기존 업무 도구와 완벽 연결",
    detail: "Gmail, Slack, 데이터베이스 등 기존 시스템을 코드 수정 없이 연동하세요.",
    example: `mcp: ["gmail", "slack", "database"]
# 기존 시스템과 즉시 연결`
  },
  {
    icon: "🤖",
    title: "멀티 AI 모델 오케스트레이션",
    description: "GPT-4, Claude, Gemini를 동시에 활용하는 지능형 워크플로우",
    detail: "각 AI 모델의 강점을 조합하여 최적의 결과를 얻으세요.",
    example: `supervisor_mode: "parallel"
agents: ["gpt_agent", "claude_agent"]`
  },
  {
    icon: "📚",
    title: "문서 기반 지식 주입",
    description: "회사 문서를 AI에게 학습시켜 도메인 전문가로 변신",
    detail: "매뉴얼, 정책, 가이드라인을 AI가 자동으로 참조하여 전문적인 답변을 제공합니다.",
    example: `<document name="회사 정책">
{{{documents.policy.content}}}
</document>`
  }
];

export const LandingSowonFlowFeatures: FC<Props> = ({ className }) => {
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
            "mb-4",
          )}
        >
          왜 SowonFlow일까요? 🤔
        </h2>
        <p className={clsx("text-gray-600 dark:text-gray-400 mb-8")}>
          단순한 AI 툴이 아닙니다. 비즈니스 로직에 집중하고 복잡한 AI 구현은 SowonFlow가 담당합니다.
        </p>
        
        <div className={clsx("grid grid-cols-1 landing-md:grid-cols-2 gap-6")}>
          {sowonFlowFeatures.map((feature, index) => (
            <div 
              key={index}
              className={clsx(
                "bg-gray-50 dark:bg-gray-800 rounded-xl p-6",
                "border border-gray-200 dark:border-gray-700",
                "hover:shadow-lg transition-shadow duration-300"
              )}
            >
              <div className={clsx("flex items-start gap-4 mb-4")}>
                <div className={clsx("text-3xl")}>{feature.icon}</div>
                <div className={clsx("flex-1")}>
                  <h3 className={clsx("text-lg font-bold text-gray-900 dark:text-gray-100 mb-2")}>
                    {feature.title}
                  </h3>
                  <p className={clsx("text-gray-600 dark:text-gray-400 text-sm mb-3")}>
                    {feature.description}
                  </p>
                  <p className={clsx("text-gray-700 dark:text-gray-300 text-sm")}>
                    {feature.detail}
                  </p>
                </div>
              </div>
              
              {/* 코드 예시 */}
              <div className={clsx("bg-gray-900 rounded-lg p-3 font-mono text-xs")}>
                <pre className={clsx("text-green-400 overflow-x-auto")}>
                  {feature.example}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 메시지 */}
        <div className={clsx("mt-8 text-center")}>
          <div className={clsx("bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6")}>
            <h3 className={clsx("text-xl font-bold text-gray-900 dark:text-gray-100 mb-2")}>
              🎯 핵심은 이것입니다
            </h3>
            <p className={clsx("text-gray-700 dark:text-gray-300")}>
              <span className={clsx("font-semibold text-refine-indigo")}>
                "기술적 장벽 없이 AI 슈퍼파워를 획득하세요"
              </span>
              <br />
              SowonFlow = 비즈니스 로직 설계 + AI 자동화 + 기존 시스템 연동
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
