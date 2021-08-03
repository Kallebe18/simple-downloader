import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { VideoUrlDto } from './dto/VideoUrlDto';
import { getVideoMeta } from 'tiktok-scraper';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(ThrottlerGuard)
  @Post('tiktok/info')
  async getVideoInfo(@Body() body: VideoUrlDto) {
    const videoUrl = body.url
    console.log(videoUrl)
    const result = await getVideoMeta(videoUrl)
    return result;
  }
}
