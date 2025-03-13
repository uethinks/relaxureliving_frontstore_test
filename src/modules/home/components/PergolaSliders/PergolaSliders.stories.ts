import type { Meta, StoryObj } from "@storybook/react";
import { PergolaSliders } from ".";

const meta: Meta<typeof PergolaSliders> = {
  title: "Components/PergolaSliders",
  component: PergolaSliders,

  argTypes: {
    property1: {
      options: ["variant-2", "default"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PergolaSliders>;

export const Default: Story = {
  args: {
    property1: "variant-2",
    className: {},
    rectangle: "/img/rectangle-1271-3.svg",
    propertyDefaultWrapperRectangle: "/img/rectangle-1273.svg",
    rectangleClassName: {},
    img: "/img/rectangle-1271.svg",
    rectangleClassNameOverride: {},
    rectangle1: "/img/rectangle-1273-3.svg",
  },
};
