import { setupAPIClient } from '../services/api'
import { withSSAuth } from '../utils/withSSRAuth'

import styles from '../styles/Home.module.css'

export default function Metrics() {
  return (
    <div className={styles.container}>
      <h1>Metrics</h1>
    </div>
  )
}

export const getServerSideProps = withSSAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
})