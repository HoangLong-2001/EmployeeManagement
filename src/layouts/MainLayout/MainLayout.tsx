import { setUsers } from '@/features/employee/employee.slice'
import { getUsersFromLC } from '@/utils/utils'
import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { useEffect, type ReactNode } from 'react'
import type React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

interface Props {
  children?: ReactNode
}
const headerStyle: React.CSSProperties = {
  background: '#fff',
  height: 60,
  paddingInline: '2rem'
}

export default function MainLayout({ children }: Props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setUsers(getUsersFromLC()))
  }, [dispatch])
  return (
    <div>
      <Layout>
        <Header style={headerStyle}>
          <nav>
            <ul className='flex gap-5'>
              <li>
                <NavLink to={'/'} className={({ isActive }) => (isActive ? 'border-b-2 border-b-gray-600 pb-3' : '')}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/add'}
                  className={({ isActive }) => (isActive ? 'border-b-2 border-b-gray-600 pb-3' : '')}
                >
                  Edit
                </NavLink>
              </li>
            </ul>
          </nav>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </div>
  )
}
