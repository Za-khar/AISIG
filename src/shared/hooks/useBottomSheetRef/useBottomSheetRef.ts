import { useImperativeHandle, useRef } from 'react'

import { TBottomSheetModalRef } from '@/shared/ui/bottomSheet/Modal'

export const useBottomSheetRef = (
  ref?: React.ForwardedRef<TBottomSheetModalRef>,
  actions?: { onOpen?: () => void; onClose?: () => void },
) => {
  const bottomSheetRef = useRef<TBottomSheetModalRef>(null)

  useImperativeHandle(ref, () => ({
    open: () => {
      actions?.onOpen?.()
      bottomSheetRef.current?.open()
    },
    close: () => {
      actions?.onClose?.()
      bottomSheetRef.current?.close()
    },
  }))

  return bottomSheetRef
}
