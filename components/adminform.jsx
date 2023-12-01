'use client'
import React from 'react'
import Nav from '@/app/nav/page'
import { useState,useEffect } from 'react'
import axios from 'axios'
import "@/app/src/admin.css"

const Adminform = () => {
  const [name,setName] = useState('')
  const [loading,setLoading] = useState('')
  const [description,setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [error,setError] = useState('')
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      setLoading(true)
      const res = await axios.post("http://localhost:3000/api/postProducts",{
      name,
      description,
      price
    });
    if(!res.ok){
      setError(true)
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    setLoading(false);
    }catch(error){
      setError(true)
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }
  return (
    <body>
      <Nav/>
      <br/>
      <div className='fomr-box'>
        <form onSubmit={handleSubmit}>
          <input
          value={name}
          type="name"
          required
          placeholder='name'
          onChange={(e)=>setName(e.target.value)}
          />
          <input
          value={description}
          type="text"
          required
          placeholder='description'
          onChange={(e)=>setDescription(e.target.value)}
          />
          <input
          value={price}
          type="price"
          required
          placeholder='price'
          onChange={(e)=>setPrice(e.target.value)}
          />
          <button type='submit' disabled={loading}>
          {loading && (<p>Loading...</p>)}
          {!loading && (<p>Post</p>)}
          </button>
        </form>
      </div>
    </body>
  )
}

export default Adminform