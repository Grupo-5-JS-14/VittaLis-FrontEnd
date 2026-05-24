import React from 'react';

export interface Mensagem {
  id: number;
  autor: 'bot' | 'usuario';
  texto: string | React.ReactNode;
}

export interface DadosSimulacao {
  nome: string;
  idade: number;
  perfil: string;
}