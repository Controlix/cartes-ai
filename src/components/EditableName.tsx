'use client'

import React, { useState } from 'react'

interface EditableNameProps {
  defaultName: string
  onNameChange: (newName: string) => void
  className?: string
}

const EditableName: React.FC<EditableNameProps> = ({
  defaultName,
  onNameChange,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(defaultName)

  const handleBlur = () => {
    setIsEditing(false)
    onNameChange(name)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      onNameChange(name)
    }
  }

  if (isEditing) {
    return (
      <input
        type="text"
        className={`bg-transparent border-b-2 border-blue-500 outline-none px-1 ${className}`}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    )
  }

  return (
    <span
      className={`cursor-pointer hover:bg-gray-100 rounded px-1 transition-colors ${className}`}
      onClick={() => setIsEditing(true)}
      data-testid="editable-name"
    >
      {name}
    </span>
  )
}

export default EditableName
