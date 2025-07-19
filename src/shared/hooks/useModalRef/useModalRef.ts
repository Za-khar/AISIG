import { useImperativeHandle, useRef } from 'react'

import { TBaseModalRef } from '@/shared/ui/modal/Base'

export const useModalRef = (ref?: React.ForwardedRef<TBaseModalRef>) => {
  const modalRef = useRef<TBaseModalRef>(null)

  useImperativeHandle(ref, () => ({
    open: () => {
      modalRef.current?.open()
    },
    close: () => {
      modalRef.current?.close()
    },
  }))

  return modalRef
}
