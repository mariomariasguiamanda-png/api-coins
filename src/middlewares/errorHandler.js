export function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err.stack || err.message);

  res.status(err.status || 500).json({
    message: err.message || "Erro interno do servidor",
  });
}
