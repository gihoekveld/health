import { PrismaClient } from '@prisma/client';
import * as z from 'zod';

const prisma = new PrismaClient();

export const testResultSchema = z.object({
  date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: 'Data inválida',
  }),
  testResults: z.array(
    z.object({
      metricId: z.number('O ID do exame deve ser um número'),
      value: z.number('O valor do exame deve ser um número'),
    })
  ),
});

export const testResultHistoryQuerySchema = z.object({
  from: z
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), {
      message: 'Data inválida',
    })
    .optional(),
  to: z
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), {
      message: 'Data inválida',
    })
    .optional(),
  metricIds: z
    .string()
    .transform((str) => {
      if (!str) return undefined;
      return str.split(',').map((id) => Number.parseInt(id.trim(), 10));
    })
    .optional(),
});

export const create = async (date, testResults) => {
  return await prisma.test.create({
    data: {
      date: new Date(date),
      testResults: {
        create: testResults.map((result) => ({
          metricId: result.metricId,
          value: result.value,
        })),
      },
    },
    include: { testResults: true },
  });
};

export const update = async (id, date, testResults) => {
  return await prisma.test.update({
    where: { id },
    data: {
      date: new Date(date),
      testResults: {
        deleteMany: {}, // Remove resultados antigos
        create: testResults.map((result) => ({
          metricId: result.metricId,
          value: result.value,
        })),
      },
    },
    include: { testResults: true },
  });
};

export const findMany = async ({ from, to, metricIds }) => {
  const tests = await prisma.test.findMany({
    where: {
      date: {
        gte: from ? new Date(from) : undefined,
        lte: to ? new Date(to) : undefined,
      },
      testResults: {
        some: {
          metricId: metricIds ? { in: metricIds } : undefined,
        },
      },
    },
    include: {
      testResults: {
        include: {
          metric: {
            select: {
              id: true,
              name: true,
              unit: true,
            },
          },
        },
      },
    },
  });

  // Se metricIds foi informado, filtra os testResults de cada teste
  if (metricIds && Array.isArray(metricIds)) {
    return tests.map((test) => ({
      ...test,
      testResults: test.testResults
        .filter((tr) => metricIds.includes(tr.metricId))
        .map((tr) => ({
          id: tr.id,
          value: tr.value,
          metric: tr.metric,
        })),
    }));
  }

  return tests;
};

export const remove = async (id) => {
  return await prisma.test.delete({
    where: { id },
  });
};
