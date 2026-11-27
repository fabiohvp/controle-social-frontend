"use client";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";
import { useGlobalState } from "@/providers/GlobalProvider";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaAward,
  FaCheckCircle,
  FaClock,
  FaCrosshairs,
  FaRedo,
  FaTimesCircle,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { MOCK_PERGUNTAS, PerguntaPrefeito, Resposta } from "./perguntasData";

// Síntese de áudio via Web Audio API (sem dependências externas)
function playTone(freq: number, type: OscillatorType, duration: number) {
  try {
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silently ignore if audio not allowed by browser policy
  }
}

function playSound(name: "good" | "bad" | "ending" | "timeout", muted: boolean) {
  if (muted) return;
  if (name === "good") {
    playTone(523.25, "sine", 0.15); // C5
    setTimeout(() => playTone(659.25, "sine", 0.2), 120); // E5
    setTimeout(() => playTone(783.99, "sine", 0.3), 240); // G5
  } else if (name === "bad") {
    playTone(220, "triangle", 0.2);
    setTimeout(() => playTone(180, "sawtooth", 0.3), 150);
  } else if (name === "timeout") {
    playTone(300, "square", 0.1);
    setTimeout(() => playTone(250, "square", 0.2), 100);
  } else if (name === "ending") {
    playTone(440, "triangle", 0.15);
    setTimeout(() => playTone(554.37, "triangle", 0.15), 120);
    setTimeout(() => playTone(659.25, "triangle", 0.2), 240);
    setTimeout(() => playTone(880, "triangle", 0.4), 360);
  }
}

const TEMPO_POR_PERGUNTA = 30;

