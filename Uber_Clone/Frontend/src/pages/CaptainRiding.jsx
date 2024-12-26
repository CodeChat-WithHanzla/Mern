import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'

function CaptainRiding() {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    useGSAP(function () {
        if (finishRidePanel) { gsap.to(finishRidePanelRef.current, { transform: 'translateY(0)' }) }
        else { gsap.to(finishRidePanelRef.current, { transform: 'translateY(100%)' }) }
    }, [finishRidePanel])
    return (
        <div className='h-screen'>
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img className='w-16' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
                <Link to='/captain-home' className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-4/5">
                <img className="h-full w-full object-cover" src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" />
            </div>
            <div onClick={() => setFinishRidePanel(true)} className="h-1/5 p-6 flex items-center relative justify-between bg-yellow-400">
                <h5 className='text-center absolute top-0 right-2 text-2xl w-full'><i className="ri-arrow-up-wide-line"></i>
                </h5>
                <h4 className='text-xl font-semibold'>4 KM Away</h4>
                <button className=' bg-green-600 text-white font-semibold p-2 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className="h-screen fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>
    )
}

export default CaptainRiding