// src/validations/regex.ts
export const ValidationRegex = {
  number: /^(0|[1-9]\d*)$/,
  float: /^\d+(\.\d*)?$|^\.\d+$/,
  username: /^[a-zA-Z0-9_.]+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,}/,
} as const
