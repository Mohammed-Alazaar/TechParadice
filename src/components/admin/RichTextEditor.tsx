'use client'

import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const TINYMCE_API_KEY = 'mtjy6djndp0eitzxztgrpeyb5j51l2d31765itt3gj45jl8c'

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  dir?: 'ltr' | 'rtl'
  placeholder?: string
  minHeight?: number
}

export function RichTextEditor({
  value,
  onChange,
  dir = 'ltr',
  placeholder,
  minHeight = 400,
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null)

  return (
    <Editor
      apiKey={TINYMCE_API_KEY}
      onInit={(_evt: any, editor: any) => { editorRef.current = editor }}
      value={value}
      onEditorChange={(content: string) => onChange(content)}
      init={{
        height: minHeight,
        menubar: false,
        directionality: dir,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'charmap',
          'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'table', 'wordcount',
        ],
        toolbar:
          'undo redo | blocks | bold italic underline | ' +
          'bullist numlist | link | alignleft aligncenter alignright | ' +
          'ltr rtl | code fullscreen | removeformat',
        block_formats: 'Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4',
        skin: 'oxide-dark',
        content_css: 'dark',
        content_style: `
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 15px;
            line-height: 1.7;
            background: #1A1A1A;
            color: rgba(255,255,255,0.85);
            padding: 16px 20px;
            direction: ${dir};
          }
          h2, h3, h4 { color: #fff; font-weight: 700; margin: 1.5em 0 0.5em; }
          p { margin: 0 0 1em; }
          a { color: #5EEAD4; }
          ul, ol { padding-${dir === 'rtl' ? 'right' : 'left'}: 1.5em; }
        `,
        placeholder,
        resize: true,
        statusbar: true,
      }}
    />
  )
}
