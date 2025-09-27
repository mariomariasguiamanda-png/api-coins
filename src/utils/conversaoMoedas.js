export const Conversao = {
  calcularMoedasNecessarias(pontos) {
    // Exemplo: 700 moedas = 1 ponto
    const TAXA = 700;
    return pontos * TAXA;
  },

  calcularPontosGerados(moedas) {
    const TAXA = 700;
    return Math.floor(moedas / TAXA);
  }
};
