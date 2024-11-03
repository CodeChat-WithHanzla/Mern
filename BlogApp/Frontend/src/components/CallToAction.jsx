import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
            <div className="flex-1 flex justify-center flex-col">
                <h2 className='text-2xl'>
                    Want to learn More about JavaScript?
                </h2>
                <p className='text-gray-500 my-2'>
                    Checkout these resources
                </p>
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target='_blank' rel='noopener noreferrer'>
                    <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                        Learn More
                    </Button>
                </a>
            </div>
            <div className="p-7 flex-1">
                <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
            </div>
        </div>
    )
}

export default CallToAction