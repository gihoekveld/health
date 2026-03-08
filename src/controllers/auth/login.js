import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findByEmail, userSchema } from '../../models/usersModel.js';

export const login = async (req, res) => {
  const { email, password } = userSchema.parse(req.body);

  // Verificar se o usuário existe
  const user = await findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'E-mail ou senha inválidos' });
  }

  // Verificar se a senha está correta
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'E-mail ou senha inválidos' });
  }

  // Gerar token JWT
  const token = jwt.sign(
    { user: { id: user.id, email: user.email } },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m', // Token expira em 15 minutos
    }
  );

  // Gerar refresh token
  const refreshToken = jwt.sign(
    { user: { id: user.id, email: user.email } },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d', // Refresh token expira em 7 dias
    }
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
  });

  return res.status(200).json({ token, refreshToken });
};
