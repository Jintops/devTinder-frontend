import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'

const Premium = () => {


    const handleBuyClick=async(type)=>{
     try{

     
       const order =await axios.post(BASE_URL+"/payment/create",{membershipType:type},{withCredentials:true})  
    
   
      const {amount,currency,keyId,notes,orderId}=order.data

 const options = {
        key:keyId, 
        amount,
        currency,
        name:"devTinder",
        description: 'connect to other developerss',
        order_id: orderId,
        prefill: {
          name: notes.firstName + notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

   const rzp = new window.Razorpay(options);
      rzp.open();
    }catch(err){
        console.log(err);
    }
    }
  return (
    <div className='m-5'>
      <div className="flex flex-col lg:flex-row w-full gap-5 items-center justify-center">
        {/* Silver Membership */}
        <div className="card bg-gradient-to-b from-slate-400 to-gray-600 rounded-box h-auto p-6 w-full lg:w-1/2">
          <h1 className='font-bold text-3xl text-white text-center mb-4'>Silver Membership</h1>
          <ul className='text-white space-y-2'>
            <li>* Chat with other people</li>
            <li>* 100 connection requests per day</li>
            <li>* Blue tick</li>
          </ul>
          <div className='mt-4 flex justify-center'>
            <button onClick={()=>handleBuyClick("silver")} className='btn btn-primary'>Buy Silver</button>
          </div>
        </div>

        {/* Divider only visible on large screens */}
        <div className="divider lg:divider-horizontal hidden lg:flex">OR</div>

        {/* Gold Membership */}
        <div className="card bg-gradient-to-b from-orange-300 to-amber-300 rounded-box h-auto p-6 w-full lg:w-1/2">
          <h1 className='font-bold text-3xl text-white text-center mb-4'>Gold Membership</h1>
          <ul className='text-white space-y-2'>
            <li>* Chat with other people</li>
            <li>* 300 connection requests per day</li>
            <li>* Blue tick</li>
          </ul>
          <div className='mt-4 flex justify-center'>
            <button onClick={()=>handleBuyClick("gold")} className='btn btn-secondary'>Buy Gold</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Premium
