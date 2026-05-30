import type { Meta, StoryObj } from '@storybook/react';
import "@/app/CSS/home.css"
import BotaoVisitante from './BotaoVisitante';

const meta: Meta<typeof BotaoVisitante> = {
  title: 'Layout/Botão Visitante',
  component: BotaoVisitante,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BotaoVisitante>;

export const Default: Story = {};