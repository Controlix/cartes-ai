import { render, screen, within } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Home from './page'

describe('Home Page Integration', () => {

  it('renders score header and taker selection with default team names', () => {
    render(<Home />)
    const header = screen.getByRole('banner')
    expect(within(header).getByText('Wij')).toBeInTheDocument()
    expect(within(header).getByText('Zij')).toBeInTheDocument()

    const form = screen.getByRole('form')
    expect(within(form).getByText('Wij')).toBeInTheDocument()
    expect(within(form).getByText('Zij')).toBeInTheDocument()
  })

  it('updates header name when name is edited', async () => {
    render(<Home />)
    
    // Find the first editable name in the header
    const editableNames = screen.getAllByTestId('editable-name')
    const wijSpan = editableNames[0]

    fireEvent.click(wijSpan)
    const input = await screen.findByDisplayValue('Wij')
    
    fireEvent.change(input, { target: { value: 'Alpha' } })
    fireEvent.blur(input)
    
    // Now "Alpha" should be the visible text in header and form
    const header = screen.getByRole('banner')
    expect(within(header).getByText('Alpha')).toBeInTheDocument()
    
    const form = screen.getByRole('form')
    expect(within(form).getByText('Alpha')).toBeInTheDocument()
  })

  it('updates total score when a valid non-litige round is submitted', async () => {
    render(<Home />)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '100' } })
    fireEvent.change(inputs[1], { target: { value: '62' } })
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

    const header = screen.getByRole('banner')
    expect(await within(header).findByText('100')).toBeInTheDocument()
    expect(await within(header).findByText('62')).toBeInTheDocument()
  })

  it('handles Litige scenario correctly and awards reserve on next round', async () => {
    render(<Home />)
    const inputs = screen.getAllByRole('spinbutton')
    
    // --- Round 1: Litige ---
    fireEvent.change(inputs[0], { target: { value: '81' } })
    fireEvent.change(inputs[1], { target: { value: '81' } })
    
    // Select Taker: Team 2 ("Zij")
    const form = screen.getByRole('form')
    const takerLabelZij = within(form).getByText('Zij', { selector: 'span' })
    fireEvent.click(takerLabelZij)

    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

    // Verify Reserve Display
    const reserve = await screen.findByText(/Reserve: 81 punten/i)
    expect(reserve).toBeInTheDocument()

    // Verify Totals in Header (Team 1 is defender and gets points, Team 2 is taker and gets 0)
    const header = screen.getByRole('banner')
    expect(await within(header).findByText('81')).toBeInTheDocument()
    expect(await within(header).findByText('0')).toBeInTheDocument()

    // --- Round 2: Normal, winner takes reserve ---
    fireEvent.change(inputs[0], { target: { value: '100' } })
    fireEvent.change(inputs[1], { target: { value: '62' } })
    // Taker is now Team 1
    const takerLabelWij = within(form).getByText('Wij', { selector: 'span' })
    fireEvent.click(takerLabelWij)

    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    
    // Verify Final Totals
    // Team 1: 81 (round 1) + 100 (round 2) + 81 (reserve) = 262
    expect(await within(header).findByText('262')).toBeInTheDocument()
    // Team 2: 0 (round 1) + 62 (round 2) = 62
    expect(await within(header).findByText('62')).toBeInTheDocument()
    
    // Reserve should be gone
    expect(screen.queryByText(/Reserve:/i)).not.toBeInTheDocument()
  })

  it('auto-detects Capot (162 -> 252)', async () => {
    render(<Home />)
    const inputs = screen.getAllByRole('spinbutton')
    
    // Team 1 gets 162, should be 252
    fireEvent.change(inputs[0], { target: { value: '162' } })
    fireEvent.change(inputs[1], { target: { value: '0' } })
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

    const header = screen.getByRole('banner')
    expect(await within(header).findByText('252')).toBeInTheDocument()
    expect(await within(header).findByText('0')).toBeInTheDocument()
  })

  it('auto-detects Dedans (Taker fails to reach 82)', async () => {
    render(<Home />)
    const inputs = screen.getAllByRole('spinbutton')
    
    // Team 1 is taker but gets 80, Team 2 gets 82
    // Team 1 should get 0, Team 2 should get 162
    fireEvent.change(inputs[0], { target: { value: '80' } })
    fireEvent.change(inputs[1], { target: { value: '82' } })
    
    const form = screen.getByRole('form')
    const takerLabelWij = within(form).getByText('Wij', { selector: 'span' })
    fireEvent.click(takerLabelWij)

    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

    const header = screen.getByRole('banner')
    expect(await within(header).findByText('0')).toBeInTheDocument()
    expect(await within(header).findByText('162')).toBeInTheDocument()
  })

  it('preserves Capot indicator when reserve is added', async () => {
    render(<Home />)
    const inputs = screen.getAllByRole('spinbutton')
    
    // 1. Litige (81 reserve)
    fireEvent.change(inputs[0], { target: { value: '81' } })
    fireEvent.change(inputs[1], { target: { value: '81' } })
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

    // 2. Capot (162 points + 81 reserve = 333)
    fireEvent.change(inputs[0], { target: { value: '162' } })
    fireEvent.change(inputs[1], { target: { value: '0' } })
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

    const rows = await screen.findAllByTestId('round-row')
    expect(rows).toHaveLength(2)
    expect(within(rows[1]).getByText('252')).toBeInTheDocument()
    expect(within(rows[1]).getByText('+81')).toBeInTheDocument()
  })

  it('handles win with 1-point lead at target score', async () => {
    render(<Home />)
    const inputs = screen.getAllByRole('spinbutton')
    
    // Team 1 reaches 1008 (4 Capots * 252)
    for (let i = 0; i < 4; i++) {
      fireEvent.change(inputs[0], { target: { value: '162' } })
      fireEvent.change(inputs[1], { target: { value: '0' } })
      fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    }

    // Team 2 scores some points but less than 1008
    fireEvent.change(inputs[0], { target: { value: '0' } })
    fireEvent.change(inputs[1], { target: { value: '162' } }) // 252 for Team 2
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

    expect(await screen.findByText(/Spel Afgelopen/i)).toBeInTheDocument()
    expect(screen.getByText(/Winnaar:.*Wij/i)).toBeInTheDocument()
  })

})