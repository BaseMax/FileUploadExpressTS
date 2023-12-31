import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  QueryParam,
  UploadedFiles,
  UseBefore
} from 'routing-controllers';
import { Service } from 'typedi';
import { FileService } from './file.service';
import { File } from '../../infrastructure/services/s3-manager/interface/file.interface';
import { GetCurrentUserId } from '../../decorators/get-current-user-id.decorator';
import { AuthCheck } from '../../infrastructure/middlewares/auth.middleware';
import { UploadFromLinkDto } from './dto/upload-from-file.dto';
import { TransformFileDto } from './dto/trnsform-file.dto';
import { RenameFileDto } from './dto/rename-file.dto';
import { HasRole } from '../../infrastructure/middlewares/hasRole.middleware';
import { Roles } from '../auth/types/role.enum';

@Service()
@UseBefore(AuthCheck)
@JsonController('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  @UseBefore(HasRole(Roles.Admin))
  getAll() {
    return this.fileService.getAllFiles();
  }

  @Get('/leaderboard/')
  leaderboardOfHotLinks(@GetCurrentUserId() userId: number) {
    return this.fileService.leaderboardOfHotLinks(+userId);
  }

  @Get('/:id')
  downloadFile(@GetCurrentUserId() userId: number, @Param('id') id: number) {
    return this.fileService.downloadFile(+userId, +id);
  }

  @Get('/stats/:id')
  numberOfDownloadFile(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number
  ) {
    return this.fileService.numberOfDownloads(+userId, +id);
  }

  @Get('/admin/stats/:id')
  @UseBefore(HasRole(Roles.Admin))
  getFileStats(@Param('id') id: number) {
    return this.fileService.getFileStats(+id);
  }

  @Get('/search')
  search(
    @GetCurrentUserId() userId: number,
    @QueryParam('q', { type: String }) query: string
  ) {
    return this.fileService.search(+userId, query);
  }

  @Get('/uploads')
  getUserUploadedFiles(@GetCurrentUserId() userId: number) {
    return this.fileService.getUserFiles(+userId);
  }

  @Post('/copy/:id')
  copyFile(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number,
    @Body() payload: TransformFileDto
  ) {
    return this.fileService.copyFile(+userId, +id, payload?.directoryId);
  }

  @Post('/move/:id')
  moveFile(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number,
    @Body() payload: TransformFileDto
  ) {
    return this.fileService.moveFile(+userId, +id, payload?.directoryId);
  }

  @Post('/rename/:id')
  renameFile(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number,
    @Body() body: RenameFileDto
  ) {
    return this.fileService.renameFile(+userId, +id, body.newName);
  }

  @Post('/upload-from-link')
  uploadFileFromLink(
    @GetCurrentUserId() userId: number,
    @Body() uploadFromLinkDto: UploadFromLinkDto
  ) {
    return this.fileService.uploadFromLink(
      +userId,
      uploadFromLinkDto.url,
      uploadFromLinkDto.directoryId
    );
  }

  @Post('/upload/:directoryId')
  @HttpCode(201)
  async uploadFile(
    @UploadedFiles('file') files: File | File[],
    @GetCurrentUserId() userId: number,
    @Param('directoryId') directoryId?: number
  ) {
    return this.fileService.uploadFiles(files, +userId, directoryId);
  }

  @Delete('/:id')
  async deleteFile(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number
  ) {
    return this.fileService.removeFile(+userId, id);
  }

  @Delete('/admin/:id')
  @UseBefore(HasRole(Roles.Admin))
  deleteFileByAdmin(@Param('id') id: number) {
    return this.fileService.removeFileByAdmin(+id);
  }
}
