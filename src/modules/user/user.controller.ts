import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Put,
  UseBefore
} from 'routing-controllers';
import { Service } from 'typedi';
import { GetCurrentUserId } from '../../decorators/get-current-user-id.decorator';
import { AuthCheck } from '../../infrastructure/middlewares/auth.middleware';
import { UserService } from './user.service';
import { UpdateUserProfileDto } from './dto/update-profile';

@Service()
@JsonController('/user')
@UseBefore(AuthCheck)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @HttpCode(200)
  getUserProfile(@GetCurrentUserId() userId: number) {
    return this.userService.getUserProfile(+userId);
  }

  @Put('/update-profile')
  updateUserProfile(
    @GetCurrentUserId() userId: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto
  ) {
    return this.userService.updateProfile(+userId, updateUserProfileDto);
  }

  @Delete('/delete-account')
  @HttpCode(200)
  deleteAccount(@GetCurrentUserId() userId: number) {
    return this.userService.remove(userId);
  }
}
