import React from 'react'

function LocationSearchPanel({ setShowPanel, setVehiclePanel }) {
    const locations = [
        "Sheikhupura Fort Sheikhupura, Punjab, Pakistan",
        "Lahore College for Women University (LCWU) - Shakuntala's RoomJail Road, Lahore, Punjab, Pakistan",
        "House in DHA Phase 3 Defence Housing Authority Phase 3, Lahore, Punjab, Pakistan",
        "Moti Masjid (Pearl Mosque) Inside Lahore Fort, Shahi Qila, Lahore, Punjab, Pakistan"
    ]
    return (
        <div>
            {locations.map((location, id) => (
                <div key={id} onClick={() => {
                    setVehiclePanel(true)
                    setShowPanel(false)
                }} className="flex items-center justify-start rounded-xl gap-4 my-2 border-gray-50 active:border-black border-2 p-3">
                    <h2 className="bg-[#eee] w-10 h-10 p-2 rounded-full flex justify-center">
                        <i className="ri-map-pin-fill"></i>
                    </h2>
                    <h4 className='font-medium'>{location}</h4>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel