export function parseTime(time: Date) {
  return new Date(time).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
}
