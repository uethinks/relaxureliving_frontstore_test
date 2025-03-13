import type { Meta, StoryObj } from "@storybook/react";
import { ArrowForwardIos } from ".";

const meta: Meta<typeof ArrowForwardIos> = {
  title: "Components/ArrowForwardIos",
  component: ArrowForwardIos,

  argTypes: {
    style: {
      options: ["outlined"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ArrowForwardIos>;

export const Default: Story = {
  args: {
    style: "outlined",
  },
};
