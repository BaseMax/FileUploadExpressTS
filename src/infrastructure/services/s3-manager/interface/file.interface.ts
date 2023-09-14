export interface File {
  originalname: string;
  size: number;
  type: string;
  mimetype: string;
  buffer: ArrayBuffer;
}
