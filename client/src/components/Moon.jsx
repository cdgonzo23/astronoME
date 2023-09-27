import { useState } from 'react'
import getLunarPhase from '../utils/lunarPhase';
function MoonPhase() {
  const [ imgLink, setImgLink ] = useState("");
  const [ phase, setPhase ] = useState("")

  async function getPhase () {
    const phase = await getLunarPhase();
    // return (
    //   <div>{phase}</div>
    // )
    if (phase === "New") {
      setImgLink("../../phases/phases/new-moon.png");
      setPhase("New Moon") 
    } else if (phase === "Waxing Crescent") {
      setImgLink("../../phases/waxing-crescent.png");
      setPhase("Waxing Crescent") 
    } else if (phase === "First Quarter") {
      setImgLink("../../phases/first-quarter.png");
      setPhase("First Quarter") 
    } else if (phase === "Waxing Gibbous") {
      setImgLink("../../phases/waxing-gibbous.png");
      setPhase("Waxing Gibbous") 
    } else if (phase === "Full") {
      setImgLink("../../phases/full-moon.png");
      setPhase("Full Moon")  
    } else if (phase === "Waning Gibbous") {
      setImgLink("../../phases/waning-gibbous.png");
      setPhase("Waning Gibbous")  
    } else if (phase === "Last Quarter") {
      setImgLink("../../phases/last-quarter.png");
      setPhase("Last Quarter")  
    } else if (phase === "Waning Crescent") {
      setImgLink("../../phases/waning-crescent.png");
      setPhase("Waning Crescent") 
    }

  }
  getPhase();

  return (
      <div className='lg:w-36 lg:h-36 w-32 h-32'>
        <img src={imgLink}></img>
        <p className='my-2 text-center text-[#6e91b8]'>{phase}</p>
      </div>
  )
}

export default MoonPhase