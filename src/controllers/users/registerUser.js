import bcrypt from 'bcrypt';
import { userSchema, create, findByEmail } from '../../models/usersModel.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = userSchema.parse(req.body);

  const existingUser = await findByEmail(email);

  // Verificar se o e-mail já está em uso
  if (existingUser) {
    return res.status(409).json({ message: 'Este e-mail já está em uso' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await create({ name, email, password: hashedPassword });

  return res.status(201).json({ message: 'Usuário criado com sucesso' });
};
