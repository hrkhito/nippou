import { Box, Flex, Button, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Owner = () => {
  return (
    <Box
      bg="purple.50"
      w="100%"
      h='calc(100vh)'
      textAlign="center"
      pt="48"
    >
      <Text fontWeight="bold" mb="16">
        既にアカウントをお持ちでしたらログインへ、アカウントをお持ちでなければ新規作成へとお進みください
      </Text>
      <Flex justifyContent="center" mb="16">
        <Button bg="purple.400" color="white" mr="8">
          <Link href="/loginUser/">登録済ユーザーにログインする</Link>
        </Button>
        <Button bg="purple.400" color="white">
          <Link href="/createUser/">新規ユーザーとして作成する</Link>
        </Button>
      </Flex>
      <Button>
        <Link href="/">topへ</Link>
      </Button>
    </Box>
  )
}

export default Owner