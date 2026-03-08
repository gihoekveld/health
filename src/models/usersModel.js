import { PrismaClient } from '@prisma/client';
import * as z from 'zod';

const prisma = new PrismaClient();

export const userNameSchema = z.object({
  name: z
    .string('O nome é obrigatório')
    .min(1, 'O nome é obrigatório')
    .max(255, 'O nome deve conter no máximo 255 caracteres'),
});

export const userSchema = userNameSchema.extend({
  email: z.email('Email inválido'),
  password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
});

export const create = async (user) => {
  return await prisma.user.create({
    data: user,
  });
};

export const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const update = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};
