export const getTranslationKey = (count: number, baseKey: string) => {
  let key = 'key_other'

  if (count === 0) {
    key = 'key_zero'
  } else if (count === 1) {
    key = 'key_one'
  } else if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    key = 'key_few'
  } else if (
    count % 10 === 0 ||
    (count % 10 >= 5 && count % 10 <= 9) ||
    (count % 100 >= 11 && count % 100 <= 19)
  ) {
    key = 'key_many'
  }

  return `${baseKey}.` + key
}
