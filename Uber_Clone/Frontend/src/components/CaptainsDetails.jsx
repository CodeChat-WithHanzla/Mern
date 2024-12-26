import React from 'react'

function CaptainsDetails() {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3">
                    <img className='h-10 w-10 rounded-full object-cover' src="data:image/jpeg;base64,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" alt="" />
                    <h4 className='text-lg font-medium'>Jony Perry</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>Rs. 1,295</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className="flex justify-center gap-5 items-start p-3 bg-gray-100 rounded-xl mt-6">
                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-booklet-fill"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
            </div>
        </>
    )
}

export default CaptainsDetails