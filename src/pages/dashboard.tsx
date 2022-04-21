import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/apiClient'
import { withSSAuth } from '../utils/withSSRAuth'

import styles from '../styles/Home.module.css'
import { setupAPIClient } from '../services/api'

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
    </div>
  )
}

export const getServerSideProps = withSSAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
})