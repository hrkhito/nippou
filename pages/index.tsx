import { ChakraProvider } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {

  return (
    <ChakraProvider>
      <Link href="/login/">ログイン</Link>
      <br />
      <Link href="/createNippou">新規作成</Link>
    </ChakraProvider>
  )
}

export default Home
