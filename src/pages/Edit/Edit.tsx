import { addUser, editUser } from '@/features/employee/employee.slice'
import type { AppState } from '@/store'
import type { Employee } from '@/types/employee'
import { Button, DatePicker, Form, Input, Radio } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
type FormData = Omit<Employee, 'id' | 'dateOfBirth'> & { dateOfBirth: Dayjs }
export default function Edit() {
  const [form] = Form.useForm<FormData>()
  const dispatch = useDispatch()
  const employees = useSelector((state: AppState) => state.employee.employeeList)
  const id: string = useLocation()?.state?.id
  const employeeEdit = useMemo(() => employees.find((emp) => emp.id === id), [employees, id])
  const navigate = useNavigate()
  useEffect(() => {
    if (employeeEdit) {
      form.setFieldsValue({
        name: employeeEdit.name,
        address: employeeEdit.address,
        dateOfBirth: dayjs(employeeEdit.dateOfBirth),
        gender: employeeEdit.gender,
        email: employeeEdit.email
      })
    }
  }, [employeeEdit, form])
  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])
  const handleSubmit = (values: FormData) => {
    const formatted = {
      ...values,
      dateOfBirth: values.dateOfBirth.toISOString()
    }
    if (employeeEdit) {
      dispatch(editUser({ id, ...formatted }))
    } else {
      dispatch(addUser(formatted))
    }

    navigate('/')
  }
  return (
    <div className='flex h-screen w-full items-center justify-center bg-white'>
      <div className='w-1/3 rounded-xl border border-gray-500 p-6 backdrop-blur-xl'>
        <Form form={form} layout='horizontal' labelCol={{ span: 6 }} onFinish={handleSubmit}>
          <Form.Item name={'name'} label='Name' required>
            <Input required />
          </Form.Item>
          <Form.Item name={'email'} label='Email' required>
            <Input required />
          </Form.Item>
          <Form.Item name={'gender'} label='Gender' required>
            <Radio.Group value={'male'}>
              <Radio value={'male'}>Male</Radio>
              <Radio value={'female'}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={'address'} label='Address' required>
            <Input required />
          </Form.Item>
          <Form.Item name={'dateOfBirth'} label='Date of birth' required>
            <DatePicker format={'DD/MM/YYYY'} />
          </Form.Item>
          <Form.Item className='text-center'>
            <Button type='primary' htmlType='submit' className='uppercase' size='large'>
              Submit
            </Button>
            <Button htmlType='reset' className='ml-6 uppercase' size='large'>
              reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
