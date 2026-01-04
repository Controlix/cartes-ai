import { render, screen } from '@testing-library/react'
import GameHistory from './GameHistory'
import { Round } from '@/types/Round'

describe('GameHistory Component', () => {
  const mockRounds: Round[] = [
    { id: '1', number: 1, team1Score: 100, team2Score: 62 },
    { id: '2', number: 2, team1Score: 81, team2Score: 81 },
  ]

  it('renders empty state when no rounds are provided', () => {
    render(<GameHistory rounds={[]} />)
    expect(screen.getByText(/Nog geen rondes gespeeld/i)).toBeInTheDocument()
  })

  it('renders a list of rounds correctly', () => {
    render(<GameHistory rounds={mockRounds} />)
    
    // Check for headers
    expect(screen.getByText(/Ronde/i)).toBeInTheDocument()
    
    // Check for round 1 scores
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('62')).toBeInTheDocument()
    
    // Check for round 2 scores
    expect(screen.getAllByText('81')).toHaveLength(2)
  })

  it('renders custom team names in the header', () => {
    render(<GameHistory rounds={mockRounds} team1Name="Alpha" team2Name="Beta" />)
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  // Removed text check for icons as they are visual only now
  it('renders the correct number of rows', () => {
    render(<GameHistory rounds={mockRounds} />)
    const rows = screen.getAllByTestId('round-row')
    expect(rows).toHaveLength(2)
  })
})
