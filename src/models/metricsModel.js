import { PrismaClient } from '@prisma/client';
import * as z from 'zod';

const prisma = new PrismaClient();

export const metricSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome da métrica é obrigatório')
    .max(255, 'O nome da métrica deve conter no máximo 50 caracteres'),
  unit: z
    .string()
    .min(1, 'A unidade de medida é obrigatória')
    .max(20, 'A unidade de medida deve conter no máximo 20 caracteres'),
});

export const list = async (metric) => {
  return await prisma.metric.findMany();
};

export const create = async (metric) => {
  return await prisma.metric.create({
    data: metric,
  });
};

export const update = async (id, metric) => {
  return await prisma.metric.update({
    data: metric,
    where: { id },
  });
};

export const remove = async (id) => {
  return await prisma.metric.delete({
    where: { id },
  });
};
