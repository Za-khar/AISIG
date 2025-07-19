/**
 *
 * @param data props that will be in form data
 * @param imageProps array of props name that include images
 * @returns generate form data
 */
export const generateFormData = (
  data: Object,
  imageProps?: Array<string>,
  mimeType?: string,
): FormData | Object => {
  const formData = new FormData()

  Object.entries(data).forEach(([prop, value]) => {
    if (value === undefined) {
      return
    }

    if (value === '') {
      return
    }

    if (value === null) {
      formData.append(prop, 'null')
      return
    }

    const mime = mimeType || 'image'

    if (value.includes('/')) {
      // If prop has images
      if (imageProps?.includes(prop)) {
        // image prop has array of images
        if (Array.isArray(value)) {
          value.forEach(image => {
            formData.append(prop, {
              uri: image,
              name: image?.split('/')?.[image?.split('/')?.length - 1],
              type: `${mime}/${image?.split('.').pop()}`,
            })
          })

          return
        }

        formData.append(prop, {
          uri: value,
          name: value?.split('/')?.[value?.split('/')?.length - 1],
          type: `${mime}/${value?.split('.').pop()}`,
        })

        return
      }
    }

    // if simple type object or array of objects
    if (typeof value === 'object' || Array.isArray(value)) {
      if (!value.length) {
        return
      }

      // image prop has array of images
      if (Array.isArray(value)) {
        if (imageProps?.includes(prop)) {
          value.forEach(image => {
            formData.append(prop, {
              uri: image,
              name: image?.split('/')?.[image?.split('/')?.length - 1],
              type: `image/${image?.split('.').pop()}`,
            })
          })

          return
        }

        value.forEach(item => {
          formData.append(prop + '[]', item)
        })

        return
      }

      formData.append(prop, JSON.stringify(value))
      return
    }

    formData.append(prop, value)
  })

  return formData
}
