import React from 'react'
import Container from '../components/layout/Container'
import EventLists from '../components/Events/EventLists'
import SubscribeEventForm from '../components/Events/SubscribeEventForm'

const Events = () => {
  return (
    <Container>
        <EventLists />
        <SubscribeEventForm />
      
    </Container>
  )
}

export default Events