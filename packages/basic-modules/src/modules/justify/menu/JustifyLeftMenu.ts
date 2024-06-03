/**
 * @description justify left menu
 * @author wangfupeng
 */

import { Transforms, Editor, Element } from 'slate'
import { IDomEditor, DomEditor, t } from '@wangeditor-next/core'
import BaseMenu from './BaseMenu'
import { JUSTIFY_LEFT_SVG } from '../../../constants/icon-svg'

class JustifyLeftMenu extends BaseMenu {
  readonly title = t('justify.left')
  readonly iconSvg = JUSTIFY_LEFT_SVG

  exec(editor: IDomEditor, value: string | boolean): void {
    const { selection } = editor
    console.log('selection', selection)
    const tables = Editor.nodes(editor, {
      at: selection,
      match: n => {
        const type = DomEditor.getNodeType(n)
        return type === 'table'
      },
    })
    Transforms.setNodes(
      editor,
      {
        textAlign: 'left',
      },
      { match: n => Element.isElement(n) && !editor.isInline(n) }
    )
  }
}

export default JustifyLeftMenu
