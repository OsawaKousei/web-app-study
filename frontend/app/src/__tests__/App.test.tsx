import '@testing-library/jest-dom';
import React, {act} from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// コンポーネントのimportパスを修正
import Page from '../app/page';

// global.fetch にデフォルトのモック実装を設定
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  headers: { get: () => 'application/json' },
  json: async () => [],
});

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

test('タイトル "Memo App" がレンダリングされる', async () => {
  await act(async () => {
    render(<Page />);
  });
  expect(screen.getByRole('heading', { name: /memo app/i })).toBeInTheDocument();
});

test('マウント時にGETリクエストでメモ一覧が取得されレンダリングされる', async () => {
  // headers と ok プロパティを追加
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    headers: { get: () => 'application/json' },
    json: async () => [{ id: 1, content: 'Test memo' }]
  });
  await act(async () => {
    render(<Page />);
  });
  const memoElement = await screen.findByText(/Test memo/i);
  expect(memoElement).toBeInTheDocument();
});

test('新規メモ投稿でPOSTリクエストが発火され、新しいメモが表示される', async () => {
  // 初回のGETリクエスト
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    headers: { get: () => 'application/json' },
    json: async () => []
  });
  await act(async () => {
    render(<Page />);
  });
  
  // 入力フォームに値を入力 (state更新は act でラップ)
  const input = screen.getByPlaceholderText(/enter memo/i);
  await act(async () => {
    fireEvent.change(input, { target: { value: 'New memo' } });
  });

  // POSTリクエスト用のモック（投稿時）
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' },
  });
  // 再度GETリクエスト用のモック（投稿後の再取得）
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    headers: { get: () => 'application/json' },
    json: async () => [{ id: 2, content: 'New memo' }]
  });

  const button = screen.getByRole('button', { name: /post memo/i });
  fireEvent.click(button);

  // 新しいメモが表示されるのを確認
  await waitFor(() => {
    expect(screen.getByText(/new memo/i)).toBeInTheDocument();
  });
});
