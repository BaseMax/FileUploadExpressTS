import { Service } from 'typedi';
import { CreateUserDto } from './dto/createUser.dto';
import prisma from '../../database/client';
import { UpdateUserProfileDto } from './dto/update-profile';

@Service()
export class UserService {
  getUserProfile(userId: number) {
    return prisma.profile.findUnique({
      where: { userId }
    });
  }

  updateProfile(userId: number, updateUserProfileDto: UpdateUserProfileDto) {
    return prisma.profile.upsert({
      where: { userId },
      create: {
        username: updateUserProfileDto.username,
        firstName: updateUserProfileDto.firstName,
        lastName: updateUserProfileDto.lastName,
        phone: updateUserProfileDto.phone,
        user: {
          connect: {
            id: userId
          }
        }
      },
      update: {
        username: updateUserProfileDto?.username,
        firstName: updateUserProfileDto?.firstName,
        lastName: updateUserProfileDto?.lastName,
        phone: updateUserProfileDto?.phone
      }
    });
  }

  create(createUserDto: CreateUserDto) {
    return prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password
      }
    });
  }

  findMany() {
    return prisma.user.findMany();
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: string) {}

  async remove(id: number) {
    await prisma.user.delete({ where: { id } });
    return { message: 'User account deleted successfully' };
  }
}
