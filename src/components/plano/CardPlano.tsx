import { Briefcase, CheckCircle, Heart, ShieldCheck, Users, } from "lucide-react";

import type Plano from "../../models/Plano";
import ModalPlano from "./ModalPlano";

interface CardPlanoProps {
  plano: Plano;
  buscarPlanos: () => void;
  isAdmin: boolean;
  token: string;
  tipoCobranca: "mensal" | "anual";
}

function CardPlano({
  plano,
  buscarPlanos,
  isAdmin,
  token,
  tipoCobranca,
}: CardPlanoProps) {
  const nomePlano = plano.nome?.toLowerCase() || "";
  const planoDestaque = nomePlano.includes("familiar");
  const isEmpresarial = nomePlano.includes("empresa");

  function escolherIcone() {
    if (nomePlano.includes("familiar")) return <Users size={34} />;
    if (nomePlano.includes("acidente")) return <ShieldCheck size={34} />;
    if (nomePlano.includes("empresa")) return <Briefcase size={34} />;
    return <Heart size={34} />;
  }

  function beneficiosDoPlano() {
    if (nomePlano.includes("familiar")) {
      return [
        "Morte por qualquer causa",
        "Invalidez Permanente Total ou Parcial por Acidente",
        "Assistência Funerária Familiar",
        "Cobertura para cônjuge e filhos",
        "Descontos em parceiros",
      ];
    }

    if (nomePlano.includes("acidente")) {
      return [
        "Morte Acidental",
        "Invalidez Permanente por Acidente",
        "Despesas Médicas e Hospitalares",
        "Cobertura nacional",
      ];
    }

    if (nomePlano.includes("empresa")) {
      return [
        "Planos personalizados",
        "Coberturas para colaboradores",
        "Gestão simplificada",
        "Relatórios e acompanhamento",
      ];
    }

    return [
      "Morte por qualquer causa",
      "Invalidez Permanente Total ou Parcial por Acidente",
      "Assistência Funerária Familiar",
      "Cobertura nacional",
    ];
  }

  function calcularValor() {
    const valorMensal = Number(plano.valor);

    if (tipoCobranca === "anual") {
      return valorMensal * 12 * 0.9;
    }

    return valorMensal;
  }

  function formatarValor(valor: number) {
    return valor.toFixed(2).replace(".", ",");
  }

  const valorFinal = calcularValor();

  return (
    <article
      style={{
        position: "relative",
        background: "#ffffff",
        border: planoDestaque ? "1.5px solid #006b6b" : "1px solid #e0e8e6",
        borderRadius: "14px",
        minHeight: "365px",
        padding: "22px 18px 16px",
        boxShadow: "0 8px 24px rgba(0, 67, 70, 0.08)",
        display: "flex",
        flexDirection: "column",
        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 32px rgba(0, 67, 70, 0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 67, 70, 0.08)";
      }}
    >
      {planoDestaque && (
        <div
          style={{
            position: "absolute",
            top: "-14px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#006b6b",
            color: "#ffffff",
            padding: "5px 16px",
            borderRadius: "999px",
            fontSize: "11px",
            fontWeight: 900,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 10px rgba(0, 67, 70, 0.18)",
          }}
        >
          ⭐ MAIS CONTRATADO
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          paddingBottom: "18px",
          borderBottom: "1px solid #e4ecea",
        }}
      >
        <div
          style={{
            width: "54px",
            height: "54px",
            minWidth: "54px",
            borderRadius: "50%",
            background: "#dff3ef",
            color: "#006b6b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.25s ease",
          }}
        >
          {escolherIcone()}
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              color: "#004346",
              fontSize: "18px",
              fontWeight: 900,
            }}
          >
            {plano.nome}
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#5f6d70",
              fontSize: "12px",
              lineHeight: "17px",
            }}
          >
            {plano.descricao}
          </p>
        </div>
      </div>

      <div style={{ marginTop: "18px", marginBottom: "16px" }}>
        {Number(plano.valor) > 0 ? (
          <>
            <p
              style={{
                margin: 0,
                color: "#5f6d70",
                fontSize: "12px",
              }}
            >
              {tipoCobranca === "mensal" ? "A partir de" : "Plano anual por"}
            </p>

            <p
              key={`${plano.id}-${tipoCobranca}`}
              style={{
                marginTop: "2px",
                color: planoDestaque ? "#ff6b2c" : "#00565a",
                fontSize: tipoCobranca === "anual" ? "28px" : "32px",
                lineHeight: "36px",
                fontWeight: 900,
                animation: "none",
                transition:
                  "color 0.25s ease, font-size 0.25s ease, transform 0.25s ease",
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: 900 }}>R$</span>{" "}
              {formatarValor(valorFinal)}
              <span style={{ fontSize: "12px", fontWeight: 900 }}>
                {tipoCobranca === "mensal" ? "/mês" : "/ano"}
              </span>
            </p>

            <div
              style={{
                minHeight: "16px",
                marginTop: "2px",
              }}
            >
              {tipoCobranca === "anual" && (
                <p
                  style={{
                    margin: 0,
                    color: "#00a66a",
                    fontSize: "11px",
                    fontWeight: 800,
                    opacity: 1,
                    transition: "opacity 0.25s ease",
                  }}
                >
                  Equivale a R$ {formatarValor(valorFinal / 12)}/mês
                </p>
              )}
            </div>
          </>
        ) : (
          <p
            style={{
              margin: "10px 0 0",
              color: "#ff6b2c",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            Sob consulta
          </p>
        )}
      </div>

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "9px",
          padding: 0,
          margin: 0,
          flex: 1,
        }}
      >
        {beneficiosDoPlano().map((beneficio, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              color: "#34494c",
              fontSize: "12px",
              lineHeight: "17px",
            }}
          >
            <CheckCircle
              size={15}
              style={{
                minWidth: "15px",
                marginTop: "1px",
                color: "#006b6b",
              }}
            />
            {beneficio}
          </li>
        ))}
      </ul>

      <button
        style={{
          width: "100%",
          marginTop: "18px",
          border: planoDestaque ? "1.5px solid #ff6b2c" : "1.5px solid #006b6b",
          background: planoDestaque ? "#ff6b2c" : "#ffffff",
          color: planoDestaque ? "#ffffff" : "#006b6b",
          padding: "10px 12px",
          borderRadius: "7px",
          fontSize: "13px",
          fontWeight: 900,
          cursor: "pointer",
          transition: "transform 0.2s ease, background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          if (!planoDestaque) {
            e.currentTarget.style.background = "#006b6b";
            e.currentTarget.style.color = "#ffffff";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          if (!planoDestaque) {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.color = "#006b6b";
          }
        }}
      >
        {isEmpresarial ? "Falar com especialista" : "Escolher plano"}
      </button>

      {isAdmin && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "10px",
          }}
        >
          <ModalPlano
            plano={plano}
            tipo="editar"
            buscarPlanos={buscarPlanos}
            token={token}
          />

          <ModalPlano
            plano={plano}
            tipo="deletar"
            buscarPlanos={buscarPlanos}
            token={token}
          />
        </div>
      )}
    </article>
  );
}

export default CardPlano;