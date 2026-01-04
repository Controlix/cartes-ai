import { render, screen, fireEvent } from '@testing-library/react'
import RoundInputForm from './RoundInputForm'

describe('RoundInputForm Logic', () => {
  const mockSubmit = jest.fn()

  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('submits when sum is 162 with default taker', () => {
    render(<RoundInputForm onSubmit={mockSubmit} />)
    
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '100' } })
    fireEvent.change(inputs[1], { target: { value: '62' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    
    expect(mockSubmit).toHaveBeenCalledWith(100, 62, 'team1', undefined)
  })

  it('allows selecting a different taker', () => {
    render(<RoundInputForm onSubmit={mockSubmit} team1Name="Team A" team2Name="Team B" />)
    
    fireEvent.click(screen.getByText('Team B'))
    
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '100' } })
    fireEvent.change(inputs[1], { target: { value: '62' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    
    expect(mockSubmit).toHaveBeenCalledWith(100, 62, 'team2', undefined)
  })

  it('allows selecting Belot for a team', () => {
    render(<RoundInputForm onSubmit={mockSubmit} />)
    
    const belotButtons = screen.getAllByText(/BELOT/i)
    fireEvent.click(belotButtons[0]) // Team 1 Belot
    
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '100' } })
    fireEvent.change(inputs[1], { target: { value: '62' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    
    expect(mockSubmit).toHaveBeenCalledWith(100, 62, 'team1', 'team1')
  })

  it('does not submit when sum is incorrect', () => {
    render(<RoundInputForm onSubmit={mockSubmit} />)
    
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '100' } })
    fireEvent.change(inputs[1], { target: { value: '100' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('clears inputs after successful submit', () => {
    render(<RoundInputForm onSubmit={mockSubmit} />)
    
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '81' } })
    fireEvent.change(inputs[1], { target: { value: '81' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    
    expect(inputs[0]).toHaveValue(null)
    expect(inputs[1]).toHaveValue(null)
  })
})