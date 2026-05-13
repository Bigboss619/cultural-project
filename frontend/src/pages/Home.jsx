import React from 'react'
import Container from '../components/layout/Container'
import OurStory from '../components/Home/OurStory'
import ContactUs from '../components/Home/ContactUs'
import CoreValues from '../components/Home/CoreValues'
import Heritage from '../components/Home/Heritage'
import Legacy from '../components/Home/Legacy'
const Home = () => {
  return (
    <div>
        <Container >
          <OurStory />
          <CoreValues />
          <Heritage />
          <Legacy />
          <ContactUs /> 
        </Container>
    </div>
  )
}

export default Home