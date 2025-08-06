import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi, beforeEach, afterEach } from 'vitest'
import LoginExam from '../exam/LoginExam'

let alertMock;
beforeEach(()=>{
    alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('아이디와 비밀번호 모두 비었을 때 경고창', async () => {
  render(<LoginExam />)
  const user = userEvent.setup()
  const submit = screen.getByRole('button', { name: '로그인' })

  await user.click(submit)

  expect(alertMock).toHaveBeenCalledWith('아이디와 비밀번호를 입력하세요')
  alertMock.mockRestore()
})

test('아이디만 비었을 때 경고창', async () => {
  render(<LoginExam />)
  const user = userEvent.setup()
  const pw = screen.getByLabelText('비밀번호')
  const submit = screen.getByRole('button', { name: '로그인' })

  await user.type(pw, 'secret')
  await user.click(submit)

  expect(alertMock).toHaveBeenCalledWith('아이디를 입력하세요')
  alertMock.mockRestore()
})

test('비밀번호만 비었을 때 경고창', async () => {
  render(<LoginExam />)
  const user = userEvent.setup()
  const id = screen.getByLabelText('아이디')
  const submit = screen.getByRole('button', { name: '로그인' })

  await user.type(id, 'alice')
  await user.click(submit)

  expect(alertMock).toHaveBeenCalledWith('비밀번호를 입력하세요')
  alertMock.mockRestore()
})

test('아이디와 비밀번호 입력 시 로그인 성공 팝업', async () => {
  render(<LoginExam />)
  const user = userEvent.setup()
  const id = screen.getByLabelText('아이디')
  const pw = screen.getByLabelText('비밀번호')
  const submit = screen.getByRole('button', { name: '로그인' })

  await user.type(id, 'alice')
  await user.type(pw, 'secret')
  await user.click(submit)

  expect(alertMock).toHaveBeenCalledWith('로그인 성공: alice')
  alertMock.mockRestore()
})
