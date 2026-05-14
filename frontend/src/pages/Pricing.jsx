import React from 'react'
import PricingSections from '../components/Pricing/PricingSections.jsx';
import ReadyToJoin from '../components/Pricing/ReadyToJoin.jsx';
import Container from '../components/layout/Container.jsx';

const Pricing = () => {
  return (
    <Container>
      <PricingSections />
      <ReadyToJoin />
    </Container>
  )
}

export default Pricing