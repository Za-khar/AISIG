import { useState } from 'react'

import { AIService, ImageCloudService } from '../../services'
import { useAIStore } from '../../store'

export const usePostTextToImage = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [image, setImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  const { filter } = useAIStore()

  const generate = async () => {
    try {
      const { data: generationData } = await AIService.postTextToImage({
        seed: new Date().getTime(),
        prompt,
        nologo: true,
        private: true,
        image: image || undefined,
        safe: true,
        ...filter,
      })
      console.log('generationData: ', generationData)

      const arr = new Uint8Array(generationData)
      let base64 = ''
      for (let i = 0; i < arr.length; i++) {
        base64 += String.fromCharCode(arr[i])
      }

      const imgBase64 = `data:image/jpeg;base64,${btoa(base64)}`
      // console.log('imgBase64: ', imgBase64)

      setImage(imgBase64)

      const rawBase64 = btoa(base64) // Just the base64 data
    } catch (e) {
      console.log(e?.response)
    }
  }

  const uploadImageToCloud = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        presentationStyle: 'pageSheet',
        selectionLimit: 1,
        includeBase64: true,
      })
      const formData = new FormData()
      formData.append('image', res?.assets?.[0]?.base64 || '')

      const { data } = await ImageCloudService.postUploadImage({
        formData,
        expiration: 600,
      })

      await generate(data?.data?.url)
    } catch (e) {
      console.log(e)
    }
  }
  return {
    prompt,
    setPrompt,
    generate,
  }
}
