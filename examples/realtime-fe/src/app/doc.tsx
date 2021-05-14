import { Container } from '@chakra-ui/layout'
import { css } from '@emotion/react'
import { useRealtime } from '@shamin/redis-realtime-client'
import React, { useEffect } from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'

interface DocProps {}

const Doc: React.FC<DocProps> = (props: DocProps) => {
  const { publisher, subscribe } = useRealtime()
  const { setDb } = publisher('list')
  const content = subscribe('list')

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
          setDb(convertToRaw(v.getCurrentContent()))
        }}
        placeholder="Type something here"
      />
    </Container>
  )
}

export default Doc
