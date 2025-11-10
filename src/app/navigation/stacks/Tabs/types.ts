import * as Stacks from '..'
import { EStacks } from '..'
import { TNavigatorScreenParams } from '../../types'

export type TTabsStack = {
  [EStacks.Generation]: TNavigatorScreenParams<Stacks.TGenerationStack>
  [EStacks.Filters]: TNavigatorScreenParams<Stacks.TFiltersStack>
  [EStacks.Gallery]: TNavigatorScreenParams<Stacks.TGalleryStack>
}
