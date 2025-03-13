import React from "react";
import { Container } from "./sections/Container";
import { ContainerWrapper } from "./sections/ContainerWrapper";
import { Div } from "./sections/Div";
import { DivWrapper } from "./sections/DivWrapper";
import { FaqWrapper } from "./sections/FaqWrapper";
import { Frame } from "./sections/Frame";
import { FrameWrapper } from "./sections/FrameWrapper";
import { Hero } from "./sections/Hero";
import { NavBarWrapper } from "./sections/NavBarWrapper";
import { SectionComponentNode } from "./sections/SectionComponentNode";

export const homepage = (): JSX.Element => {
  return (
    <div className="flex flex-col h-[9399px] items-center gap-[120px] px-20 py-0 relative bg-[#ffffff]">
      <div className="absolute w-[1376px] h-[512px] top-[1844px] left-[68px] rounded-3xl" />

      <Hero />
      <Container />
      <Frame />
      <ContainerWrapper />
      <FrameWrapper />
      <DivWrapper />
      <Div />
      <FaqWrapper />
      <SectionComponentNode />
      <img
        className="relative w-[1512px] h-[688px] ml-[-80.00px] mr-[-80.00px]"
        alt="Footer dark"
        src="/img/footer-4-dark.png"
      />

      <NavBarWrapper />
    </div>
  );
};
