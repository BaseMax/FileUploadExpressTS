import {
  Body,
  BodyOptions,
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

@Service()
@UseBefore(AuthCheck)
@JsonController('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/:id')
  downloadFile(@GetCurrentUserId() userId: number, @Param('id') id: number) {
    return this.fileService.downloadFile(+userId, +id);
  }

  @Get('/uploads')
  getUserUploadedFiles(@GetCurrentUserId() userId: number) {
    return this.fileService.getUserFiles(+userId);
  }

  @Post('/upload-from-link')
  uploadFileFromLink(
    @GetCurrentUserId() userId: number,
    @Body() uploadFromLinkDto: UploadFromLinkDto
  ) {
    return this.fileService.uploadFromLink(+userId, uploadFromLinkDto.url);
  }

  @Post('/upload')
  @HttpCode(201)
  async uploadFile(
    @UploadedFiles('file') files: File | File[],
    @GetCurrentUserId() userId: number
  ) {
    return await this.fileService.uploadFiles(files, +userId);
  }

  @Get('/search')
  search(
    @GetCurrentUserId() userId: number,
    @QueryParam('q', { type: String }) query: string
  ) {
    return this.fileService.search(+userId, query);
  }

  @Delete('/:id')
  async deleteFile(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number
  ) {
    return this.fileService.removeFile(+userId, id);
  }
}
