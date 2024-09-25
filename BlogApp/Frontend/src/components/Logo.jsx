import React from 'react'
import { Link } from 'react-router-dom'

function Logo({ className = '' }) {
    return (
        <Link to='/' className={`${className} sm:text-xl font-semibold dark:text-white`}>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Hanzla's</span>
            Blog
        </Link>
    )
}

export default Logo