import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false)

  useEffect(() => {
    verifyPremiumUser()
  }, [])

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", { withCredentials: true })
      if (res.data.isPremium) {
        setIsUserPremium(true)
      }
    } catch (err) {
      console.error("Premium verify error:", err)
    }
  }

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(BASE_URL + "/payment/create", { membershipType: type }, { withCredentials: true })

      const { amount, currency, keyId, notes, orderId } = order.data

      const options = {
        key: keyId,
        amount,
        currency,
        name: "devTinder",
        description: 'Connect with awesome developers',
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#6366f1'
        },
        handler: verifyPremiumUser,
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error("Payment error:", err)
    }
  }

  if (isUserPremium) {
    return (
      <div className='flex items-center justify-center   text-white font-bold text-3xl'>
        🎉 You are already a <span className='text-yellow-400 ml-2'>Premium User</span> 🚀
      </div>
    )
  }

  return (
    <div className=" text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Upgrade to <span className="text-yellow-400">Premium</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* Silver Membership */}
        <div className="backdrop-blur-md bg-white/10 border border-blue-700 rounded-2xl p-8 shadow-lg hover:scale-[1.02] transition-transform">
          <h2 className="text-3xl font-semibold text-center text-blue-300 mb-4">Silver Membership</h2>
          <p className="text-center text-gray-300 mb-6">₹199/month</p>
          <ul className="space-y-3 text-sm text-gray-200">
            <li>💬 Chat with other developers</li>
            <li>⚡ 100 connection requests/day</li>
            <li>🔵 Blue tick on profile</li>
          </ul>
          <div className="mt-6 flex justify-center">
            <button onClick={() => handleBuyClick("silver")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition">Buy Silver</button>
          </div>
        </div>

        {/* Gold Membership */}
        <div className="backdrop-blur-md bg-white/10 border border-yellow-400 rounded-2xl p-8 shadow-lg hover:scale-[1.02] transition-transform">
          <h2 className="text-3xl font-semibold text-center text-yellow-300 mb-4">Gold Membership</h2>
          <p className="text-center text-gray-300 mb-6">₹499/month</p>
          <ul className="space-y-3 text-sm text-gray-200">
            <li>💬 Chat with other developers</li>
            <li>🚀 300 connection requests/day</li>
            <li>🔵 Blue tick on profile</li>
          </ul>
          <div className="mt-6 flex justify-center">
            <button onClick={() => handleBuyClick("gold")} className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-semibold transition">Buy Gold</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Premium
