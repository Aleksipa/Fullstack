import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Todo from '../Todo'

describe('Todo', () => {
  const mockTodo = {
    text: 'Test todo',
    done: false
  }

  it('renders todo text and status correctly', () => {
    render(<Todo todo={mockTodo} onDelete={() => {}} onComplete={() => {}} />)
    
    expect(screen.getByText('Test todo')).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
  })
}) 