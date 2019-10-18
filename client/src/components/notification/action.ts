import { SHOW_SUCCESS, SHOW_ERROR, DISMISS, MARK_AS_SHOWED } from './reducer'

const generateKey = () => Math.random().toString(36).substring(7)

export const showSuccess = (message: string) => ({
    type: SHOW_SUCCESS,
    payload: {
      key: generateKey(),
      message,
    },
})

export const showError = (message: string) => ({
    type: SHOW_ERROR,
    payload: {
      key: generateKey(),
      message,
    },
})

export const dismiss = (key: string) => ({
  type: DISMISS,
  payload: key,
})

export const markAsShowed = (key: string) => ({
  type: MARK_AS_SHOWED,
  payload: key,
})
