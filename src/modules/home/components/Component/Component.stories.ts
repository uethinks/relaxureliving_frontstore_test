import type { Meta, StoryObj } from "@storybook/react";
import { Component } from ".";

const meta: Meta<typeof Component> = {
  title: "Components/Component",
  component: Component,

  argTypes: {
    property1: {
      options: ["primary-button-hover-l", "primary-button-l"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    property1: "primary-button-hover-l",
    className: {},
    buttonClassName: {},
    text: "Get started",
  },
};
