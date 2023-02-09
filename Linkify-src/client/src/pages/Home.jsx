import React from 'react'
import { Helmet } from 'react-helmet'

function Home() {
  return (
    <div>
      <Helmet>
            <meta charSet='utf-8' />
            <title>Linkify</title>
        </Helmet>
      <h1>This is home page.</h1>
    </div>
  )
}

export default Home
