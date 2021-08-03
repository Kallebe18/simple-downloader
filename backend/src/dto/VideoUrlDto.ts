import { IsUrl } from 'class-validator';

export class VideoUrlDto {
  @IsUrl()
  url: string;
}