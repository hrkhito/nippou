import React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'

const afterUserLogin = () => {
  return (
    <div>
      <Link href="/createNippou/">日報の新規作成</Link>
      <br />
      <Link href="/login/">既存日報にログイン</Link>
    </div>
  )
}

export default afterUserLogin