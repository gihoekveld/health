import { PrismaClient } from '@prisma/client';
import * as z from 'zod';

const prisma = new PrismaClient();

export const userSchema = z.object({
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
