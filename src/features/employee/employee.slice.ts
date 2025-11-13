import { type Employee } from '@/types/employee'
import { setUsersToLC } from '@/utils/utils'
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

interface EmployeeState {
  employeeList: Employee[]
}
const initialState: EmployeeState = {
  employeeList: []
}
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Employee[]>) => {
      state.employeeList = action.payload
    },
    addUser: {
      reducer: (state, action: PayloadAction<Employee>) => {
        state.employeeList.push(action.payload)
        setUsersToLC(state.employeeList)
      },
      prepare: (post: Omit<Employee, 'id'>) => ({
        payload: {
          ...post,
          id: nanoid()
        }
      })
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.employeeList = state.employeeList.filter((emp) => emp.id !== id)
      setUsersToLC(state.employeeList)
    },
    editUser: (state, action: PayloadAction<Employee>) => {
      const id = action.payload.id
      const index = state.employeeList.findIndex((emp) => emp.id === id)
      state.employeeList[index] = action.payload
      setUsersToLC(state.employeeList)
    }
  }
})

export const employeeReducer = employeeSlice.reducer
export const { addUser, deleteUser, editUser, setUsers } = employeeSlice.actions
