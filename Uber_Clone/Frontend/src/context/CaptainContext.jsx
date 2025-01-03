import { createContext, useState } from 'react'
export const CaptainDataContext = createContext()
function CaptainContext({ children }) {
    const [captainData, setCaptainData] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        }, email: '',
        password: '',
        status: '',
        vehicle: {
            color: '',
            plate: '',
            capacity: '',
            vehicleType: ''
        },
        location: {
            lat: '',
            lng: ''
        },

    })
    return (
        <CaptainDataContext.Provider value={{ captainData, setCaptainData }}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext