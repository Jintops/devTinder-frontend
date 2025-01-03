import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'

const Feed = () => {

  const getFeed=async()=>{
      try{
        const res=await axios.get(BASE_URL+"/feed",{withCredentials:true})
   
      }catch(err){
        console.error(err)
      }
  }
  useEffect(()=>{
  getFeed();
  },[])
  return (

    
    <div>
      feed page
    </div>
  )
}

export default Feed
