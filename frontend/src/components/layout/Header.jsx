import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from './MenuIcon';
import CloseIcon from './CloseIcon';

// Navigation links
const NAV_LINKS = [
  { path: '/about', label: 'About Us' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/membership', label: 'Membership' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/blog', label: 'Blog' },
  { path: '/events', label: 'Events' },
  { path: '/contact', label: 'Contact' },
];

// Brand configuration
const BRAND = {
  name: 'Cultural Club',
  homeLink: '/',
};

// Colors
const COLORS = {
  primary: '#B85C3C',
  text: '#1A1A1A',
  border: '#E0D5C7',
  buttonBg: '#E0D5C7',
  buttonHover: '#C9B8A3',
  background: '#FFFFFF',
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b" style={{ borderColor: COLORS.border }}>
      <div className="flex items-center justify-between h-20 px-4 md:px-6">
        {/* Logo */}
        <Link
          to={BRAND.homeLink}
          className="hidden sm:inline font-display font-bold text-lg"
          style={{ color: COLORS.text }}
        >
          {BRAND.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.path} {...link} colors={COLORS} />
          ))}
        </nav>

        {/* Right Section: Login Button + Hamburger */}
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          {/* Login Button */}
          <button
            className="px-4 py-2 rounded transition-colors duration-300"
            style={{
              backgroundColor: COLORS.buttonBg,
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = COLORS.buttonHover;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = COLORS.buttonBg;
            }}
          >
            <Link to="/login" >
            Login
            </Link>
          </button>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <CloseIcon color={COLORS.text} />
            ) : (
              <MenuIcon color={COLORS.text} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu links={NAV_LINKS} colors={COLORS} onLinkClick={closeMobileMenu} />
      )}
    </header>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ path, label, colors }) => (
  <Link
    to={path}
    className="capitalize px-3 py-2 text-sm font-medium transition-colors duration-300 border-b-2 border-transparent"
    style={{
      color: colors.text,
      textDecoration: 'none',
    }}
    onMouseEnter={(e) => {
      e.target.style.color = colors.primary;
      e.target.style.borderBottomColor = colors.primary;
    }}
    onMouseLeave={(e) => {
      e.target.style.color = colors.text;
      e.target.style.borderBottomColor = 'transparent';
    }}
  >
    {label}
  </Link>
);

// Mobile Menu Component
const MobileMenu = ({ links, colors, onLinkClick }) => (
  <nav
    className="md:hidden border-t"
    style={{ borderColor: colors.border }}
  >
    <div className="flex flex-col p-4 space-y-2">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="capitalize px-4 py-2 text-sm font-medium rounded transition-colors duration-300"
          style={{
            color: colors.text,
            textDecoration: 'none',
          }}
          onClick={onLinkClick}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.border;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  </nav>
);

export default Header;