import React from 'react'
import CallToAction from '../components/CallToAction'
import HeroSlider from '../components/HeroSlider'
import About from '../components/About'
import Stats from '../components/Stats'
function Home() {
  return (
    <div>
        <HeroSlider/>
        <CallToAction/>
        <About/>
        <Stats/>
        


    </div>
  )
}

export default Home