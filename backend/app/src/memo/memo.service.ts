import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

export interface Memo {
  id: number;
  content: string;
}

@Injectable()
export class MemoService {
  private memos: Memo[] = [];
  private idCounter = 1;

  findAll(): Memo[] {
    return this.memos;
  }

  findOne(id: number): Memo {
    const memo = this.memos.find((m) => m.id === id);
    if (!memo) {
      throw new NotFoundException(`Memo #${id} not found`);
    }
    return memo;
  }

  create(content: string): Memo {
    if (!content || content.trim().length === 0) {
      throw new BadRequestException('Content cannot be empty');
    }
    if (content.length > 1000) {
      throw new BadRequestException(
        'Content exceeds maximum length of 1000 characters',
      );
    }
    const memo = { id: this.idCounter++, content };
    this.memos.push(memo);
    return memo;
  }

  update(id: number, content: string): Memo {
    const memo = this.findOne(id);
    memo.content = content.trim();
    return memo;
  }

  remove(id: number): void {
    const index = this.memos.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new NotFoundException(`Memo #${id} not found`);
    }
    this.memos.splice(index, 1);
  }
}
