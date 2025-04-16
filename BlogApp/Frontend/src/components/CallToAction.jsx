import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function CallToAction({ isProject }) {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
            <div className="flex-1 flex justify-center flex-col">
                <h2 className='text-2xl'>
                    Interested in learning more? Explore my latest posts.
                </h2>
                <p className='text-gray-500 my-2'>
                    Explore my latest posts.
                </p>
                {!isProject && <Link to='/search'>
                    <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                        Learn More
                    </Button>
                </Link>}
                {
                    isProject && (
                        <a
                            href="https://github.com/CodeChat-WithHanzla"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none">
                                Learn More
                            </Button>
                        </a>
                    )
                }
            </div>
            <div className="p-7 flex-1">
                <img className='w-96 h-96 object-cover' src="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=600" />
            </div>
        </div>
    )
}

export default CallToAction