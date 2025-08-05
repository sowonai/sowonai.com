import clsx from "clsx";
import React, { type FC, useState, useEffect } from "react";

type Props = {
  className?: string;
};

const buildingSteps = [
  {
    step: 1,
    title: "YAML로 AI 에이전트 정의",
    description: "비즈니스 팀도 쉽게 이해할 수 있는 인간 친화적 YAML 설정",
    code: `# SowonFlow YAML 워크플로우
version: "agentflow/v1"
kind: "WorkflowSpec"
metadata:
  name: "매출분석 에이전트"
  description: "AI 기반 매출 데이터 분석 및 리포트 생성"

agents:
  - id: "sales_analyzer"
    inline:
      type: "agent"
      model: "openai/gpt-4-turbo"
      system_prompt: |
        당신은 매출분석 전문가입니다.
        데이터를 분석하고 명확한 인사이트를 제공하세요.
      tools: ["calculator", "current_time"]`,
    time: "2분",
    feature: "🎯 직관적인 YAML 설정으로 누구나 AI 에이전트 정의 가능"
  },
  {
    step: 2,
    title: "멀티 AI 모델 & MCP 연동",
    description: "GPT-4, Claude, Gemini 등 다양한 AI 모델과 외부 시스템 연결",
    code: `# 다양한 AI 모델 지원
agents:
  - id: "supervisor"
    inline:
      type: "supervisor"
      model: "anthropic/claude-sonnet-4"
      supervisor_mode: "parallel"
      agents: ["gpt_agent", "gemini_agent"]
      
  - id: "email_agent"
    inline:
      model: "google/gemini-2.5-flash"
      mcp: ["gmail", "slack", "database"]
      # MCP로 Gmail, Slack, DB 연동`,
    time: "1분",
    feature: "🔗 MCP(Model Context Protocol)로 기존 시스템과 완벽 연동"
  },
  {
    step: 3,
    title: "문서 기반 지식 주입",
    description: "회사 문서, 매뉴얼, 정책을 AI에게 학습시켜 도메인 전문성 확보",
    code: `# 문서 시스템으로 AI 전문성 강화
agents:
  - id: "legal_expert"
    system_prompt: |
      회사 정책을 기반으로 법적 검토를 수행하세요.
      
      <document name="회사 규정">
        {{{documents.company_policy.content}}}
      </document>
      
      <document name="계약서 템플릿">  
        {{{documents.contract_template.content}}}
      </document>`,
    time: "30초",
    feature: "📚 문서 시스템으로 회사 지식을 AI에게 직접 주입"
  },
  {
    step: 4,
    title: "슬랙/실제 환경 배포",
    description: "원클릭으로 슬랙 워크스페이스나 실제 업무 환경에 즉시 배포",
    code: `# 실제 환경 배포 설정
deployment:
  platform: "slack"
  workspace: "your-company"
  channels: ["#sales", "#analytics"]
  
mcpServers:
  gmail:
    command: "npx"
    args: ["-y", "@sowonai/mcp-gmail"]
    env:
      GOOGLE_CLIENT_ID: "your_client_id"
      
# 바로 사용 가능!
# @SowonAI 매출분석해줘`,
    time: "1분",
    feature: "🚀 실제 업무 환경에 바로 배포하여 즉시 사용 가능"
  },
];

