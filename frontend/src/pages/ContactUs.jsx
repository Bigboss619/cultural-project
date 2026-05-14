import React from 'react'
import Container from '../components/layout/Container'
import ContactForm from '../components/ContactUs/ContactForm'
import ContactInfo from '../components/ContactUs/ContactInfo'

const ContactUs = () => {
  return (
    <Container>
      <div className="container py-12 md:py-16 md:p-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <ContactForm />
          <ContactInfo />
          
        </div>
      </div>

    </Container>
  )
}

export default ContactUs