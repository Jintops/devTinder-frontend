import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed=useSelector(store=>store.feed)
  const dispatch=useDispatch();

  const getFeed=async()=>{
      try{
        const res=await axios.get(BASE_URL+"/feed",{withCredentials:true})
        dispatch(addFeed(res?.data?.data))
      }catch(err){
        console.error(err)
      }
  }
  useEffect(()=>{
  getFeed();
  },[])

  if(!feed) return;
  if(feed.length===0) return <h1 className='text-center text-3xl my-10 font-bold'>No New User found!!</h1>
  return (
  feed &&   
    <div className='flex justify-center my-20'>
      <UserCard data={feed[0]}/>
     
    </div>
  )
}

export default Feed
