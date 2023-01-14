import React from 'react'
import Link from 'next/link'
import { Box, Text, Flex, Button } from '@chakra-ui/react'

const afterUserLogin = () => {
  return (
    <Box
      bg="purple.50"
      w="100%"
      h='calc(100vh)'
      textAlign="center"
      pt="48"
    >
      <Text fontWeight="bold" mb="16">
        既に日報を管理されていましたら既存日報にログインへ、管理している日報をお持ちでなければ日報の新規作成へとお進みください
      </Text>
      <Flex justifyContent="center" mb="16">
        <Button bg="purple.400" color="white" mr="8">
          <Link href="/createNippou/">日報の新規作成</Link>
        </Button>
        <Button bg="purple.400" color="white">
          <Link href="/login/">既存日報にログイン</Link>
        </Button>
      </Flex>
      <Button>
        <Link href="/">topへ</Link>
      </Button>
    </Box>
  )
}

export default afterUserLogin