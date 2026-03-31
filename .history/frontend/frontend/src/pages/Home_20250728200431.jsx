import React from 'react'
import CallToAction from '../components/CallToAction'
import HeroSlider from '../components/HeroSlider'
import About from '../components/About'
import Stats from '../components/Stats'
import Departments from '../components/Departments'
import Navbar from '../components/Navbar'
function Home() {
  return (
    <div>
      <Navbar/>
        <HeroSlider/>
        <CallToAction/>
        <About/>
        <Stats/>
        <Departments/>
        


    </div>
  )
}

export default Home