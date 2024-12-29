import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center my-20'>
      <div className="card bg-base-300 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login </h2>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
          </label>

          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
