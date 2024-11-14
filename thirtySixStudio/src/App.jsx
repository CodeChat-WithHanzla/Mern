import { useEffect, useState, useRef } from 'react';
import Canvas from './Canvas';
import data from './data';
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
export default function App() {
  const [showCanvas, setShowCanvas] = useState(false)
  const [details, setDetails] = useState({
    color: "#fff", background: "#000"
  })
  const headingRef = useRef()
  const growingRef = useRef()
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    headingRef.current.addEventListener("click", (e) => {
      setShowCanvas(!showCanvas)
    })
    if (!showCanvas) setDetails({ color: "#000", background: "#fd2c2a" })
    else setDetails({
      color: "#fff", background: "#000"
    })
    return () => {
      locomotiveScroll.destroy();
    };
  }, [showCanvas]);
  useEffect(() => {
    const handleClick = (e) => {
      gsap.set(growingRef.current, {
        top: e.clientY,
        left: e.clientX
      })
      gsap.to("body", {
        backgroundColor: details.background,
        color: details.color,
        duration: 0.5,
        ease: "power2.inOut"
      })
      gsap.to(growingRef.current, {
        scale: 1000,
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(growingRef.current, {
            scale: 0,
            clearProps: "all"
          })
        }
      })
    }
    headingRef.current.addEventListener("click", handleClick)
    return () => {
      headingRef.current.removeEventListener("click", handleClick);
    };
  }, [details])
  return (
    <>
      <span ref={growingRef} className='growing block fixed top-[-20px] left-[-20px] w-5 h-5 rounded-full'></span>
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
        {showCanvas &&
          data[0].map((canvasdets, index) => (
            <Canvas key={index} details={canvasdets} />
          ))}
        <div className="w-full relative z-[1] h-screen">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">HanzlaStudios</div>
            <div className="links flex gap-10">
              {['What we do', 'Who we are', 'How we give back', 'Talk to us'].map(
                (link, index) => (
                  <a
                    key={index}
                    href={`#${link.toLowerCase()}`}
                    className="text-md hover:text-gray-300"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </nav>
          <div className="textcontainer w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-4xl leading-[1.2]">
                At HanzlaStudios, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className='text-md mt-10'>Scroll</p>
            </div>
          </div>
          <div className="w-full absolute left-0 bottom-0">
            <h1 className='text-[17rem] font-normal tracking-tighter leading-none pl-5' ref={headingRef}>HanzlaStudios</h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-full mt-32 px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => (
            <Canvas key={index} details={canvasdets} />
          ))}
        <div className="relative z-[1]">
          <h1 className='text-4xl tracking-tighter'>01 --- About the brand</h1>
          <p className='text-4xl leading-[1.8] w-[80%] mt-10 font-ligt'>We aim to revolutionize digital production in the advertising space, bringing your ideas to life.</p>
        </div>
        <img
          className="w-[100%] mt-10 rounded"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
      </div>
    </>
  );
}
