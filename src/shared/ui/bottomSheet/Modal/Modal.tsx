// src/components/BottomSheetModal/index.tsx
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react'
import { Keyboard } from 'react-native'

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import { createRestyleComponent } from '@shopify/restyle'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TTheme } from '@/shared/theme'

import { Theme } from '@/theme/restyleTheme'

// Types
type BottomSheetModalRef = {
  open: () => void
  close: () => void
}

type BottomSheetModalProps = {
  mode?: 'default' | 'scroll' | 'view'
  onClose?: () => void
  enableDynamicSizing?: boolean
  paddingHorizontal?: keyof Theme['spacing'] | number
  hideIndicator?: boolean
  scrollProps?: React.ComponentProps<typeof RestyleScrollView>
} & Partial<React.ComponentProps<typeof BottomSheetModal>>

// Create Restyle components
const RestyleScrollView = createRestyleComponent<
  {
    paddingHorizontal?: keyof Theme['spacing'] | number
    fff: string
  },
  TTheme
>([], BottomSheetScrollView)

const RestyleView = createRestyleComponent<
  {
    paddingHorizontal?: keyof Theme['spacing'] | number
  },
  typeof BottomSheetView
>([], BottomSheetView)

export const BottomSheet = forwardRef<
  BottomSheetModalRef,
  BottomSheetModalProps
>(
  (
    {
      children,
      snapPoints = [],
      onClose,
      enableDynamicSizing = false,
      paddingHorizontal = 'm',
      hideIndicator = false,
      scrollProps = {},
      mode,
      ...props
    },
    ref,
  ) => {
    const { bottom } = useSafeAreaInsets()
    const bottomSheetRef = useRef<BottomSheetModal>(null)

    const handleClose = useCallback(() => {
      onClose?.() || bottomSheetRef.current?.dismiss()
    }, [onClose])

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          Keyboard.dismiss()
          bottomSheetRef.current?.present()
        },
        close: handleClose,
      }),
      [handleClose],
    )

    const renderBackdrop = useCallback(
      (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
        />
      ),
      [],
    )

    const renderContent = () => {
      switch (mode) {
        case 'scroll':
          return (
            <RestyleScrollView
              paddingHorizontal={paddingHorizontal}
              bounces
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
              {...scrollProps}>
              {children}
              <Box height={bottom} width="100%" />
            </RestyleScrollView>
          )
        case 'view':
          return (
            <RestyleView paddingHorizontal={paddingHorizontal}>
              {children}
              <Box height={bottom} width="100%" />
            </RestyleView>
          )
        default:
          return children
      }
    }

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={enableDynamicSizing}
        onDismiss={handleClose}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: 'neutral_200', borderRadius: 12 }}
        handleIndicatorStyle={{
          backgroundColor: hideIndicator ? 'transparent' : 'neutral_300',
          width: 66,
          height: 6,
          marginBottom: 12,
        }}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        enableDismissOnClose
        enableContentPanningGesture
        enablePanDownToClose
        {...props}>
        {renderContent()}
      </BottomSheetModal>
    )
  },
)
