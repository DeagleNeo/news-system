import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewsEditor(props) {

    const [editorState, setEditorState] = useState('')

    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(editorState) => setEditorState(editorState)}
            onBlur={() => {
                // 富文本内容转换为 html
                const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                props.getContent(content)
            }}
        />
    )
}
