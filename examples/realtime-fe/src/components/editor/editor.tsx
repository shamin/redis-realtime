import React from 'react'
import { Editor, EditorState, RichUtils, DraftBlockType } from 'draft-js'
import { Box } from '@chakra-ui/react'
import { BlockControls, InlineControls } from './controls'

interface RichTextEditorProps {
  editorState: EditorState
  onChange: (v: EditorState) => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  editorState,
  onChange,
}: RichTextEditorProps) => {
  const onToggleBlock = (type: DraftBlockType) => {
    onChange(RichUtils.toggleBlockType(editorState, type))
  }

  const onToggleInline = (type: DraftBlockType) => {
    onChange(RichUtils.toggleInlineStyle(editorState, type))
  }

  return (
    <Box>
      <BlockControls editorState={editorState} onToggle={onToggleBlock} />
      <InlineControls editorState={editorState} onToggle={onToggleInline} />
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder="Type something here"
      />
    </Box>
  )
}

export default RichTextEditor
