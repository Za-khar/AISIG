import React from 'react'

import { useAIStore } from '@/entities/ai/store'

import { Background } from '@/shared/ui/background'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

export const FilterDetail = () => {
  const { filter } = useAIStore()

  return (
    <Background.Container>
      <Button.Standard label="Generate" />

      <Input.DropDown />
    </Background.Container>
  )
}
