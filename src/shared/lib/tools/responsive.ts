// src/utils/responsive.ts
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

/**
 * Responsive screen utilities
 */
export const Responsive = {
  /** Convert width percentage to pixels */
  wp,
  /** Convert height percentage to pixels */
  hp,

  /**
   * Calculate proportional height based on original dimensions
   * @param newWidth - Target width to calculate proportional height for
   * @param originalWidth - Original reference width (default 170)
   * @param originalHeight - Original reference height (default 228)
   */
  proportionalHeight: (
    newWidth: number,
    originalWidth = 170,
    originalHeight = 228,
  ) => (originalHeight / originalWidth) * newWidth,
}
