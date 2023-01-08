import Link from 'next/link'
import React from 'react'

const Guest = () => {
  return (
    <div>
      <Link href="/login/">ログイン</Link>
      <br />
      <Link href="/">topへ</Link>
    </div>
  )
}

export default Guest