import * as Stacks from '../../stacks'
import { EStacks } from '../../stacks'
import { TNavigatorScreenParams } from '../../types'

export type TTabsStack = {
  [EStacks.Home]: TNavigatorScreenParams<Stacks.THomeStack>
  [EStacks.Profile]: TNavigatorScreenParams<Stacks.TProfileStack>
}
