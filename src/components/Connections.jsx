import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'

const Connections = () => {
  
    const connections=async()=>{
        try{
           const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
           console.log(res.data.data)
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        connections();
    },[])

  return (
    <div>
      Connections
    </div>
  )
}

export default Connections
