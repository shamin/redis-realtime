import React from 'react'
import { Editor, EditorState, RichUtils, DraftBlockType } from 'draft-js'
import { Box } from '@chakra-ui/react'
import { BlockControls, InlineControls } from './controls'
import { css } from '@emotion/react'

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
      <Box boxShadow="xs" p="6" rounded="md" bg="white" w="100%" mb={4}>
        <BlockControls editorState={editorState} onToggle={onToggleBlock} />
        <InlineControls editorState={editorState} onToggle={onToggleInline} />
      </Box>
      <Box
        boxShadow="xs"
        p="6"
        rounded="md"
        bg="white"
        w="100%"
        css={css`
          .DraftEditor-root {
            min-height: 500px;
          }
          h1 {
            font-size: var(--chakra-fontSizes-5xl);
          }
          h2 {
            font-size: var(--chakra-fontSizes-4xl);
          }
          h3 {
            font-size: var(--chakra-fontSizes-3xl);
          }
          h4 {
            font-size: var(--chakra-fontSizes-2xl);
          }
          h5 {
            font-size: var(--chakra-fontSizes-xl);
          }
          h6 {
            font-size: var(--chakra-fontSizes-lg);
          }
        `}
      >
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder="Type something here"
        />
      </Box>
    </Box>
  )
}

export default RichTextEditor
