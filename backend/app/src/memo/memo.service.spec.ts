// npm run test
import { Test, TestingModule } from '@nestjs/testing';
import { MemoService } from './memo.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('MemoService', () => {
  let service: MemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoService],
    }).compile();
    service = module.get<MemoService>(MemoService);
  });

  it('should create a memo', () => {
    const memo = service.create('Test content');
    expect(memo).toHaveProperty('id');
    expect(memo.content).toBe('Test content');
  });

  it('should throw BadRequestException when content is empty or whitespace', () => {
    expect(() => service.create('')).toThrow(BadRequestException);
    expect(() => service.create('   ')).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when content exceeds maximum length', () => {
    const longContent = 'a'.repeat(1001);
    expect(() => service.create(longContent)).toThrow(BadRequestException);
  });

  it('should find all memos', () => {
    service.create('Test1');
    service.create('Test2');
    const memos = service.findAll();
    expect(memos.length).toBeGreaterThanOrEqual(2);
  });

  it('should find a memo by id', () => {
    const created = service.create('Test content');
    const memo = service.findOne(created.id);
    expect(memo).toEqual(created);
  });

  it('should throw NotFoundException for non-existent memo in findOne', () => {
    expect(() => service.findOne(9999)).toThrow(NotFoundException);
  });

  it('should update a memo', () => {
    const created = service.create('Old content');
    const updated = service.update(created.id, 'New content');
    expect(updated.content).toBe('New content');
  });

  it('should throw NotFoundException when updating a non-existent memo', () => {
    expect(() => service.update(9999, 'Content')).toThrow(NotFoundException);
  });

  it('should remove a memo', () => {
    const created = service.create('Test content');
    service.remove(created.id);
    expect(() => service.findOne(created.id)).toThrow(NotFoundException);
  });

  it('should throw NotFoundException when removing a non-existent memo', () => {
    expect(() => service.remove(9999)).toThrow(NotFoundException);
  });
});
