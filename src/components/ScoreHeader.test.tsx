import { render, screen } from '@testing-library/react'
import ScoreHeader from './ScoreHeader'

describe('ScoreHeader', () => {
  const mockOnChange = jest.fn()
  const mockOnReset = jest.fn()

  it('renders both team scores', () => {
    render(<ScoreHeader team1Score={100} team2Score={150} team1Name="Wij" team2Name="Zij" onTeam1NameChange={mockOnChange} onTeam2NameChange={mockOnChange} onReset={mockOnReset} />)
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument()
  })

  it('renders team labels', () => {
    render(<ScoreHeader team1Score={0} team2Score={0} team1Name="Alpha" team2Name="Beta" onTeam1NameChange={mockOnChange} onTeam2NameChange={mockOnChange} onReset={mockOnReset} />)
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  it('shows a crown icon for the leading team', () => {
    const { rerender } = render(<ScoreHeader team1Score={200} team2Score={100} team1Name="Wij" team2Name="Zij" onTeam1NameChange={mockOnChange} onTeam2NameChange={mockOnChange} onReset={mockOnReset} />)
    // Assuming we use a "👑" or similar indicator
    expect(screen.getByText('👑')).toBeInTheDocument()
    
    rerender(<ScoreHeader team1Score={100} team2Score={200} team1Name="Wij" team2Name="Zij" onTeam1NameChange={mockOnChange} onTeam2NameChange={mockOnChange} onReset={mockOnReset} />)
    expect(screen.getByText('👑')).toBeInTheDocument()
  })

  it('does not show a crown icon when scores are tied', () => {
    render(<ScoreHeader team1Score={100} team2Score={100} team1Name="Wij" team2Name="Zij" onTeam1NameChange={mockOnChange} onTeam2NameChange={mockOnChange} onReset={mockOnReset} />)
    expect(screen.queryByText('👑')).not.toBeInTheDocument()
  })

  it('renders reset button', () => {
    render(<ScoreHeader team1Score={0} team2Score={0} team1Name="Wij" team2Name="Zij" onTeam1NameChange={mockOnChange} onTeam2NameChange={mockOnChange} onReset={mockOnReset} />)
    expect(screen.getByRole('button', { name: /Nieuw Spel/i })).toBeInTheDocument()
  })
})
