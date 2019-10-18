import { useEffect, useContext } from 'react'
import { useSnackbar, VariantType } from 'notistack'

import { INotification } from './reducer'
import { NotificationContext } from './provider'
import { dismiss, markAsShowed } from './action'

const getVariantType = (type: string): VariantType => {
  switch (type) {
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    default:
      return 'default'
  }
}

const Notification = (): any => {
  const { enqueueSnackbar } = useSnackbar()

  const { state, dispatch } = useContext(NotificationContext)

  const keys = state.notifications.map((item: INotification) => item.key).join('-')
  useEffect(() => {
    const { notifications } = state

    notifications
      .filter((notification: INotification) => !notification.isShown)
      .forEach((notification: INotification) => {
        const { key } = notification
        const options = {
          key: notification.key,
          variant: getVariantType(notification.type),
          onClose: (event: any, reason: any) => {
            dispatch(dismiss(key))
          },
        }

        enqueueSnackbar(
          notification.message,
          options,
        )
        dispatch(markAsShowed(key))
      })
  }, [keys, dispatch, state, enqueueSnackbar])

  return null
}

export default Notification
