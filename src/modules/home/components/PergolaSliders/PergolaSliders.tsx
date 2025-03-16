"use client"

import React, { useEffect, useState } from "react";
import { ArrowForwardIos4 } from "../../icons/ArrowForwardIos4";
import { StyleOutlined } from "../../icons/StyleOutlined";
import { PropertyDefaultWrapper } from "../PropertyDefaultWrapper";
import { UsageScenario } from "types/global";
const cmsBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;
interface Props {
  usageScenarios: UsageScenario[] | [];
  selectedScenario: UsageScenario | null;
}

export const PergolaSliders = ({
  usageScenarios,
  selectedScenario
}: Props): JSX.Element => {
  const [scenario, setScenario] = useState<UsageScenario | null>(selectedScenario);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const previousScenario = () => {
    if (scenarioIndex > 0) {
      setScenarioIndex(scenarioIndex - 1);
    }else{
      setScenarioIndex(usageScenarios.length - 1);
    }
  };
  const nextScenario = () => {
    if (scenarioIndex < usageScenarios.length - 1) {  
      setScenarioIndex(scenarioIndex + 1);
    }else{
      setScenarioIndex(0);
    }
  };
  useEffect(() => {
    if (usageScenarios.length > 0) {
      setScenario(usageScenarios[scenarioIndex]);
    }
  }, [scenarioIndex, usageScenarios]);
  useEffect(() => {
    if (selectedScenario) {
      setScenario(selectedScenario);
    }
  }, [selectedScenario]);
  return (
    <div className="relative w-1/2 h-[740px] overflow-hidden !mt-[-13.00px] !mb-[-13.00px]" >
      {scenario && (  
          <div className=" w-full h-[740px]">
            <div className="relative w-[600px] h-[708px] left-[60px]">
                  <img
                    className="top-0 left-0 absolute w-[600px] h-[600px] object-cover rounded-[20px]"
                    alt="Rectangle"
                    src={cmsBaseUrl + scenario.LargeImage.url}
                  />

                <PropertyDefaultWrapper
                  image={scenario.SmallImage.url}
                />
                <div className="left-[38px] flex w-[524px] items-center justify-between absolute top-[264px]">
                  <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
                    <ArrowForwardIos4 onClick={previousScenario} className="!relative !w-6 !h-6" />
                  </div>

                  <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
                    <StyleOutlined
                      onClick={nextScenario}
                      className="!relative !w-6 !h-6"
                      color="white"
                      opacity="0.8"
                    />
                  </div>
                </div>
              </div>
          </div>
      )}
    </div>
  );
};
