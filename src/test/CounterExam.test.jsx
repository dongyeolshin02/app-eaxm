import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import CounterExam from '../exam/CounterExam';

describe('CounterExam', () => {
    
  it('초기 렌더링: 제목/초기값/버튼이 보인다', () => {
    render(<CounterExam />);
    expect(screen.getByRole('heading', { name: /카운터 예제/i })).toBeInTheDocument();
    expect(screen.getByText('결과 : 0')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '증가하기' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '감소하기' })).toBeInTheDocument();
  });

  it('증가하기 버튼 클릭 시 1씩 올라간다', async () => {
    const user = userEvent.setup();
    render(<CounterExam />);

    const inc = screen.getByRole('button', { name: '증가하기' });
    await user.click(inc);
    expect(screen.getByText('결과 : 1')).toBeInTheDocument();

    await user.click(inc);
    expect(screen.getByText('결과 : 2')).toBeInTheDocument();
  });

  it('감소하기 버튼 클릭 시 1씩 내려간다', async () => {
    const user = userEvent.setup();
    render(<CounterExam />);

    const dec = screen.getByRole('button', { name: '감소하기' });
    await user.click(dec);
    expect(screen.getByText('결과 : -1')).toBeInTheDocument();

    await user.click(dec);
    expect(screen.getByText('결과 : -2')).toBeInTheDocument();
  });

  it('증가 후 감소하면 원래 값으로 돌아온다', async () => {
    const user = userEvent.setup();
    render(<CounterExam />);

    const inc = screen.getByRole('button', { name: '증가하기' });
    const dec = screen.getByRole('button', { name: '감소하기' });

    await user.click(inc); // 0 -> 1
    await user.click(dec); // 1 -> 0

    expect(screen.getByText('결과 : 0')).toBeInTheDocument();
  });
});
