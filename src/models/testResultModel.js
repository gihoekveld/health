import { PrismaClient } from '@prisma/client';
import * as z from 'zod';

const prisma = new PrismaClient();

export const testResultSchema = z.object({
  date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: 'Data inválida',
  }),
  tests: z.array(
    z.object({
      metricId: z.number('O ID do exame deve ser um número'),
      value: z.number('O valor do exame deve ser um número'),
    })
  ),
});

export const create = async (date, tests) => {
  return await prisma.test.create({
    data: {
      createdAt: new Date(date),
      testResults: {
        create: tests.map((test) => ({
          metricId: test.metricId,
          value: test.value,
        })),
      },
    },
    include: { testResults: true },
  });
};
