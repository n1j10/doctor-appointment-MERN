import React from 'react'
import AboutUs from "../img/about.jpg"
function About() {
  return (
    <section className="py-16 bg-gray-50">

        <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold'>About Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
        We are dedicated to providing high-quality healthcare services with experienced doctors, 
        modern facilities, and compassionate care. Our mission is to ensure every patient receives 
        the attention and treatment they deserve.
        </p>


        </div>

        <div className='max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-8 px-4'>
            <div className='relative'>
                <img src=''/>
            </div>
        </div>
        

    </section>
  )
}

export default About