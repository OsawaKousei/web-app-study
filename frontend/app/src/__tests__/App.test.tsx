import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// コンポーネントのimportパスを修正
import Page from '../app/page';

global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

test('タイトル "Memo App" がレンダリングされる', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { name: /memo app/i })).toBeInTheDocument();
});

test('マウント時にGETリクエストでメモ一覧が取得されレンダリングされる', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => [{ id: 1, content: 'Test memo' }]
  });
  render(<Page />);
  const memoElement = await screen.findByText((content) => content.includes('Test memo'));
  expect(memoElement).toBeInTheDocument();
});

test('新規メモ投稿でPOSTリクエストが発火され、新しいメモが表示される', async () => {
  // 初回のGETリクエスト
  (fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => []
  });
  render(<Page />);
  
  // 入力フォームへ値を入力
  const input = screen.getByPlaceholderText(/enter memo/i);
  fireEvent.change(input, { target: { value: 'New memo' } });

  // POSTリクエスト用のモック（投稿時）
  (fetch as jest.Mock).mockResolvedValueOnce({
    status: 200
  });
  // 再度GETリクエスト用のモック（投稿後の再取得）
  (fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => [{ id: 2, content: 'New memo' }]
  });

  const button = screen.getByRole('button', { name: /post memo/i });
  fireEvent.click(button);

  // 新しいメモが表示されるのを確認
  await waitFor(() => {
    expect(screen.getByText(/new memo/i)).toBeInTheDocument();
  });
});
