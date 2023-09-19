import { Service } from 'typedi';
import prisma from '../../database/client';
import { CreateFileDto } from './dto/createFile.dto';

@Service()
export class FileRepository {
  search(userId: number, query: string) {
    return prisma.file.findMany({
      where: { ownerId: userId, name: { contains: query } }
    });
  }

  create(userId: number, createFileDto: CreateFileDto) {
    return prisma.file.create({
      data: {
        owner: {
          connect: { id: userId }
        },
        name: createFileDto.name,
        path: createFileDto.path,
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
      include: { directory: true }
    });
  }

  updateFileName(fileId: number, fileName: string) {
    return prisma.file.update({
      where: { id: fileId },
      data: {
        name: fileName,
        path: fileName
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
