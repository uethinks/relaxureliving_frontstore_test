import type { Meta, StoryObj } from "@storybook/react";
import { Frame1000004776 } from ".";

const meta: Meta<typeof Frame1000004776> = {
  title: "Components/Frame1000004776",
  component: Frame1000004776,

  argTypes: {
    property1: {
      options: ["variant-2", "default"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Frame1000004776>;

export const Default: Story = {
  args: {
    property1: "variant-2",
    className: {},
    overlapClassName: {},
    overlapClassNameOverride: {},
    frameClassName: {},
    overlapGroupClassName: {},
    rectangleClassName: {},
    rectangle: "/img/image.svg",
  },
};
