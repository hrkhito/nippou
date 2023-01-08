import { ChakraProvider } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {

  return (
    <ChakraProvider>
      <Link href="/owner/">オーナーとして入室する</Link>
      <br />
      <Link href="/guestLogin/">ゲストとして入室する</Link>
    </ChakraProvider>
  )
}

export default Home
