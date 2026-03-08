import * as z from 'zod';

export const onError = (error, req, res, next) => {
  console.error(error.stack);

  // Verifica se o erro é uma instância de ZodError (validação de dados) https://zod.dev/error-formatting?id=zprettifyerror
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      message: 'Erro de validação dos dados enviados.',
      errors: z.flattenError(error).fieldErrors,
    });
  }

  if (
    error.message.includes('in JSON at position') ||
    error.message.includes('not valid JSON')
  ) {
    return res.status(500).json({
      message: 'Erro no JSON enviado na requisição.',
    });
  }

  return res.status(500).json({
    message: 'Opss.. Ocorreu um erro no servidor! Tente novamente mais tarde.',
  });
};
