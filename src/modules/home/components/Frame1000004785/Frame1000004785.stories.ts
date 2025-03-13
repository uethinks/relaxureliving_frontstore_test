import type { Meta, StoryObj } from "@storybook/react";
import { Frame1000004785 } from ".";

const meta: Meta<typeof Frame1000004785> = {
  title: "Components/Frame1000004785",
  component: Frame1000004785,

  argTypes: {
    property1: {
      options: ["variant-2", "default"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Frame1000004785>;

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
