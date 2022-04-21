import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/apiClient'
import { withSSAuth } from '../utils/withSSRAuth'

import styles from '../styles/Home.module.css'
import { setupAPIClient } from '../services/api'
import { useCan } from '../hooks/useCan'
import { Can } from '../components/Can'

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  const userCanSeeMetrics = useCan({
    // permissions: ['metrics.list']
    roles: ['administrator', 'editor']
  })

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>

      { userCanSeeMetrics && <div>Métricas 1</div> }

      <Can permissions={['metrics.list']}>
        <div>Métricas 2</div>
      </Can>
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