import React from 'react'
import { EditorState, DraftBlockType } from 'draft-js'
import EditorButton from './button'
import { HStack } from '@chakra-ui/layout'

interface ControlsProps {
  editorState: EditorState
  onToggle: (style: DraftBlockType) => void
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
]

export const BlockControls: React.FC<ControlsProps> = ({
  editorState,
  onToggle,
}: ControlsProps) => {
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <HStack>
      {BLOCK_TYPES.map((type) => (
        <EditorButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </HStack>
  )
}

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

export const InlineControls: React.FC<ControlsProps> = ({
  editorState,
  onToggle,
}: ControlsProps) => {
  const currentStyle = editorState.getCurrentInlineStyle()
  return (
    <HStack>
      {INLINE_STYLES.map((type) => (
        <EditorButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </HStack>
  )
}
