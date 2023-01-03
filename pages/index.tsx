import { ChakraProvider } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {

  return (
    <ChakraProvider>
      <Link href="/nippou/date">トップへ</Link>
    </ChakraProvider>
  )
}

export default Home
