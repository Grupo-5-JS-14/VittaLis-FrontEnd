import { useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BadgeCheck,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  HandCoins,
  Headphones,
  ShieldCheck,
  Users,
} from "lucide-react";

import type Plano from "../../models/Plano";
import { buscar } from "../../services/Service";
import { AuthContext } from "../../contexts/AuthContext";
import CardPlano from "./CardPlano";
import ModalPlano from "./ModalPlano";

function ListaPlanos() {
  const planosPadrao: Plano[] = [
    {
      id: 1,
      nome: "Individual",
      descricao: "Proteção financeira para você e para quem você ama.",
      valor: 34.9,
    },
    {
      id: 2,
      nome: "Familiar",
      descricao: "Proteção completa para toda sua família.",
      valor: 79.9,
    },
    {
      id: 3,
      nome: "Essencial",
      descricao: "Mais segurança no dia a dia para imprevistos.",
      valor: 24.9,
    },
    {
      id: 4,
      nome: "Empresarial",
      descricao: "Cuidado e segurança para seus colaboradores e sua empresa.",
      valor: 40,
    },
  ];

  const [planos, setPlanos] = useState<Plano[]>(planosPadrao);
  const [isLoading, setIsLoading] = useState(false);
  const [tipoCobranca, setTipoCobranca] = useState<"mensal" | "anual">(
    "mensal"
  );

  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  useEffect(() => {
    function atualizarLargura() {
      setLarguraTela(window.innerWidth);
    }

    window.addEventListener("resize", atualizarLargura);

    return () => window.removeEventListener("resize", atualizarLargura);
  }, []);

  const isMobile = larguraTela < 640;
  const isTablet = larguraTela >= 640 && larguraTela < 1024;

  const auth = useContext(AuthContext) as any;
  const usuario = auth?.usuario;

  const token = usuario?.token || usuario?.acesso || "";

  const isAdmin =
    usuario?.role === "admin" ||
    usuario?.role === "ADMIN" ||
    usuario?.role === "ROLE_ADMIN" ||
    usuario?.tipo === "admin" ||
    usuario?.tipo === "ADMIN" ||
    usuario?.admin === true;

  const tokenFormatado = token
    ? token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`
    : "";

  const header = useMemo(() => {
    return {
      headers: {
        Authorization: tokenFormatado,
      },
    };
  }, [tokenFormatado]);

  function normalizarPlanos(resposta: any): Plano[] {
    if (Array.isArray(resposta)) {
      return resposta;
    }

    if (Array.isArray(resposta?.content)) {
      return resposta.content;
    }

    if (Array.isArray(resposta?.data)) {
      return resposta.data;
    }

    if (Array.isArray(resposta?.planos)) {
      return resposta.planos;
    }

    console.error("Resposta de planos não veio como lista:", resposta);
    return [];
  }

  async function buscarPlanos() {
    try {
      setIsLoading(true);

      await buscar(
        "/planos/all",
        (resposta: any) => {
          const listaPlanos = normalizarPlanos(resposta);

          if (listaPlanos.length > 0) {
            setPlanos(listaPlanos);
          } else {
            setPlanos(planosPadrao);
          }
        },
        tokenFormatado ? header : {}
      );
    } catch (error) {
      console.error("Erro ao buscar planos:", error);
      setPlanos(planosPadrao);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarPlanos();
  }, [token]);

  const planosParaExibir = Array.isArray(planos) ? planos : planosPadrao;

  const colunasResponsivas = isMobile
    ? "1fr"
    : isTablet
    ? "repeat(2, 1fr)"
    : "repeat(4, 1fr)";

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #ffffff 0%, #f8fbfa 42%, #f5f8f7 100%)",
        color: "#004346",
        padding: isMobile ? "26px 16px 34px" : "34px 24px 44px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "1120px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: isMobile ? "32px" : "42px",
              lineHeight: isMobile ? "38px" : "48px",
              fontWeight: 900,
              color: "#004346",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Nossos planos
          </h1>

          <p
            style={{
              marginTop: "6px",
              color: "#5f6d70",
              fontSize: isMobile ? "14px" : "15px",
            }}
          >
            Escolha a proteção ideal para você e sua família.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: colunasResponsivas,
            gap: isMobile ? "22px" : "34px",
            marginTop: "34px",
            alignItems: "start",
          }}
        >
          <InfoItem
            icon={<ShieldCheck size={24} />}
            title="Contratação 100% digital"
            text="Rápida, simples e segura."
          />

          <InfoItem
            icon={<Users size={24} />}
            title="Coberturas completas"
            text="Proteção para todas as fases da vida."
          />

          <InfoItem
            icon={<Clock size={24} />}
            title="Assistência 24h"
            text="Suporte quando você mais precisa."
          />

          <InfoItem
            icon={<FileText size={24} />}
            title="Sem burocracia"
            text="Processo fácil e transparente do início ao fim."
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "34px",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              width: isMobile ? "100%" : "300px",
              maxWidth: "300px",
              background: "#ffffff",
              border: "1px solid #dbe6e4",
              borderRadius: "999px",
              padding: "4px",
              boxShadow: "0 8px 20px rgba(0, 67, 70, 0.10)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "4px",
                bottom: "4px",
                left: tipoCobranca === "mensal" ? "4px" : "50%",
                width: "calc(50% - 4px)",
                borderRadius: "999px",
                background:
                  "linear-gradient(135deg, #006b6b 0%, #004346 100%)",
                boxShadow: "0 6px 14px rgba(0, 67, 70, 0.22)",
                transition:
                  "left 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.25s ease",
              }}
            />

            <button
              type="button"
              onClick={() => setTipoCobranca("mensal")}
              style={{
                position: "relative",
                zIndex: 1,
                width: "50%",
                border: "none",
                background: "transparent",
                color: tipoCobranca === "mensal" ? "#ffffff" : "#00565a",
                borderRadius: "999px",
                padding: "9px 0",
                fontWeight: 900,
                cursor: "pointer",
                transition: "color 0.25s ease, transform 0.2s ease",
                transform:
                  tipoCobranca === "mensal" ? "scale(1.03)" : "scale(1)",
              }}
            >
              Mensal
            </button>

            <button
              type="button"
              onClick={() => setTipoCobranca("anual")}
              style={{
                position: "relative",
                zIndex: 1,
                width: "50%",
                border: "none",
                background: "transparent",
                color: tipoCobranca === "anual" ? "#ffffff" : "#00565a",
                borderRadius: "999px",
                padding: "9px 0",
                fontWeight: 900,
                cursor: "pointer",
                transition: "color 0.25s ease, transform 0.2s ease",
                transform:
                  tipoCobranca === "anual" ? "scale(1.03)" : "scale(1)",
              }}
            >
              Anual{" "}
              <span
                style={{
                  color: tipoCobranca === "anual" ? "#b9ffe0" : "#00a66a",
                  transition: "color 0.25s ease",
                }}
              >
                10% OFF
              </span>
            </button>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "8px",
            color: "#5f6d70",
            fontSize: "13px",
            minHeight: "18px",
            transition: "opacity 0.25s ease",
          }}
        >
          {tipoCobranca === "mensal"
            ? "Pague mensalmente e mantenha sua proteção ativa."
            : "Economize contratando no plano anual."}
        </p>

        {isAdmin && (
          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-end",
              marginTop: "28px",
            }}
          >
            <ModalPlano
              tipo="cadastrar"
              buscarPlanos={buscarPlanos}
              token={token}
            />
          </div>
        )}

        {isLoading && planosParaExibir.length === 0 && (
          <p
            style={{
              textAlign: "center",
              marginTop: "40px",
              color: "#5f6d70",
            }}
          >
            Carregando planos...
          </p>
        )}

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: colunasResponsivas,
            gap: isMobile ? "18px" : "10px",
            marginTop: "30px",
            alignItems: "stretch",
            opacity: isLoading ? 0.7 : 1,
            transition: "opacity 0.25s ease",
          }}
        >
          {planosParaExibir.map((plano) => (
            <CardPlano
              key={plano.id}
              plano={plano}
              buscarPlanos={buscarPlanos}
              isAdmin={isAdmin}
              token={token}
              tipoCobranca={tipoCobranca}
            />
          ))}
        </div>

        {isLoading && planosParaExibir.length > 0 && (
          <p
            style={{
              textAlign: "center",
              marginTop: "12px",
              color: "#5f6d70",
              fontSize: "13px",
            }}
          >
            Atualizando planos...
          </p>
        )}

        <div
          style={{
            width: isMobile ? "100%" : "82%",
            maxWidth: "900px",
            margin: "18px auto 0",
            background: "linear-gradient(90deg, #eaf7f4, #f8fcfb)",
            borderRadius: "13px",
            padding: isMobile ? "16px" : "11px 18px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
            justifyContent: "space-between",
            gap: "16px",
            boxShadow: "0 6px 18px rgba(0, 67, 70, 0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#ffffff",
                color: "#006b6b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Headphones size={25} />
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: 900,
                  color: "#004346",
                }}
              >
                Precisa de ajuda para escolher?
              </h3>

              <p
                style={{
                  marginTop: "2px",
                  color: "#5f6d70",
                  fontSize: "11.5px",
                }}
              >
                Nossa equipe te ajuda a encontrar o plano ideal.
              </p>
            </div>
          </div>

          <button
            type="button"
            style={{
              width: isMobile ? "100%" : "auto",
              border: "none",
              background: "#00565a",
              color: "#ffffff",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "11.5px",
              fontWeight: 900,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 5px 12px rgba(0, 67, 70, 0.16)",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.background = "#004346";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "#00565a";
            }}
          >
            Falar com especialista
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: colunasResponsivas,
            gap: isMobile ? "22px" : "32px",
            marginTop: "24px",
          }}
        >
          <InfoItem
            small
            icon={<BadgeCheck size={22} />}
            title="Processo 100% digital"
            text="Contrate online em poucos minutos."
          />

          <InfoItem
            small
            icon={<CreditCard size={22} />}
            title="Pagamento seguro"
            text="Ambiente criptografado."
          />

          <InfoItem
            small
            icon={<CheckCircle size={22} />}
            title="Cancelamento fácil"
            text="Sem complicações."
          />

          <InfoItem
            small
            icon={<HandCoins size={22} />}
            title="Reembolso garantido"
            text="Conforme condições do plano."
          />
        </div>
      </section>
    </main>
  );
}

interface InfoItemProps {
  icon: ReactNode;
  title: string;
  text: string;
  small?: boolean;
}

function InfoItem({ icon, title, text, small = false }: InfoItemProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
      <div
        style={{
          width: small ? "42px" : "48px",
          height: small ? "42px" : "48px",
          minWidth: small ? "42px" : "48px",
          borderRadius: "50%",
          background: "#dff3ef",
          color: "#006b6b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      <div>
        <h3
          style={{
            margin: 0,
            color: "#004346",
            fontSize: "14px",
            fontWeight: 900,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            marginTop: "5px",
            color: "#5f6d70",
            fontSize: "13px",
            lineHeight: "18px",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default ListaPlanos;