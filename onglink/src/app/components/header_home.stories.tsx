import type { Meta, StoryObj } from '@storybook/react';
import "@/app/CSS/header_alt.css";
import Header_Home from './header_home';

const meta: Meta<typeof Header_Home> = {
  title: 'Layout/Header Home',
  component: Header_Home,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header_Home>;

export const Default: Story = {};