/**
 * @description button class
 * @author wangfupeng
 */

import { IButtonMenu } from '../../interface'
import BaseButton from './BaseButton'

class ToolbarItemButton extends BaseButton {
  constructor(menu: IButtonMenu) {
    super(menu)
  }
  onClick() {
    // menu.exec 已经在 BaseButton 实现了
    // 所以，此处不用做任何逻辑
  }
}

export default ToolbarItemButton