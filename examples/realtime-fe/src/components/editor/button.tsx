import { Button } from '@chakra-ui/button'
import React from 'react'

interface EditorButtonProps {
  label: string
  style: string
  active?: boolean
  onToggle: (style: string) => void
}

const EditorButton: React.FC<EditorButtonProps> = ({
  label,
  active = false,
  style,
  onToggle,
}: EditorButtonProps) => {
  return (
    <Button
      color={active ? 'red' : 'blue'}
      onClick={() => {
        onToggle(style)
      }}
    >
      {label}
    </Button>
  )
}

export default EditorButton
