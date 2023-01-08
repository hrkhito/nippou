import Link from 'next/link'
import React from 'react'

const Owner = () => {
  return (
    <div>
      <Link href="/loginUser/">登録済ユーザーにログインする</Link>
      <br />
      <Link href="/createUser/">新規ユーザーとして作成する</Link>
      <br />
      <Link href="/">topへ</Link>
    </div>
  )
}

export default Owner