import { useState } from 'react'
import { Link } from 'react-router-dom'

function ConfirmRidePopUp({ setConfirmRidePopUp, setRidePopupPanel }) {
    const [opt, setOtp] = useState('')
    const submitHandler = async (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <h5 onClick={() => setConfirmRidePopUp(false)} className='text-center absolute top-0 right-2 text-2xl w-[90%]'><i className="text-gray-300 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
            <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
                <div className='flex items-center gap-3'>
                    <img className="h-12 w-12 rounded-full object-cover" src="data:image/jpeg;base64,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" alt="" />
                    <h2 className='text-xl font-medium'>Viley Potar</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className="flex flex-col justify-between items-center gap-2">
                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-line"></i>
                        <div className="">
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab , Ahmedabad </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div className="">
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab , Ahmedabad </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="text-lg ri-money-rupee-circle-fill"></i>
                        <div className="">
                            <h3 className='text-lg font-medium'>Rs.192</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Cash</p>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5 flex justify-evenly items-center gap-2 ">
                    <div className="mt-6 w-full">
                        <form onSubmit={submitHandler}>
                            <input value={opt} onChange={(e) => setOtp(e.target.value)} type="text" placeholder='Enter OTP' className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 font-mono' />
                            <div className="flex justify-center items-center gap-3 mt-10">
                                <Link to='/captain-riding' className='flex items-center justify-center w-1/2 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</Link>
                                <button onClick={() => {
                                    setConfirmRidePopUp(false)
                                    setRidePopupPanel(false)
                                }
                                } className='w-1/2 bg-red-500 text-white font-semibold p-2 rounded-lg'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ConfirmRidePopUp