import type { Meta, StoryObj } from "@storybook/react";
import { Frame1000004790 } from ".";

const meta: Meta<typeof Frame1000004790> = {
  title: "Components/Frame1000004790",
  component: Frame1000004790,

  argTypes: {
    property1: {
      options: ["variant-4", "variant-2", "variant-3", "default"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Frame1000004790>;

export const Default: Story = {
  args: {
    property1: "variant-4",
    className: {},
    ellipse: "/img/ellipse-80-1.svg",
    img: "/img/ellipse-80.svg",
  },
};
