import { useRef, useState } from 'react'

import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { Dirs, FileSystem } from 'react-native-file-access'
import { launchImageLibrary } from 'react-native-image-picker'

import { AIService, ImageCloudService } from '../../services'
import { useAIStore } from '../../store'

import { arrayBufferToBase64 } from './tools'

export const usePostTextToImage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>('')
  const [image, setImage] = useState<string | null>(null)

  const failedCount = useRef(0)

  const { filter } = useAIStore()

  const generate = async () => {
    setLoading(true)
    console.log('image: ', image)
    const imageToUpload = await uploadImageToCloud(image || '')

    const params = {
      seed: new Date().getTime(),
      prompt,
      nologo: true,
      private: true,
      ...(imageToUpload ? { image: imageToUpload } : {}),
      ...filter,
      safe: false,
      model: 'kontext',
    }

    console.log('params: ', params)
    try {
      const { data: generationData } = await AIService.postTextToImage(params)

      const imgBase64 = arrayBufferToBase64(generationData)

      setLoading(false)
      failedCount.current = 0

      console.log('imgBase64: ', `data:image/png;base64,${imgBase64}`)

      console.log('success')
      return {
        image: `data:image/png;base64,${imgBase64}`,
        options: params,
      }
    } catch (e) {
      console.log('error: ', e?.response)
      if (failedCount.current < 5) {
        failedCount.current += 1
        return generate()
      }

      failedCount.current = 0

      setLoading(false)
      return null
    }
  }

  const saveBase64Image = async (imgBase64: string) => {
    try {
      // Remove the data:image/png;base64, prefix if present
      const base64Data = imgBase64.replace(/^data:image\/\w+;base64,/, '')

      // Create file path
      const filePath = `${Dirs.CacheDir}/${Date.now()}.png`

      // Write base64 to file
      await FileSystem.writeFile(filePath, base64Data, 'base64')

      // Save to camera roll
      await CameraRoll.saveAsset(filePath, { type: 'photo' })

      // Clean up temporary file
      await FileSystem.unlink(filePath)

      console.log('Image saved successfully!')
    } catch (error) {
      console.error('Error saving image:', error)
    }
  }

  const uploadImageToCloud = async (base64: string) => {
    if (!base64) {
      return null
    }

    try {
      const formData = new FormData()

      formData.append('image', base64.split('base64,')[1])

      const { data } = await ImageCloudService.postUploadImage({
        formData,
        expiration: 600,
      })

      return data.data.url
    } catch (e) {
      console.log('uploadImageToCloud: ', e)
      return null
    }
  }

  const pickImage = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        maxHeight: 1000,
        maxWidth: 1000,
        presentationStyle: 'pageSheet',
        selectionLimit: 1,
        includeBase64: true,
      })
      console.log('res: ', res)
      if (res?.assets?.[0]?.base64) {
        setImage(`data:${res.assets[0].type};base64,${res.assets[0].base64}`)
      }
    } catch (e) {
      console.log(e)
    }
  }
  return {
    prompt,
    setPrompt,
    generate,
    image,
    pickImage,
    loading,
  }
}
