export const SHOW_SUCCESS = 'SHOW_SUCCESS'
export const SHOW_ERROR = 'SHOW_ERROR'
export const MARK_AS_SHOWED = 'MARK_AS_SHOWED'
export const DISMISS = 'DISMISS'

export interface INotification {
  key: string
  message: string
  type: string
  isShown: boolean
}

interface IState {
  notifications: INotification[]
}

type IAction =
  | { type: 'SHOW_SUCCESS'; payload: { key: string; message: string } }
  | { type: 'SHOW_ERROR'; payload: { key: string; message: string } }
  | { type: 'MARK_AS_SHOWED'; payload: string }
  | { type: 'DISMISS'; payload: string }

export const initialStates: IState = {
  notifications: [],
}

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case SHOW_SUCCESS:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.payload.key,
            message: action.payload.message,
            type: 'success',
            isShown: false,
          },
        ],
      }
    case SHOW_ERROR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.payload.key,
            message: action.payload.message,
            type: 'error',
            isShown: false,
          },
        ],
      }
    case MARK_AS_SHOWED:
      return {
        ...state,
        notifications: state.notifications.map(
          (notification: INotification) => {
            if (notification.key === action.payload) {
              return {
                ...notification,
                isShown: true,
              }
            }
            return notification
          },
        ),
      }
    case DISMISS:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification: INotification) => notification.key !== action.payload,
        ),
      }
    default:
      return state
  }
}

export default reducer
