import jwt from 'jsonwebtoken';

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: 'Sua sessão expirou. Faça login novamente' });
  }

  // Verificar o refresh token
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const newToken = jwt.sign(
      { user: { id: payload.user.id, email: payload.user.email } },
      process.env.JWT_SECRET,
      {
        expiresIn: '15m', // Novo token expira em 15 minutos
      }
    );

    const newRefreshToken = jwt.sign(
      { user: { id: payload.user.id, email: payload.user.email } },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d', // Novo refresh token expira em 7 dias
      }
    );

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    });

    return res
      .status(200)
      .json({ token: newToken, refreshToken: newRefreshToken });
  } catch (err) {
    console.error('Ocorreu um erro ao verificar o refresh token:', err);

    return res
      .status(401)
      .json({ message: 'Sua sessão expirou. Faça login novamente' });
  }
};
