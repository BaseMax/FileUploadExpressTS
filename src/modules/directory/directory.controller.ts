import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  UseBefore
} from 'routing-controllers';
import { Service } from 'typedi';
import { AuthCheck } from '../../infrastructure/middlewares/auth.middleware';
import { GetCurrentUserId } from '../../decorators/get-current-user-id.decorator';
import { DirectoryService } from './directory.service';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { HasRole } from '../../infrastructure/middlewares/hasRole.middleware';
import { Roles } from '../auth/types/role.enum';

@Service()
@UseBefore(AuthCheck)
@JsonController('/directory')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Get()
  @UseBefore(HasRole(Roles.Admin))
  getAllDirectories() {
    return this.directoryService.findAll();
  }

  @Get('/view-directory-stats/:id')
  @UseBefore(HasRole(Roles.Admin))
  viewDirectoryStats(@Param('id') id: number) {
    return this.directoryService.viewDirectoryStats(+id);
  }

  @Get('/view-directory-content/:id')
  @UseBefore(HasRole(Roles.Admin))
  viewDirectoryContent(@Param('id') id: number) {
    return this.directoryService.viewDirectoryContent(+id);
  }

  @Post()
  @HttpCode(201)
  createDirectory(
    @GetCurrentUserId() userId: number,
    @Body() payload: CreateDirectoryDto
  ) {
    return this.directoryService.createDirectory(+userId, payload);
  }
}
