import { configureStore } from '@reduxjs/toolkit'
import { employeeReducer } from '@/features/employee/employee.slice'

export const store = configureStore({
  reducer: {
    employee: employeeReducer
  }
})

type AppStore = typeof store

export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