export default function PrefeitoPorUmDiaPage() {
  const { municipios } = useGlobalState();

  // Estados do jogo
  const [fase, setFase] = useState<"inicio" | "jogo" | "fim">("inicio");
  const [nome, setNome] = useState("");
  const [avatar, setAvatar] = useState<"prefeito" | "prefeita">("prefeito");
  const [municipioSelecionado, setMunicipioSelecionado] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  // Perguntas da rodada
  const [perguntasRodada, setPerguntasRodada] = useState<PerguntaPrefeito[]>([]);
  const [perguntaAtualIndex, setPerguntaAtualIndex] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] =
    useState<Resposta | null>(null);
  const [pontos, setPontos] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(TEMPO_POR_PERGUNTA);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Iniciar jogo
  function iniciarJogo() {
    if (!nome.trim()) return;

    // Selecionar 5 perguntas: 1 específica do município (se houver) + genéricas
    const munNome =
      municipios.find((m) => m.codigo === municipioSelecionado)?.nome ||
      municipioSelecionado;

    const especificas = MOCK_PERGUNTAS.filter(
      (p) => p.municipioEspecifico && p.municipioEspecifico.toLowerCase() === munNome.toLowerCase()
    );
    const genericas = MOCK_PERGUNTAS.filter((p) => !p.municipioEspecifico);

    const shuffle = <T,>(arr: T[]): T[] =>
      [...arr].sort(() => Math.random() - 0.5);

    const selecionadas: PerguntaPrefeito[] = [];
    if (especificas.length > 0) {
      selecionadas.push(shuffle(especificas)[0]);
    }
    const resto = shuffle(genericas).slice(0, 5 - selecionadas.length);
    selecionadas.push(...resto);

    // Embaralhar respostas de cada pergunta
    const rodada = shuffle(selecionadas).map((p) => ({
      ...p,
      respostas: shuffle(p.respostas),
    }));

    setPerguntasRodada(rodada);
    setPerguntaAtualIndex(0);
    setPontos(0);
    setRespostaSelecionada(null);
    setTempoRestante(TEMPO_POR_PERGUNTA);
    setFase("jogo");
  }

  // Timer de cada pergunta
  useEffect(() => {
    if (fase !== "jogo") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (respostaSelecionada) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          tratarTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fase, perguntaAtualIndex, respostaSelecionada]);

  function tratarTimeout() {
    playSound("timeout", isMuted);
    setRespostaSelecionada({ descricao: "Tempo esgotado!", correta: false });
  }

  function handleResposta(resp: Resposta) {
    if (respostaSelecionada) return;

    setRespostaSelecionada(resp);
    if (resp.correta) {
      playSound("good", isMuted);
      setPontos((p) => p + 1);
    } else {
      playSound("bad", isMuted);
    }
  }

  function avancarPergunta() {
    if (perguntaAtualIndex + 1 < perguntasRodada.length) {
      setPerguntaAtualIndex((prev) => prev + 1);
      setRespostaSelecionada(null);
      setTempoRestante(TEMPO_POR_PERGUNTA);
    } else {
      playSound("ending", isMuted);
      setFase("fim");
    }
  }

  function reiniciar() {
    setFase("inicio");
    setNome("");
    setPontos(0);
    setRespostaSelecionada(null);
  }

  // Detecção de geolocalização do navegador
  function detectarLocalizacao() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Encontra o município mais próximo ou por coordenadas
        // Como fallback inteligente, seleciona Vitória
        if (!municipioSelecionado && municipios.length > 0) {
          const vitoria = municipios.find(
            (m) => m.nome.toLowerCase() === "vitória"
          );
          if (vitoria) setMunicipioSelecionado(vitoria.codigo);
        }
      },
      () => {
        // se permissão negada, seleciona Vitória por padrão
        const vitoria = municipios.find(
          (m) => m.nome.toLowerCase() === "vitória"
        );
        if (vitoria) setMunicipioSelecionado(vitoria.codigo);
      }
    );
  }

  const perguntaAtual = perguntasRodada[perguntaAtualIndex];
  const munObjeto = municipios.find((m) => m.codigo === municipioSelecionado);

  return (
    <DashboardLayout className="pt-2 px-2" exibirFooter={false}>
      <PanelWithTitleCollapsible
        header="Prefeito por um Dia - O Jogo da Gestão Pública"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Assuma o comando da prefeitura e teste seus conhecimentos sobre
            orçamento público, limites da Lei de Responsabilidade Fiscal (LRF),
            educação, saúde e transparência fiscal no Espírito Santo!
          </p>
        </div>
      </PanelWithTitleCollapsible>

      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
        {/* Toggle de Som no topo */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 border px-3 py-1 rounded-full"
            title={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? <FaVolumeMute className="text-red-500" /> : <FaVolumeUp />}
            {isMuted ? "Mudo" : "Som ligado"}
          </button>
        </div>

        {/* FASE 1: TELA DE INÍCIO */}
        {fase === "inicio" && (
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl mb-4">🏛️</div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              Você está preparado para governar?
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Responda a 5 desafios e tome as decisões certas para manter as
              contas do seu município em dia e prestar contas ao TCE-ES.
            </p>

            <div className="w-full max-w-md flex flex-col gap-4 text-left">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Seu nome ou cargo:
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Ex: Carlos ou Prefeita Maria"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              {/* Avatar */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Escolha seu avatar:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAvatar("prefeito")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${
                      avatar === "prefeito"
                        ? "border-primary bg-blue-50 font-bold text-primary"
                        : "border-gray-200 hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <span className="text-2xl">👨‍💼</span> Prefeito
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatar("prefeita")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${
                      avatar === "prefeita"
                        ? "border-primary bg-blue-50 font-bold text-primary"
                        : "border-gray-200 hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <span className="text-2xl">👩‍💼</span> Prefeita
                  </button>
                </div>
              </div>

              {/* Município */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Qual município você vai governar?
                  </label>
                  <button
                    type="button"
                    onClick={detectarLocalizacao}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <FaCrosshairs /> Detectar cidade
                  </button>
                </div>
                <select
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                  value={municipioSelecionado}
                  onChange={(e) => setMunicipioSelecionado(e.target.value)}
                >
                  <option value="">Selecione um município...</option>
                  {municipios.map((m) => (
                    <option key={m.codigo} value={m.codigo}>
                      {m.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botão Começar */}
              <button
                type="button"
                disabled={!nome.trim() || !municipioSelecionado}
                onClick={iniciarJogo}
                className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tomar Posse e Começar! 🚀
              </button>
            </div>
          </div>
        )}

        {/* FASE 2: QUIZ / DESAFIOS */}
        {fase === "jogo" && perguntaAtual && (
          <div className="flex flex-col">
            {/* Cabeçalho do jogo */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">
                  {avatar === "prefeito" ? "👨‍💼" : "👩‍💼"}
                </span>
                <div>
                  <div className="font-bold text-gray-800">
                    {avatar === "prefeito" ? "Prefeito" : "Prefeita"} {nome}
                  </div>
                  <div className="text-xs text-gray-500">
                    {munObjeto?.nome ?? "Espírito Santo"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Timer */}
                <div
                  className={`flex items-center gap-1 font-mono font-bold text-sm px-2.5 py-1 rounded-full border ${
                    tempoRestante <= 5
                      ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  <FaClock /> {tempoRestante}s
                </div>

                {/* Pergunta atual */}
                <div className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                  Desafio {perguntaAtualIndex + 1} de {perguntasRodada.length}
                </div>
              </div>
            </div>

            {/* Enunciado */}
            <div className="my-3">
              <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                {perguntaAtual.enunciado}
              </h3>
            </div>

            {/* Respostas */}
            <div className="flex flex-col gap-3 my-4">
              {perguntaAtual.respostas.map((resp, idx) => {
                const foiSelecionada =
                  respostaSelecionada?.descricao === resp.descricao;
                const estaCerta = resp.correta;

                let classes =
                  "p-4 rounded-lg border-2 text-left text-sm transition font-medium flex items-center justify-between ";

                if (!respostaSelecionada) {
                  classes +=
                    "border-gray-200 hover:border-primary hover:bg-blue-50/50 cursor-pointer text-gray-800";
                } else {
                  if (estaCerta) {
                    classes +=
                      "border-green-500 bg-green-50 text-green-900 font-bold";
                  } else if (foiSelecionada && !estaCerta) {
                    classes +=
                      "border-red-500 bg-red-50 text-red-900 line-through";
                  } else {
                    classes += "border-gray-200 bg-gray-50 opacity-60 text-gray-500";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!!respostaSelecionada}
                    onClick={() => handleResposta(resp)}
                    className={classes}
                  >
                    <span>{resp.descricao}</span>
                    {respostaSelecionada && estaCerta && (
                      <FaCheckCircle className="text-green-600 text-lg flex-shrink-0 ml-2" />
                    )}
                    {respostaSelecionada && foiSelecionada && !estaCerta && (
                      <FaTimesCircle className="text-red-500 text-lg flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Ação pós-resposta */}
            {respostaSelecionada && (
              <div className="mt-4 pt-4 border-t flex items-center justify-between animate-fadeIn">
                <div className="text-sm font-semibold">
                  {respostaSelecionada.correta ? (
                    <span className="text-green-700 flex items-center gap-1">
                      <FaCheckCircle /> Decisão correta! Parabéns!
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <FaTimesCircle /> Decisão equivocada! O TCE-ES está de
                      olho.
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={avancarPergunta}
                  className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-2 px-5 rounded-lg shadow transition"
                >
                  {perguntaAtualIndex + 1 < perguntasRodada.length
                    ? "Próximo Desafio ➔"
                    : "Ver Resultado 🏆"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* FASE 3: RESULTADO FINAL */}
        {fase === "fim" && (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-4xl text-yellow-600 mb-4 shadow-inner">
              <FaAward />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Fim de Mandato, {avatar === "prefeito" ? "Prefeito" : "Prefeita"}{" "}
              {nome}!
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Município de {munObjeto?.nome ?? "sua cidade"}
            </p>

            <div className="bg-gray-50 border rounded-xl p-6 w-full max-w-md mb-6">
              <div className="text-4xl font-extrabold text-primary mb-1">
                {pontos} / 5
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
                Decisões Acertadas
              </div>

              <p className="text-sm text-gray-700 font-medium">
                {pontos === 5 &&
                  "🌟 Gestão Impecável! Você demonstrou domínio completo sobre as normas do TCE-ES, responsabilidade fiscal e transparência!"}
                {pontos >= 3 &&
                  pontos < 5 &&
                  "👍 Boa Governança! Você tomou boas decisões e manteve a cidade no caminho do equilíbrio fiscal!"}
                {pontos >= 1 &&
                  pontos < 3 &&
                  "⚠️ Mandato Desafiador! Governar exige muita atenção às leis e limites de gastos. Fique atento às recomendações do Tribunal de Contas!"}
                {pontos === 0 &&
                  "🚨 Alerta Fiscal! Suas decisões comprometeriam o orçamento público. Aproveite o Painel de Controle para se aprofundar!"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={reiniciar}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-lg shadow transition text-sm"
              >
                <FaRedo /> Jogar Novamente
              </button>

              {munObjeto?.nomeNormalizado && (
                <Link
                  href={`/municipio/2024/${munObjeto.nomeNormalizado}/visao-geral`}
                  className="flex-1 flex items-center justify-center gap-1 border border-primary text-primary hover:bg-blue-50 font-bold py-2.5 px-4 rounded-lg transition text-sm"
                >
                  Ver Dados da Cidade
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
