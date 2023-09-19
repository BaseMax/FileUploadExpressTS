import { Service } from 'typedi';
import { CreateUserDto } from './dto/createUser.dto';
import prisma from '../../database/client';
import { UpdateUserProfileDto } from './dto/update-profile';
import { ChangePasswordDto } from './dto/change-password.dto';
import { HashService } from '../../infrastructure/services/hash/hash.service';
import { BadRequestError } from 'routing-controllers';

@Service()
export class UserService {
  constructor(private readonly hashService: HashService) {}
  getUserProfile(userId: number) {
    return prisma.profile.findUnique({
      where: { userId }
    });
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new BadRequestError();

    const matchPassword = this.hashService.compare(
      changePasswordDto.currentPassword,
      user.password
    );

    if (!matchPassword) throw new BadRequestError('old password not valid');

    const hashNewPassword = await this.hashService.make(
      changePasswordDto.newPassword
    );

    return prisma.user.update({
      where: { id: userId },
      data: {
        password: hashNewPassword
      }
    });
  }

  updateProfile(userId: number, updateUserProfileDto: UpdateUserProfileDto) {
    return prisma.profile.upsert({
      where: { userId },
      create: {
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
        username: createUserDto.username,
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
