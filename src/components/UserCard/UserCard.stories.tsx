import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";

const meta: Meta<typeof UserCard> = {
  title: "Components/UserCard",
  component: UserCard,
  args: {
    name: "Leanne Graham",
    role: "Senior Developer",
    status: "active",
    avatarUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=Leanne",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof UserCard>;

export const Full: Story = {
  args: {
    variant: "full",
  },
};

export const Compact: Story = {
  args: {
    variant: "compact",
  },
};

export const PendingStatus: Story = {
  args: {
    status: "pending",
    role: "Product Manager",
  },
};

export const InactiveWithLongName: Story = {
  args: {
    status: "inactive",
    name: "Very Long Name That Wraps Nicely In The Card",
  },
};
