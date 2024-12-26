import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainsDetails from '../components/CaptainsDetails'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import 'remixicon/fonts/remixicon.css'
function CaptainHome() {
    const [ridePopupPanel, setRidePopupPanel] = useState(true)
    const [confirmRidePopupPanel, setConfirmRidePopUp] = useState(false)
    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    useGSAP(function () {
        if (ridePopupPanel) { gsap.to(ridePopupPanelRef.current, { transform: 'translateY(0)' }) }
        else { gsap.to(ridePopupPanelRef.current, { transform: 'translateY(100%)' }) }
    }, [ridePopupPanel])
    useGSAP(function () {
        if (confirmRidePopupPanel) { gsap.to(confirmRidePopupPanelRef.current, { transform: 'translateY(0)' }) }
        else { gsap.to(confirmRidePopupPanelRef.current, { transform: 'translateY(100%)' }) }
    }, [confirmRidePopupPanel])
    return (
        <div className='h-screen'>
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img className='w-16' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
                <Link to='/captain-home' className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-3/5">
                <img className="h-full w-full object-cover" src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" />
            </div>
            <div className="h-2/5 p-6">
                <CaptainsDetails />
            </div>
            <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
                <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopUp={setConfirmRidePopUp}/>
            </div>
            <div ref={confirmRidePopupPanelRef} className="h-screen fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
                <ConfirmRidePopUp setConfirmRidePopUp={setConfirmRidePopUp} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome