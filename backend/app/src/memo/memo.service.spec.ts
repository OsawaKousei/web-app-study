import { Test, TestingModule } from '@nestjs/testing';
import { MemoService } from './memo.service';

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
    console.log('Memo created', memo);
    expect(memo).toHaveProperty('id');
    expect(memo.content).toBe('Test content');
  });

  it('should find all memos', () => {
    // ...existing setup...
    service.create('Test1');
    service.create('Test2');
    const memos = service.findAll();
    expect(memos.length).toBeGreaterThanOrEqual(2);
  });

  it('should find a memo by id', () => {
    // ...existing setup...
    const created = service.create('Test content');
    const memo = service.findOne(created.id);
    expect(memo).toEqual(created);
  });

  it('should update a memo', () => {
    // ...existing setup...
    const created = service.create('Old content');
    const updated = service.update(created.id, 'New content');
    expect(updated.content).toBe('New content');
  });

  it('should remove a memo', () => {
    // ...existing setup...
    const created = service.create('Test content');
    service.remove(created.id);
    expect(() => service.findOne(created.id)).toThrow();
  });
});
