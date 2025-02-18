import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Memo E2E', () => {
  let app: INestApplication;
  let memoId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /memos - メモの作成', () => {
    return request(app.getHttpServer())
      .post('/memos')
      .send({ content: 'Memo e2e test' })
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.content).toBe('Memo e2e test');
        memoId = res.body.id;
      });
  });

  it('GET /memos - 全てのメモ取得', () => {
    return request(app.getHttpServer())
      .get('/memos')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('GET /memos/:id - IDによるメモ取得', () => {
    return request(app.getHttpServer())
      .get(`/memos/${memoId}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(memoId);
      });
  });

  it('PUT /memos/:id - メモの更新', () => {
    return request(app.getHttpServer())
      .put(`/memos/${memoId}`)
      .send({ content: 'Updated memo e2e test' })
      .expect(200)
      .then((res) => {
        expect(res.body.content).toBe('Updated memo e2e test');
      });
  });

  it('DELETE /memos/:id - メモの削除', () => {
    return request(app.getHttpServer())
      .delete(`/memos/${memoId}`)
      .expect(200);
  });

  it('GET /memos/:id - 削除されたメモは404エラー', () => {
    return request(app.getHttpServer())
      .get(`/memos/${memoId}`)
      .expect(404);
  });
});
