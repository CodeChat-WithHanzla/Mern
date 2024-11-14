import { useEffect, useRef, useState, useId } from "react"
import images from "./images"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
function Canvas({ details }) {
    const id = useId()
    const canvasRef = useRef()
    const { startIndex, numImages, duration, size, top, left, zIndex } = details
    const [index, setIndex] = useState({ value: startIndex })
    useGSAP(() => {
        gsap.to(index, {
            value: startIndex + numImages - 1,
            duration: duration,
            repeat: -1,
            ease: "linear",
            onUpdate: () => {
                setIndex({ value: Math.round(index.value) });
            },
        });
        gsap.from(canvasRef.current, {
            opacity: 0,
            scale: 0.3,
            duration: 1,
            ease: "power2.inOut"
        })
    });


    useEffect(() => {
        const scale = window.devicePixelRatio
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const img = new Image
        img.src = images[index.value]
        img.onload = () => {
            canvas.width = canvas.offsetWidth * scale
            canvas.height = canvas.offsetHeight * scale
            canvas.style.width = canvas.offsetWidth + "px"
            canvas.style.height = canvas.offsetHeight + "px"
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        }
    }, [index])
    return (
        <canvas data-scroll data-scroll-speed={(Math.random()).toFixed(2)} className="absolute" key={id} ref={canvasRef} style={{ width: `${size * 1.8}px`, height: `${size * 1.8}px`, top: `${top}%`, left: `${left}%`, zIndex: `${zIndex}` }}></canvas>
    )
}

export default Canvas