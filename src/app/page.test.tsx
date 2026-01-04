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

    // Now check the GameHistory header (it should also show "Alpha")
    // The history header is inside the main section, let's find it by text
    // Since there are multiple "Alpha" strings (Header, Form, History), we verify it exists in history area
        const history = screen.getByText('Alpha', { selector: '.grid-cols-3 .text-center' })
        expect(history).toBeInTheDocument()
      })
    
      it('completes a round with Belot and shows updated scores and icon', () => {
        render(<Home />)
        
        // 1. Enter Scores: 100 for Team 1, 62 for Team 2
        const inputs = screen.getAllByRole('spinbutton')
        fireEvent.change(inputs[0], { target: { value: '100' } })
        fireEvent.change(inputs[1], { target: { value: '62' } })
        
        // 2. Select Belot for Team 1
        const belotButtons = screen.getAllByText(/BELOT/i)
        fireEvent.click(belotButtons[0]) // Team 1 Belot
        
        // 3. Submit
        fireEvent.click(screen.getByRole('button', { name: /Ronde Opslaan/i }))
        
        // 4. Verify Total Score (100 card points + 20 Belot = 120)
        // The ScoreHeader displays the total
        const header = screen.getByRole('banner')
        expect(within(header).getByText('120')).toBeInTheDocument()
        expect(within(header).getByText('62')).toBeInTheDocument()
        
        // 5. Verify History Entry
        const historyRow = screen.getByTestId('round-row')
        expect(within(historyRow).getByText('120')).toBeInTheDocument()
        // Check for Belot icon (Crown) - lucide-react renders as svg
        expect(historyRow.querySelector('svg')).toBeInTheDocument()
      })
    })
    