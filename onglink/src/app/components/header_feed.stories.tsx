import type { Meta, StoryObj } from '@storybook/react';
import "@/app/CSS/header_alt.css";
import Header_Feed from './header_feed';

const meta: Meta<typeof Header_Feed> = {
  title: 'Layout/Header Feed',
  component: Header_Feed,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header_Feed>;

export const Default: Story = {};