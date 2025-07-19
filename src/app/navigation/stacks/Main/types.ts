import { TNavigatorScreenParams } from '../../types'
import { EStacks } from '../stacks'
import { TTabsStack } from '../Tabs'

export type TMainStack = {
  [EStacks.Tabs]: TNavigatorScreenParams<TTabsStack>
}
