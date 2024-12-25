import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingforDriver from '../components/LookingforDriver'
import WaitingforDriver from '../components/WaitingforDriver'
function Home() {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [showPanel, setShowPanel] = useState(false)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const panelRef = useRef(null)
    const panelclosedRef = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const submitHandler = (e) => {
        e.preventDefault();
    }
    useGSAP(function () {
        if (showPanel) {
            gsap.to(panelRef.current, { height: '70%', padding: 20 })
            gsap.to(panelclosedRef.current, { opacity: 1 })
        }
        else {
            gsap.to(panelRef.current, { height: '0%', padding: 0 })
            gsap.to(panelclosedRef.current, { opacity: 0 })
        }
    }, [showPanel])
    useGSAP(function () {
        if (vehiclePanel) { gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)' }) }
        else { gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)' }) }
    }, [vehiclePanel])
    useGSAP(function () {
        if (confirmRidePanel) { gsap.to(confirmRidePanelRef.current, { transform: 'translateY(0)' }) }
        else { gsap.to(confirmRidePanelRef.current, { transform: 'translateY(100%)' }) }
    }, [confirmRidePanel])
    useGSAP(function () {
        if (vehicleFound) { gsap.to(vehicleFoundRef.current, { transform: 'translateY(0)' }) }
        else { gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)' }) }
    }, [vehicleFound])
    useGSAP(function () {
        if (waitingForDriver) { gsap.to(waitingForDriverRef.current, { transform: 'translateY(0)' }) }
        else { gsap.to(waitingForDriverRef.current, { transform: 'translateY(100%)' }) }
    }, [waitingForDriver])
    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 left-5 top-5 absolute' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
            <div className="h-screen w-screen">
                { /* Image for temporary home page */}
                <img className="h-screen w-screen object-cover" src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" />
            </div>
            <div className="flex flex-col justify-end absolute top-0 h-screen w-full">
                <div className="h-[30%] bg-white p-6 relative">
                    <h5 ref={panelclosedRef} onClick={() => setShowPanel(false)} className="absolute opacity-0 top-6 right-6 text-2xl">
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form onSubmit={submitHandler}>
                        <div className="absolute w-1 h-16 top-[45%] left-10 bg-gray-900 rounded-full"></div>
                        <input onClick={() => setShowPanel(true)} value={pickup} onChange={(e) => setPickup(e.target.value)} className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
                        <input onClick={() => setShowPanel(true)} value={destination} onChange={(e) => setDestination(e.target.value)} className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
                    </form>
                </div>
                <div ref={panelRef} className={`h-0 bg-white`}>
                    <LocationSearchPanel setShowPanel={setShowPanel} setVehiclePanel={setVehiclePanel} />
                </div>
            </div>
            <div ref={vehiclePanelRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 w-full">
                <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>
            <div ref={confirmRidePanelRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 w-full">
                <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 w-full">
                <LookingforDriver setVehicleFound={setVehicleFound} />
            </div>
            <div ref={waitingForDriverRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 w-full">
                <WaitingforDriver waitingForDriver={waitingForDriver} />
            </div>
        </div>
    )
}

export default Home