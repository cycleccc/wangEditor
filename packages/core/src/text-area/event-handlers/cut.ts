/**
 * @description 处理 cut 事件
 * @author wangfupeng
 */

import { Editor, Range, Node, Transforms } from 'slate'
import { IDomEditor } from '../../editor/interface'
import TextArea from '../TextArea'
import { hasEditableTarget } from '../helpers'
import { DomEditor } from '../../editor/dom-editor'
import isEqual from 'lodash/isEqual'

function handleOnCut(e: Event, textarea: TextArea, editor: IDomEditor) {
  const event = e as ClipboardEvent
  const { selection } = editor
  const { readOnly } = editor.getConfig()

  if (readOnly) return
  if (selection) {
    const path = selection.anchor.path
    const target = [0, 0, 0, 0]
    const [firstNode] = Editor.node(editor, [path[0]])
    if (firstNode && DomEditor.getNodeType(firstNode) === 'table' && isEqual(path, target)) {
      event.preventDefault()
      const data = event.clipboardData
      if (data == null) return
      editor.setFragmentData(data)

      Editor.deleteFragment(editor)
      Transforms.removeNodes(editor, { at: [0], mode: 'highest' })
    }
  }

  if (!hasEditableTarget(editor, event.target)) return

  event.preventDefault()

  const data = event.clipboardData
  if (data == null) return
  editor.setFragmentData(data)

  if (selection) {
    if (Range.isExpanded(selection)) {
      Editor.deleteFragment(editor)
    } else {
      const node = Node.parent(editor, selection.anchor.path)
      if (Editor.isVoid(editor, node)) {
        Transforms.delete(editor)
      }
    }
  }
}

export default handleOnCut
