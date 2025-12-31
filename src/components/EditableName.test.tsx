import { render, screen, fireEvent } from '@testing-library/react'
import EditableName from './EditableName'

describe('EditableName', () => {
  it('renders default name', () => {
    render(<EditableName defaultName="Wij" onNameChange={() => {}} />)
    expect(screen.getByText('Wij')).toBeInTheDocument()
  })

  it('switches to input when clicked', () => {
    render(<EditableName defaultName="Wij" onNameChange={() => {}} />)
    fireEvent.click(screen.getByText('Wij'))
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('Wij')
  })

  it('calls onNameChange and switches back to text on blur', () => {
    const handleChange = jest.fn()
    render(<EditableName defaultName="Wij" onNameChange={handleChange} />)
    
    fireEvent.click(screen.getByText('Wij'))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Team Alpha' } })
    fireEvent.blur(input)
    
    expect(handleChange).toHaveBeenCalledWith('Team Alpha')
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.getByText('Team Alpha')).toBeInTheDocument()
  })
})
