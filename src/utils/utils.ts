import type { Employee } from '@/types/employee'

export const setUsersToLC = (empList: Employee[]) => {
  localStorage.setItem('users', JSON.stringify(empList))
}
export const getUsersFromLC = (): Employee[] => {
  return JSON.parse(localStorage.getItem('users') ?? '[]')
}
