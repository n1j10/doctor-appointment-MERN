import React from 'react'
import CallToAction from '../components/CallToAction'
import HeroSlider from '../components/HeroSlider'
import About from '../components/About'
import Stats from '../components/Stats'
import DepartmentsTabs from '../components/DepartmentsTabs'
function Home() {
  return (
    <div>
        <HeroSlider/>
        <CallToAction/>
        <About/>
        <Stats/>
        <DepartmentsTabs/>


    </div>
  )
}

export default Home