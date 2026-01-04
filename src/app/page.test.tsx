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

})