import React from 'react'

const Header = () => {
  return (
    <>
        <header className="sticky top-0 z-50 bg-white shadow-md border-b border-[#E0D5C7]">
            <div>
                <h1>Legacy Stars</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    </>
  )
}

export default Header