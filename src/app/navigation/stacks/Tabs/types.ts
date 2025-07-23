import * as Stacks from '../../stacks'
import { EStacks } from '../../stacks'
import { TNavigatorScreenParams } from '../../types'

export type TTabsStack = {
  [EStacks.Generation]: TNavigatorScreenParams<Stacks.TGenerationStack>
  [EStacks.Filters]: TNavigatorScreenParams<Stacks.TFiltersStack>
  [EStacks.Gallery]: TNavigatorScreenParams<Stacks.TGalleryStack>
}
