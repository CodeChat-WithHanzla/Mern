import { useEffect, useRef, useState } from "react"
import images from "./images"
function Canvas() {
    const canvasRef = useRef()
    const [index, setIndex] = useState({ value: 0 })
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const img = new Image
        img.src = images[0]
        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
        }
        console.log(images);
    }, [])
    return (
        <canvas id="canvas" ref={canvasRef} className="w-[18rem] h-[18rem]"></canvas>
    )
}

export default Canvas