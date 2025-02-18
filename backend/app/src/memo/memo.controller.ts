import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { MemoService, Memo } from './memo.service';

export class CreateMemoDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MaxLength(1000)
  content: string;
}

export class UpdateMemoDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MaxLength(1000)
  content: string;
}

@Controller('memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get()
  getAll(): Memo[] {
    return this.memoService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Memo {
    const numId = Number(id);
    if (isNaN(numId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.memoService.findOne(numId);
  }

  @Post()
  create(@Body() createMemoDto: CreateMemoDto): Memo {
    return this.memoService.create(createMemoDto.content);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMemoDto: UpdateMemoDto): Memo {
    const numId = Number(id);
    if (isNaN(numId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.memoService.update(numId, updateMemoDto.content);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    const numId = Number(id);
    if (isNaN(numId)) {
      throw new BadRequestException('Invalid ID format');
    }
    this.memoService.remove(numId);
  }
}
