import React, { useEffect } from 'react'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  return (
    <Editor
      editorState={editorState}
      onChange={(v) => {
        setEditorState(v)
        onChange(convertToRaw(v.getCurrentContent()))
      }}
    />
  )
}

export default DocEditor
