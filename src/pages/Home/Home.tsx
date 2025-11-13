import { deleteUser } from '@/features/employee/employee.slice'
import type { AppState } from '@/store'
import type { Employee } from '@/types/employee'
import { Button, Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
interface TableData extends Employee {
  key: React.Key
}
export default function Home() {
  const employees = useSelector((state: AppState) => state.employee.employeeList)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data: TableData[] = useMemo(
    () =>
      employees.map((employee) => ({
        key: employee.id,
        ...employee
      })),
    [employees]
  )
  const handleDelete = (id: string) => () => {
    dispatch(deleteUser(id))
  }
  const handleEdit = (id: string) => () => {
    navigate('add', { state: { id: id } })
  }
  const columns: ColumnsType<TableData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render(_, record) {
        return <>{dayjs(record.dateOfBirth).format('DD/MM/YYYY')}</>
      }
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter(a, b) {
        return a.address.localeCompare(b.address, undefined, { sensitivity: 'base' })
      }
    },
    {
      title: 'Action',
      key: 'action',
      render(_, record) {
        return (
          <div className='space-x-3'>
            <Button onClick={handleEdit(record.id)}>Edit</Button>
            <Button onClick={handleDelete(record.id)}>Delete</Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className='h-screen w-full bg-white/80 px-24 py-10'>
      <Table columns={columns} dataSource={data} />
      <Modal />
    </div>
  )
}
