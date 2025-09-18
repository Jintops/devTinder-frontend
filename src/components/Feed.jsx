import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector(store => store.feed)
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
      dispatch(addFeed(res?.data?.data))
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    getFeed();
  }, [])

  if (!feed) return;
  if (feed.length === 0) return (
    <div className="text-center">
                    <h2 className="sm:text-3xl text-2xl my-10 font-bold text-neutral-content">No New Users Found!</h2>
                    <img
                        loading="lazy"
                        src="/public/asset/empty-feed.svg"
                        alt="user-not-found"
                        className="block mx-auto w-96 mt-20"
                    />
                </div>
  )
   
  return (
    feed &&
    <div className='flex justify-center items-center my-16 lg:my-40'>
      <UserCard data={feed[0]} />
     
    </div>
  )
}

export default Feed
