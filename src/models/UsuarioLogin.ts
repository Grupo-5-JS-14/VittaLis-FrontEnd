export default interface UsuarioLogin {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string;
  token: string;

  acesso?: string;
  role?: string;
  tipo?: string;
  admin?: boolean;
  message?: string;
}