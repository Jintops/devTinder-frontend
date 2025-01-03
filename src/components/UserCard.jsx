import React from 'react'

const UserCard = ({data}) => {
    const {firstName,lastName,photoUrl,age,gender,about}=data;
  return (
    <div>
      <div className="card bg-base-300 w-80 shadow-xl">
  <figure className=' mx-20 my-5'>
    <img 
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+lastName}</h2>
    <p>{about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary">Ignored</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard