import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MemoService, Memo } from './memo.service';

@Controller('memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get()
  getAll(): Memo[] {
    return this.memoService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Memo {
    return this.memoService.findOne(Number(id));
  }

  @Post()
  create(@Body('content') content: string): Memo {
    return this.memoService.create(content);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('content') content: string): Memo {
    return this.memoService.update(Number(id), content);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.memoService.remove(Number(id));
  }
}
