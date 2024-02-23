// Docs: https://zenn.dev/gibjapan/articles/04dd5afde1ca79
import { Prisma, PrismaClient } from '@prisma/client';

// eslint-disable-next-line
const setOffsetTime = (object: any, offsetTime: number) => {
  if (object === null || typeof object !== 'object') return;

  for (const key of Object.keys(object)) {
    const value = object[key];
    if (value instanceof Date) {
      object[key] = new Date(value.getTime() + offsetTime);
    } else if (value !== null && typeof value === 'object') {
      setOffsetTime(value, offsetTime);
    }
  }
};

export const timezoneMiddleware: Prisma.Middleware = async (params, next) => {
  const offsetTime = 9 * 60 * 60 * 1000;

  setOffsetTime(params.args, offsetTime);
  const result = await next(params);

  return result;
};

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
prisma.$use(timezoneMiddleware);

export { prisma };
