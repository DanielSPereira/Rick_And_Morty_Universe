import type { NextPage } from 'next'

import { Header } from '@/components/Header'
import { Toolbar } from '@/components/Toolbar'
import { CardsList } from '@/components/CardsList'

const Home: NextPage = () => {
  return (
    <div className='App'>
      <Header />
      <Toolbar />
      <CardsList />
    </div>
  )
}

export default Home
