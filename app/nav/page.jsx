'use client'
import React from 'react'
import "@/app/src/nav.css"

const nav = () => {
  return (
    <>
    <header className='container'>
      <div className='title'>
        <a href='/'>Eva Fresh</a>
      </div>
      <li className='lists'>
        <a className='links' href='/dashboard'>Dashboard</a>
        <a className='links' href='/products'>Products</a>
        <a className='links' href='/contact'>Contact</a>
        <a className='link' href='/search'>Search</a>
        <a className='link' href='/cart'>Cart</a>
      </li>
    </header>
    </>
  )
}

export default nav