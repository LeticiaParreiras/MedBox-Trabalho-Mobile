export function dataAleatoria(): Date {
  const diasMax = 15;
  const msPorDia = 24 * 60 * 60 * 1000;

  // valor aleatório entre 0 e 30 dias (em ms)
  const msAtras = Math.floor(Math.random() * (diasMax * msPorDia));

  return new Date(Date.now() - msAtras);
}
export function gerarDatas() {
  const created = dataAleatoria(); // já gera uma data aleatória
  // diferença máxima: 30 minutos
const maxDifMs = 30 * 60 * 1000; // 30 min em ms

// gera diferença aleatória entre 0 e 30 minutos
const difRandom = Math.floor(Math.random() * maxDifMs);

// updatedAt = createdAt + difRandom
const updated = new Date(created.getTime() + difRandom);

  return {
    createdAt: created.toISOString(),
    updatedAt: updated.toISOString(),
  };
}
export function formatDate(dataString: string) {
  const data = new Date(dataString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}
