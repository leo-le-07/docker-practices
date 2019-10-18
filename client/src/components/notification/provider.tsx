import React, { createContext, useReducer } from 'react'
import { SnackbarProvider } from 'notistack'

import reducer, { initialStates } from './reducer'

const NotificationContext = createContext<any>(initialStates)

const NotificationProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialStates)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {props.children}
      </SnackbarProvider>
    </NotificationContext.Provider>
  )
}


export { NotificationProvider, NotificationContext }
