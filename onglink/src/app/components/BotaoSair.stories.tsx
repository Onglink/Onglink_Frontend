import type { Meta, StoryObj } from '@storybook/react';
import "@/app/CSS/header_alt.css"
import BotaoSair from './BotaoSair';

const meta: Meta<typeof BotaoSair> = {
  title: 'Layout/Botão Sair',
  component: BotaoSair,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BotaoSair>;

export const Default: Story = {};