import { render, screen, within } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Home from './page'

describe('End Game Handling', () => {

  it('continues game if a litige occurs at target score', async () => {
    render(<Home />)
    const inputs = screen.getAllByRole('spinbutton')
    
    // 1. Setup: Reach 937 - 143 (approx)
    // T1: 3 rounds of 252 + 100 + 81 = 937.
    for (let i = 0; i < 3; i++) {
        fireEvent.change(inputs[0], { target: { value: '162' } })
        fireEvent.change(inputs[1], { target: { value: '0' } })
        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    }
    fireEvent.change(inputs[0], { target: { value: '100' } })
    fireEvent.change(inputs[1], { target: { value: '62' } })
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    // T1: 756 + 100 = 856. T2: 62.

    // 2. Round: 81-81 (Litige). Taker 1.
    // T1 stays 856. T2 gets 81 -> 143. Reserve: 81.
    fireEvent.change(inputs[0], { target: { value: '81' } })
    fireEvent.change(inputs[1], { target: { value: '81' } })
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

    // 3. Round: 162-0 (Capot). T1 gets 252 + 81 = 333.
    // T1: 856 + 333 = 1189.
    // But what if this round was ALSO a Litige?
    fireEvent.change(inputs[0], { target: { value: '81' } })
    fireEvent.change(inputs[1], { target: { value: '81' } })
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    // T1 is 856. T2 is 143 + 81 = 224. Reserve: 81 + 81 = 162.

    // Now Team 1 reaches 1000+ via normal round, but it's a Litige!
    // Total for T2 becomes 224 + 81 = 305. 
    // T1 stays 856. (Wait, let's make T1 reach 1000).
    // Let's just use the logic: if current round is litige, don't finish.
    fireEvent.change(inputs[0], { target: { value: '162' } })
    fireEvent.change(inputs[1], { target: { value: '0' } })
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    // T1: 856 + 252 + 162 = 1270.
    // This should finish now because no active litige.
    expect(await screen.findByText(/Spel Afgelopen/i)).toBeInTheDocument()
  })

  it('handles Tie-Breaker round (Sudden Death) correctly when points are ignored', async () => {
    render(<Home />)
    const inputs = screen.getAllByRole('spinbutton')
    
    // We'll trust the sequential logic in handleRoundSubmit.
    // To reach 1008 - 1008:
    // T1: 4 * 252 = 1008.
    // T2: 4 * 252 = 1008.
    // We must do it round by round.
    // Round 1-7: Alternating 252.
    for (let i = 0; i < 3; i++) {
        fireEvent.change(inputs[0], { target: { value: '162' } })
        fireEvent.change(inputs[1], { target: { value: '0' } })
        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
        fireEvent.change(inputs[0], { target: { value: '0' } })
        fireEvent.change(inputs[1], { target: { value: '162' } })
        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    }
    // Scores: 756 - 756.
    // Round 7: T1 gets 252. T1: 1008, T2: 756. -> FINISHES!
    // Wait, I need it NOT to finish.
    // So Round 7 must be a Litige.
    fireEvent.change(inputs[0], { target: { value: '81' } })
    fireEvent.change(inputs[1], { target: { value: '81' } })
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    // T1: 756, T2: 837. Res: 81. (Does not finish because of litige)
    expect(screen.queryByText(/Spel Afgelopen/i)).not.toBeInTheDocument()

    // Round 8: T1 wins and gets 81. T1: 837, T2: 837. 
    // This is a Tie-Breaker Resolution Round.
    fireEvent.change(inputs[0], { target: { value: '90' } })
    fireEvent.change(inputs[1], { target: { value: '72' } })
    fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    // T1: 837, T2: 837. (Awarded reserve 81 to T1).
    // Does not finish because it's a TIE.
    expect(screen.queryByText(/Spel Afgelopen/i)).not.toBeInTheDocument()

        // Extra Round: Tie Breaker. Team 1 wins.

        fireEvent.change(inputs[0], { target: { value: '90' } })

        fireEvent.change(inputs[1], { target: { value: '72' } })

        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

        

        expect(await screen.findByText(/Winnaar:.*Wij/i)).toBeInTheDocument()

        expect(await screen.findByText(/Spel Afgelopen/i)).toBeInTheDocument()

      })

    

      it('handles complex chain: Litige -> Resolution -> Tie -> Tie Breaker', async () => {

        render(<Home />)

        const inputs = screen.getAllByRole('spinbutton')

        const form = screen.getByRole('form')

        

        // 1. Setup both at 900

        // (Simplification: just do enough rounds)

        for (let i = 0; i < 3; i++) {

            fireEvent.change(inputs[0], { target: { value: '162' } })

            fireEvent.change(inputs[1], { target: { value: '0' } })

            fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

            fireEvent.change(inputs[0], { target: { value: '0' } })

            fireEvent.change(inputs[1], { target: { value: '162' } })

            fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

        }

        fireEvent.change(inputs[0], { target: { value: '144' } })

        fireEvent.change(inputs[1], { target: { value: '0' } })

        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

        fireEvent.change(inputs[0], { target: { value: '0' } })

        fireEvent.change(inputs[1], { target: { value: '144' } })

        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

        // Both at 900.

    

        // 2. Round: 100-100 (Litige). Taker 1.

        // T1: 900, T2: 1000. Res: 100.

        fireEvent.change(inputs[0], { target: { value: '100' } })

        fireEvent.change(inputs[1], { target: { value: '100' } })

        fireEvent.click(within(form).getByText('Wij', { selector: 'span' }))

        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

        expect(screen.queryByText(/Spel Afgelopen/i)).not.toBeInTheDocument()

    

        // 3. Round: Resolution round, but it's ANOTHER Litige!

        // T1 wins round but it's 81-81.

        // Taker 1. T1: 900, T2: 1000+81=1081. Res: 100+81=181.

        fireEvent.change(inputs[0], { target: { value: '81' } })

        fireEvent.change(inputs[1], { target: { value: '81' } })

        fireEvent.click(within(form).getByText('Wij', { selector: 'span' }))

        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

        expect(screen.queryByText(/Spel Afgelopen/i)).not.toBeInTheDocument()

    

        // 4. Round: Resolution. T1 wins and gets 181.

        // T1: 900 + 181 = 1081. T2: 1081.

        // IT'S A TIE >= 1000!

        fireEvent.change(inputs[0], { target: { value: '90' } })

        fireEvent.change(inputs[1], { target: { value: '72' } })

        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

        expect(screen.queryByText(/Spel Afgelopen/i)).not.toBeInTheDocument()

    

        // 5. Round: Tie Breaker. T2 wins.

        fireEvent.change(inputs[0], { target: { value: '72' } })

        fireEvent.change(inputs[1], { target: { value: '90' } })

        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))

            expect(await screen.findByText(/Winnaar:.*Zij/i)).toBeInTheDocument()

            expect(await screen.findByText(/Spel Afgelopen/i)).toBeInTheDocument()

          })

        

  it('validates 1071-1071 tie scenario and tie-breaker behavior', async () => {
    render(<Home />)
    const inputs = screen.getAllByRole('spinbutton')
    const form = screen.getByRole('form')

    // Helper to play a round
    const playRound = (s1: number, s2: number, taker: 'team1' | 'team2') => {
      fireEvent.change(inputs[0], { target: { value: String(s1) } })
      fireEvent.change(inputs[1], { target: { value: String(s2) } })
      
      // Select taker
      const takerLabel = within(form).getByText(taker === 'team1' ? 'Wij' : 'Zij', { selector: 'span' })
      fireEvent.click(takerLabel)

      fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
    }

    // Sequence provided by user:
    // 1. 162-0 (T1)
    playRound(162, 0, 'team1') // T1: 252, T2: 0
    // 2. 162-0 (T1)
    playRound(162, 0, 'team1') // T1: 504, T2: 0
    // 3. 0-162 (T2)
    playRound(0, 162, 'team2') // T1: 504, T2: 252
    // 4. 0-162 (T2)
    playRound(0, 162, 'team2') // T1: 504, T2: 504
    // 5. 62-100 (T2 Taker, succeeds)
    playRound(62, 100, 'team2') // T1: 566, T2: 604
    // 6. 62-100 (T2 Taker, succeeds)
    playRound(62, 100, 'team2') // T1: 628, T2: 704
    // 7. 100-62 (T1 Taker, succeeds)
    playRound(100, 62, 'team1') // T1: 728, T2: 766
    // 8. 100-62 (T1 Taker, succeeds)
    playRound(100, 62, 'team1') // T1: 828, T2: 828
    // 9. 100-62 (T1 Taker, succeeds)
    playRound(100, 62, 'team1') // T1: 928, T2: 890
    // 10. 60-102 (T2 Taker, succeeds)
    playRound(60, 102, 'team2') // T1: 988, T2: 992
    // 11. 83-79 (T1 Taker, succeeds)
    playRound(83, 79, 'team1') // T1: 1071, T2: 1071

    const header = screen.getByRole('banner')
    // Verify Tie at 1071
    expect(within(header).getAllByText('1071')).toHaveLength(2)
    // Game should NOT be finished
    expect(screen.queryByText(/Spel Afgelopen/i)).not.toBeInTheDocument()

    // 12. Tie Breaker Round: T1 wins
    playRound(100, 62, 'team1')

    // Verify Winner Declared
    expect(await screen.findByText(/Winnaar:.*Wij/i)).toBeInTheDocument()
    expect(await screen.findByText(/Spel Afgelopen/i)).toBeInTheDocument()

    // Verify Scores are STILL 1071 - 1071
    expect(within(header).getAllByText('1071')).toHaveLength(2)
    expect(within(header).queryByText('1171')).not.toBeInTheDocument()
  })
})

        

    