import React, { useEffect } from 'react'
import { Container } from '@chakra-ui/layout'
import { css } from '@emotion/react'
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
} from 'draft-js'
import Editor from './editor'
import 'draft-js/dist/Draft.css'

interface DocProps {
  content: RawDraftContentState
  onChange: (content: RawDraftContentState) => void
}

const DocEditor: React.FC<DocProps> = ({ content, onChange }: DocProps) => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  )

  useEffect(() => {
    if (content) {
      if (
        JSON.stringify(content) !==
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      ) {
        setEditorState(EditorState.createWithContent(convertFromRaw(content)))
      }
    }
  }, [content])

  console.log(editorState)

  return (
    <Container
      css={css`
        .editor-wrapper {
          background-color: white;
          min-height: 500px;
        }
      `}
    >
      <Editor
        editorState={editorState}
        onChange={(v) => {
          setEditorState(v)
          onChange(convertToRaw(v.getCurrentContent()))
        }}
      />
    </Container>
  )
}

export default DocEditor
