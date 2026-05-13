import React from 'react'
import Container from '../components/layout/Container'
import OurStory from '../components/AboutUs/OurStory'
import CoreValues from '../components/AboutUs/CoreValues'
import Portfolio from '../components/AboutUs/Portfolio'
const AboutUs = () => {
  return (
    <Container>
        <OurStory />
        <CoreValues />
        <Portfolio />
    </Container>
  )
}

export default AboutUs