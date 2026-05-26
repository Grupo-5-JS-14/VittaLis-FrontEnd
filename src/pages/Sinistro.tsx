import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ShieldAlert, FileText, Upload, CheckCircle2, PhoneCall } from 'lucide-react';
import { toast } from 'sonner';

export default function Sinistro() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [enviado, setEnviado] = useState<boolean>(false);
  
  const [form, setForm] = useState({
    tipo: '',
    data: '',
    descricao: '',
    documento: null as File | null
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, documento: e.target.files[0] });
      toast.success('Documento anexado com sucesso!');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!form.tipo || !form.data || !form.descricao) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);

    // Simulando o envio para o backend
    setTimeout(() => {
      setIsLoading(false);
      setEnviado(true);
      toast.success('Notificação de sinistro enviada com sucesso!');
    }, 2000);
  };

  return (
    <section className="w-full min-h-screen bg-text text-white pt-24 pb-24 font-['Poppins',sans-serif] relative overflow-hidden">
      
      {/* Efeitos de luz de fundo */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7A38]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span className="text-xs font-medium text-red-300">Espaço de Atendimento Urgente</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Aviso de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#FF7A38]">Sinistro</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm font-light">
            Estamos aqui para apoiar você. Preencha os dados abaixo para iniciar o seu processo de cobertura de forma rápida e humanizada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================== */}
          {/* FORMULÁRIO PRINCIPAL / TELA DE SUCESSO     */}
          {/* ========================================== */}
          <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8 backdrop-blur-md">
            
            {!enviado ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Tipo de Ocorrência */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Tipo de Ocorrência *</label>
                  <select
                    name="tipo"
                    value={form.tipo}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-xl bg-slate-900/60 border border-white/10 text-slate-200 text-sm focus:border-[#FF7A38] outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#0B0F19]">Selecione a opção</option>
                    <option value="Invalidez" className="bg-[#0B0F19]">Invalidez Temporária ou Permanente</option>
                    <option value="Doenca" className="bg-[#0B0F19]">Diagnóstico de Doença Grave</option>
                    <option value="Internacao" className="bg-[#0B0F19]">Internação Hospitalar</option>
                    <option value="Outros" className="bg-[#0B0F19]">Outros Casos Previstos em Apólice</option>
                  </select>
                </div>

                {/* Data do Evento */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Data do Acontecimento *</label>
                  <input
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-xl bg-slate-900/60 border border-white/10 text-slate-200 text-sm focus:border-[#FF7A38] outline-none transition-colors"
                  />
                </div>

                {/* Descrição dos Fatos */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Descrição Detalhada *</label>
                  <textarea
                    name="descricao"
                    rows={4}
                    value={form.descricao}
                    onChange={handleInputChange}
                    placeholder="Conte-nos brevemente o que aconteceu para direcionarmos o suporte correto..."
                    className="w-full p-4 rounded-xl bg-slate-900/60 border border-white/10 text-slate-200 text-sm focus:border-[#FF7A38] outline-none transition-colors resize-none placeholder:text-slate-500 font-light"
                  />
                </div>

                {/* Upload de Comprovantes/Laudos */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">Documentação Suporte (Opcional)</label>
                  <div className="relative border border-dashed border-white/20 hover:border-[#FF7A38]/50 rounded-xl p-6 text-center bg-slate-900/30 transition-colors group cursor-pointer">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#FF7A38] transition-colors" />
                      <span className="text-xs font-medium text-slate-300">
                        {form.documento ? form.documento.name : 'Anexar laudos, exames ou relatórios'}
                      </span>
                      <span className="text-[10px] text-slate-500">PDF, JPG ou PNG de até 10MB</span>
                    </div>
                  </div>
                </div>

                {/* Botão de Envio */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 flex items-center justify-center font-bold text-sm rounded-xl text-white bg-gradient-to-r from-red-500 to-[#FF7A38] hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? 'Enviando Relatório...' : 'Enviar Notificação de Sinistro'}
                </button>

              </form>
            ) : (
              /* Estado de Sucesso */
              <div className="py-8 text-center space-y-5 animate-scaleUp">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Recebemos o seu aviso</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Sua solicitação foi registrada com prioridade absoluta. Um de nossos analistas entrará em contato nas próximas horas através do seu telefone ou e-mail cadastrado.
                  </p>
                </div>
                <button
                  onClick={() => setEnviado(false)}
                  className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                >
                  Voltar ao formulário
                </button>
              </div>
            )}

          </div>

          {/* ========================================== */}
          {/* LADO DIREITO: INFORMAÇÕES ÚTEIS / CONTATO  */}
          {/* ========================================== */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Bloco de Atendimento Telefônico */}
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[24px] p-5 space-y-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FF7A38]/10 rounded-lg">
                  <PhoneCall className="w-4 h-4 text-[#FF7A38]" />
                </div>
                <h4 className="text-sm font-semibold text-slate-200">Canais de Emergência</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Se preferir um atendimento imediato por voz ou guias de primeiros passos, ligue gratuitamente para a nossa central:
              </p>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#FF7A38]">0800 700 4040</p>
                <p className="text-[10px] text-slate-500">Disponível 24 horas por dia, 7 dias por semana.</p>
              </div>
            </div>

            {/* Bloco de Instruções */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[24px] p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-300 font-medium text-xs">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Próximas etapas:</span>
              </div>
              <ul className="space-y-2.5 text-[11px] text-slate-400 font-light list-decimal pl-4">
                <li>Análise técnica preliminar das informações enviadas.</li>
                <li>Validação da documentação com base nas coberturas contratadas.</li>
                <li>Retorno consultivo em até 1 dia útil para conclusão do processo.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}