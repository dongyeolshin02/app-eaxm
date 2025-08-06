import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi, it, afterEach, beforeEach } from 'vitest'
import TodoList from '../exam/TodoList'

let alertMock;
beforeEach(()=>{
    alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('할 일을 입력하고 추가 버튼 클릭 시 화면에 해당 텍스트가 표시된다', async () => {
  render(<TodoList />)
  const user = userEvent.setup()

  const input = screen.getByLabelText('할 일')
  const button = screen.getByRole('button', { name: '추가' })

  await user.type(input, 'React 공부')
  await user.click(button)

  expect(screen.getByText('React 공부')).toBeInTheDocument()
})

it('입력 없이 추가 버튼 클릭 시 경고창 발생', async () => {
  render(<TodoList />)
  const user = userEvent.setup()
  const button = screen.getByRole('button', { name: '추가' })

 

  await user.click(button)

  expect(alertMock).toHaveBeenCalledWith('할일을 입력')
  alertMock.mockRestore()
})
