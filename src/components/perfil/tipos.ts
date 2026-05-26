import type { ComponentType } from "react";

export type PerfilIcon = ComponentType<{
  size?: number;
  stroke?: number;
  className?: string;
}>;

export interface ItemCardResumo {
  label: string;
  value: string;
  note: string;
  icon: PerfilIcon;
  tone: string;
  wide?: boolean;
}

export interface ApolicePerfil {
  id: string;
  type: string;
  hiredAt: string;
  dueAt: string;
  dueNote: string;
  coverage: string;
  status: boolean;
  expanded?: boolean;
  overdue?: boolean;
}
