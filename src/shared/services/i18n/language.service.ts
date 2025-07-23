import i18next from 'i18next'

import { ELanguages } from '@/app/i18n'
import { storage } from '@/app/store'

export class Language {
  private static KEY = 'language'

  public static DEFAULT_LANGUAGE = ELanguages.en

  private static async getStorageLanguage() {
    return storage.getString(this.KEY)
  }

  // Get app language
  static async getLanguage(): Promise<ELanguages> {
    const localLangauge = await this.getStorageLanguage()

    // If local storage lang set
    if (localLangauge) {
      return localLangauge as ELanguages
    }

    return this.DEFAULT_LANGUAGE
  }

  //Set lang
  static async setLanguage(lang: ELanguages) {
    i18next.changeLanguage(lang)

    return storage.set(this.KEY, lang)
  }
}
