import './App.css'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import { Toaster, toast } from 'react-hot-toast'
import { useAuth } from '../features/auth/hook/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/auth/state/auth.slice'
import { useEffect, useRef } from 'react'


function App() {

  const { handleGetMe } = useAuth()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const userRef = useRef(user)

  useEffect(() => {
    userRef.current = user
  }, [ user ])

  // restore the logged in user (if a valid cookie exists)
  useEffect(() => {
    handleGetMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // the refresh token ran out while the app was open
  useEffect(() => {
    const onExpired = () => {
      if (!userRef.current) return

      dispatch(setUser(null))
      toast.error('Your session expired. Please log in again.')
      routes.navigate('/login')
    }

    window.addEventListener('auth:expired', onExpired)
    return () => window.removeEventListener('auth:expired', onExpired)
  }, [ dispatch ])

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: '#1c1c26', color: '#fff', border: '1px solid #2a2a36' },
        }}
      />
    </>
  )
}

export default App
