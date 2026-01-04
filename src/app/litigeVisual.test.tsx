import { render, screen, within } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Home from './page'

describe('Litige Visual Improvement', () => {
  it('displays contested points in brackets for the taker during a litige', async () => {
    render(<Home />)
    const inputs = screen.getAllByRole('spinbutton')
    const form = screen.getByRole('form')

    // 1. Play a Litige round (81-81, T1 preneur)
    fireEvent.change(inputs[0], { target: { value: '81' } })
    fireEvent.change(inputs[1], { target: { value: '81' } })
    fireEvent.click(within(form).getByText('Wij', { selector: 'span' }))
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

    // 2. Verify History row
    const rows = await screen.findAllByTestId('round-row')
    expect(rows).toHaveLength(1)
    
    const row = rows[0]
    // T1 column should show "0 (81)"
    expect(within(row).getByText('0')).toBeInTheDocument()
    expect(within(row).getByText('(81)')).toBeInTheDocument()
    
    // T2 column should show "81" (without brackets)
    expect(within(row).getByText('81')).toBeInTheDocument()
  })
})
