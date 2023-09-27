import { Service } from 'typedi';
import prisma from '../../database/client';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Service()
export class FileRepository {
  search(userId: number, query: string) {
    return prisma.file.findMany({
      where: { ownerId: userId, name: { contains: query } }
    });
  }

  getAll() {
    return prisma.file.findMany();
  }

  incrementNumberOfDownloads(id: number) {
    return prisma.file.update({
      where: { id },
      data: {
        numberOfDownloads: {
          increment: 1
        }
      }
    });
  }

  create(userId: number, createFileDto: CreateFileDto) {
    return prisma.file.create({
      data: {
        owner: {
          connect: { id: userId }
        },
        directory: {
          connect: { id: createFileDto?.directoryId }
        },
        name: createFileDto.name,
        key: createFileDto.key,
        size: createFileDto.size,
        type: createFileDto.type
      }
    });
  }

  findUserFileById(id: number, userId: number) {
    return prisma.file.findUnique({
      where: {
        id,
        ownerId: userId
      },
      include: {
        directory: {
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

  findFileById(id: number) {
    return prisma.file.findUnique({
      where: {
        id
      },
      include: {
        directory: {
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

  getUserAllFilesSortByDownloads(userId: number) {
    return prisma.file.findMany({
      where: {
        ownerId: userId
      },
      include: {
        directory: {
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
      },
      orderBy: {
        numberOfDownloads: 'desc'
      }
    });
  }

  update(id: number, payload: UpdateFileDto) {
    return prisma.file.update({
      where: { id },
      data: {
        name: payload?.name,
        directory: {
          connect: { id: payload?.directoryId }
        }
      }
    });
  }

  updateFileName(fileId: number, fileName: string) {
    return prisma.file.update({
      where: { id: fileId },
      data: {
        name: fileName,
        key: fileName
      }
    });
  }

  getUserAllFiles(userId: number) {
    return prisma.file.findMany({
      where: { ownerId: userId }
    });
  }

  delete(id: number, userId: number) {
    return prisma.file.delete({
      where: {
        id,
        ownerId: userId
      }
    });
  }
}
