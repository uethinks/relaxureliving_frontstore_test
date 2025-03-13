import type { Meta, StoryObj } from "@storybook/react";
import { Frame1000004787 } from ".";

const meta: Meta<typeof Frame1000004787> = {
  title: "Components/Frame1000004787",
  component: Frame1000004787,

  argTypes: {
    property1: {
      options: ["default"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Frame1000004787>;

export const Default: Story = {
  args: {
    property1: "default",
    className: {},
    frameClassName: {},
  },
};
