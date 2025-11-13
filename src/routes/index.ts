import { useRoutes } from 'react-router-dom'
import routes from './routes'

export default function useRoutesElement() {
  const element = useRoutes(routes)
  return element
}