export const LandingYamlWorkflowBuilder: FC<Props> = ({ className }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    if (isBuilding) {
      const timer = setTimeout(() => {
        if (currentStep < buildingSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsBuilding(false);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isBuilding]);

  const startBuilding = () => {
    setCurrentStep(0);
    setIsBuilding(true);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsBuilding(false);
  };

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
          아, 이렇게 간단하게 되는구나! 🛠️
          <br />
          <span className={clsx("text-lg landing-sm:text-xl text-gray-600 dark:text-gray-400 font-normal")}>
            SowonFlow: 비즈니스 팀도 쉽게 만드는 AI 워크플로우
          </span>
        </h2>
        
        <div className={clsx("bg-gray-50 dark:bg-gray-800 rounded-2xl p-6")}>
          {/* 진행 상태 표시 */}
          <div className={clsx("flex items-center justify-between mb-8")}>
            {buildingSteps.map((step, index) => (
              <div key={step.step} className={clsx("flex items-center")}>
                <div
                  className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                    index <= currentStep
                      ? "bg-refine-indigo text-white"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                  )}
                >
                  {isBuilding && index === currentStep ? "⚡" : step.step}
                </div>
                {index < buildingSteps.length - 1 && (
                  <div
                    className={clsx(
                      "w-16 h-1 mx-2",
                      index < currentStep
                        ? "bg-refine-indigo"
                        : "bg-gray-300 dark:bg-gray-600"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* 현재 단계 상세 */}
          <div className={clsx("bg-white dark:bg-gray-900 rounded-xl p-6")}>
            <div className={clsx("flex justify-between items-start mb-4")}>
              <div>
                <h3 className={clsx("text-xl font-bold text-gray-900 dark:text-gray-100")}>
                  Step {buildingSteps[currentStep].step}: {buildingSteps[currentStep].title}
                </h3>
                <p className={clsx("text-gray-600 dark:text-gray-400 mt-1")}>
                  {buildingSteps[currentStep].description}
                </p>
                {/* SowonFlow 특징 */}
                <div className={clsx("mt-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2")}>
                  <div className={clsx("text-blue-800 dark:text-blue-300 text-sm font-medium")}>
                    {buildingSteps[currentStep].feature}
                  </div>
                </div>
              </div>
              <div className={clsx("bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full text-green-800 dark:text-green-300 text-sm font-medium")}>
                소요시간: {buildingSteps[currentStep].time}
              </div>
            </div>

            {/* 코드 에디터 모방 */}
            <div className={clsx("bg-gray-900 rounded-lg p-4 font-mono text-sm")}>
              <div className={clsx("flex items-center gap-2 mb-3")}>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className={clsx("text-gray-400 ml-4")}>sowonflow-workflow.yaml</span>
              </div>
              <pre className={clsx("text-green-400")}>
                {buildingSteps[currentStep].code}
              </pre>
            </div>

            {/* SowonFlow 어시스턴트 도움말 */}
            <div className={clsx("mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3")}>
              <div className={clsx("flex items-start gap-2")}>
                <span className="text-blue-600 dark:text-blue-400">🤖</span>
                <div>
                  <div className={clsx("text-blue-800 dark:text-blue-300 font-medium text-sm")}>
                    SowonFlow 어시스턴트
                  </div>
                  <div className={clsx("text-blue-700 dark:text-blue-400 text-sm mt-1")}>
                    {currentStep === 0 && "YAML이 처음이세요? 걱정 마세요! 비즈니스 팀도 쉽게 작성할 수 있도록 설계되었어요."}
                    {currentStep === 1 && "여러 AI 모델을 동시에 사용하거나, Gmail/Slack 같은 기존 도구와 연결할 수 있어요."}
                    {currentStep === 2 && "회사 문서를 업로드하면 AI가 자동으로 학습해서 전문가가 되어요!"}
                    {currentStep === 3 && "실제 슬랙에서 @SowonAI로 바로 사용할 수 있어요. 개발자 도움 없이도요!"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 컨트롤 버튼 */}
          <div className={clsx("flex justify-center gap-4 mt-6")}>
            {!isBuilding ? (
              <button
                onClick={startBuilding}
                className={clsx(
                  "bg-refine-indigo text-white px-6 py-3 rounded-lg font-medium",
                  "hover:bg-refine-indigo/90 transition-colors"
                )}
              >
                🚀 SowonFlow로 AI 워크플로우 구축해보기
              </button>
            ) : (
              <div className={clsx("flex items-center gap-2 text-refine-indigo")}>
                <div className="animate-spin w-5 h-5 border-2 border-refine-indigo border-t-transparent rounded-full"></div>
                SowonFlow 워크플로우 구축 중... ({currentStep + 1}/{buildingSteps.length})
              </div>
            )}
            
            {(currentStep > 0 || !isBuilding) && (
              <button
                onClick={resetDemo}
                className={clsx(
                  "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300",
                  "px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                )}
              >
                다시 보기
              </button>
            )}
          </div>

          {/* 완료 메시지 */}
          {currentStep === buildingSteps.length - 1 && !isBuilding && (
            <div className={clsx("mt-6 text-center")}>
              <div className={clsx("text-2xl mb-2")}>🎉</div>
              <p className={clsx("text-gray-900 dark:text-gray-100 font-medium")}>
                축하합니다! SowonFlow AI 워크플로우가 성공적으로 배포되었습니다.
              </p>
              <p className={clsx("text-gray-600 dark:text-gray-400 text-sm mt-1")}>
                이제 슬랙에서 @SowonAI를 멘션해서 바로 사용해보세요!<br/>
                🎯 비즈니스 로직에 집중하고, 복잡한 AI 구현은 SowonFlow가 담당합니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
