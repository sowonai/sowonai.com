import clsx from "clsx";
import React, { type FC, useState, useEffect } from "react";

type Props = {
  className?: string;
};

const buildingSteps = [
  {
    step: 1,
    title: "워크플로우 설계",
    description: "간단한 YAML로 AI 에이전트 동작 정의",
    code: `# 매출분석 에이전트
name: sales-analyzer
trigger: mention
tasks:
  - fetch_sales_data
  - analyze_trends
  - generate_report`,
    time: "1분",
  },
  {
    step: 2,
    title: "AI 모델 연결",
    description: "GPT-4, Claude 등 원하는 AI 모델 선택",
    code: `models:
  - gpt-4-turbo
  - claude-3-opus
tools:
  - data_analysis
  - chart_generation`,
    time: "30초",
  },
  {
    step: 3,
    title: "슬랙 배포",
    description: "원클릭으로 슬랙 워크스페이스에 배포",
    code: `deployment:
  platform: slack
  workspace: your-company
  channels: [#sales, #analytics]
  auto_deploy: true`,
    time: "30초",
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
          5분 만에 AI 에이전트 만들기 🛠️
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
                <span className={clsx("text-gray-400 ml-4")}>workflow.yaml</span>
              </div>
              <pre className={clsx("text-green-400")}>
                {buildingSteps[currentStep].code}
              </pre>
            </div>

            {/* AI 어시스턴트 도움말 */}
            <div className={clsx("mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3")}>
              <div className={clsx("flex items-start gap-2")}>
                <span className="text-blue-600 dark:text-blue-400">🤖</span>
                <div>
                  <div className={clsx("text-blue-800 dark:text-blue-300 font-medium text-sm")}>
                    SowonAI 어시스턴트
                  </div>
                  <div className={clsx("text-blue-700 dark:text-blue-400 text-sm mt-1")}>
                    {currentStep === 0 && "YAML 문법이 익숙하지 않으세요? 제가 자동으로 생성해드릴게요!"}
                    {currentStep === 1 && "어떤 AI 모델이 좋을지 모르겠다면, 업무 유형에 맞는 모델을 추천해드려요."}
                    {currentStep === 2 && "배포 설정도 복잡하지 않아요. 클릭 몇 번이면 완료됩니다!"}
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
                🚀 5분 구축 과정 시작하기
              </button>
            ) : (
              <div className={clsx("flex items-center gap-2 text-refine-indigo")}>
                <div className="animate-spin w-5 h-5 border-2 border-refine-indigo border-t-transparent rounded-full"></div>
                구축 중... ({currentStep + 1}/{buildingSteps.length})
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
                축하합니다! AI 에이전트가 성공적으로 배포되었습니다.
              </p>
              <p className={clsx("text-gray-600 dark:text-gray-400 text-sm mt-1")}>
                이제 슬랙에서 @SowonAI를 멘션해서 사용해보세요!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
