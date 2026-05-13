import React from 'react'
import Container from '../components/layout/Container'
import OurStory from '../components/AboutUs/OurStory'
import CoreValues from '../components/AboutUs/CoreValues'
import Portfolio from '../components/AboutUs/Portfolio'
import Legacy from '../components/AboutUs/Legacy'
const AboutUs = () => {
  return (
    <Container>
        <OurStory />
        <CoreValues />
        <Portfolio />
        <Legacy />
    </Container>
  )
}

export default AboutUs