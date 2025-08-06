import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, it } from 'vitest'
import HobbiesExam from '../exam/HobbiesEXam'

it('영화와 산책을 선택 후 확인 시 결과 표시', async () => {
  render(<HobbiesExam />)
  const user = userEvent.setup()

  await user.click(screen.getByLabelText('영화'))
  await user.click(screen.getByLabelText('산책'))
  await user.click(screen.getByRole('button', { name: '확인' }))

  expect(screen.getByTestId('result')).toHaveTextContent('영화, 산책')
})

it('선택 없이 확인 시 "선택 없음" 표시', async () => {
  render(<HobbiesExam />)
  const user = userEvent.setup()

  await user.click(screen.getByRole('button', { name: '확인' }))

  expect(screen.getByTestId('result')).toHaveTextContent('선택 없음')
})
