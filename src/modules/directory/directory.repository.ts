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

  viewDirectoryStats(id: number) {
    return prisma.file.count({ where: { directoryId: id } });
  }

  viewDirectoryContent(id: number) {
    return prisma.file.findMany({ where: { directoryId: id } });
  }

  findAll() {
    return prisma.directory.findMany({ include: { parentDir: true } });
  }

  findById(id: number, userId: number) {
    return prisma.directory.findUnique({
      where: { id, ownerId: userId },
      include: {
        parentDir: {
          include: {
            parentDir: {
              include: {
                parentDir: {
                  include: { parentDir: { include: { parentDir: true } } }
                }
              }
            }
          }
        }
      }
    });
  }
}
