import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const connections = useSelector(store => store.connections)

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
      dispatch(addConnections(res.data.data))

    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchConnections();
  }, [])

  if (!connections) return;

  if (connections.length === 0) return <h1 className='text-center text-3xl my-10 font-bold'>No connections found</h1>;

  return (
    <div className='h-[620px]'>
      <h1 className='text-center text-3xl my-10 font-bold'>Connections</h1>
      {
        connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div key={_id} className="border border-black bg-base-300 w-2/3 flex m-6 p-4 mx-auto ">
              <figure>
                <img className='rounded-full w-24 h-24'
                  src={photoUrl}
                  alt="photo" />
              </figure>
              <div className="mx-6">
                <h2 className="">{firstName + "  " + lastName}</h2>
                {age && <p>{age + " "}</p>}
                {gender && <p>{gender}</p>}
                <p>{about}</p>

              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Connections
