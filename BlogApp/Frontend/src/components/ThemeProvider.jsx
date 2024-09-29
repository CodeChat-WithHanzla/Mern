import React from 'react'
import { useSelector } from 'react-redux'
function ThemeProvider({ childern }) {
    const mode = useSelector(state => state.theme.mode)
    return (
        <div className={mode}>
            <div className={`min-h-screen bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] ${mode}`}>{childern}</div>
        </div>
    )
}

export default ThemeProvider