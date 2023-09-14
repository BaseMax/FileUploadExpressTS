import { Service } from 'typedi';
import prisma from '../../database/client';
import { logger } from '../../utils';
import { Prisma } from '@prisma/client';

@Service()
export class DirectoryRepository {
  create(dirName: string, userId: number, parentId?: number) {
    const data: Prisma.DirectoryCreateInput = {
      name: dirName,
      owner: {
        connect: { id: userId }
      }
    };

    if (parentId) {
      data.parentDir = {
        connect: { id: parentId }
      };
    }

    try {
      return prisma.directory.create({ data: data });
    } catch (error) {
      logger.error(error);
      return null;
      // Warn
    }
  }
}
