import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/api'
import styles from '../styles/Home.module.css'

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me').then(response => console.log(response))
  }, [])

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
    </div>
  )
}