import type { Meta, StoryObj } from "@storybook/react";
import { StyleSecondary } from ".";

const meta: Meta<typeof StyleSecondary> = {
  title: "Components/StyleSecondary",
  component: StyleSecondary,
};

export default meta;

type Story = StoryObj<typeof StyleSecondary>;

export const Default: Story = {
  args: {
    className: {},
    divClassName: {},
    text: "Button",
  },
};
