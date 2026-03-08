import bcrypt from 'bcrypt';
import { userSchema, create, findByEmail } from '../../models/userModel.js';

export const createUser = async (req, res) => {
  const { email, password } = userSchema.parse(req.body);

  const existingUser = await findByEmail(email);

  // Verificar se o e-mail já está em uso
  if (existingUser) {
    return res.status(409).json({ message: 'Este e-mail já está em uso' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await create({ email, password: hashedPassword });

  return res.status(201).json({ message: 'Usuário criado com sucesso' });
};
