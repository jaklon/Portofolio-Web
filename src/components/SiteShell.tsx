import { useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router'
import type { PropsWithChildren } from 'react'
import { contacts } from '../data/portfolio'
import { HomeBackground, HomeBackgroundProvider } from './HomeBackground'
import { CinematicFooter } from './ui/motion-footer'
import '../HomeBackground.css'

export function SiteShell({ children }: PropsWithChildren) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const menuOpen = menuPath === location.pathname
  const menuButton = useRef<HTMLButtonElement>(null)

  const closeMenu = () => setMenuPath(null)

  return (
    <HomeBackgroundProvider><div className={`site-shell ${isHome ? 'site-shell--home' : ''}`}>
      {isHome && <HomeBackground />}
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" onKeyDown={event => { if (event.key === 'Escape') { closeMenu(); menuButton.current?.focus() } }}>
        <div className="site-header__inner page-width">
          <NavLink className="brand-mark" to="/" aria-label="Jascon Kembuan home" onClick={closeMenu}><span className="brand-symbol" aria-hidden="true">j.</span><span>Jascon<br /><strong>Kembuan</strong></span></NavLink>
          <nav className="site-nav" aria-label="Primary navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/about">About</NavLink><NavLink to="/projects">Work</NavLink></nav>
          <a className="button button--glass header-contact" href="#contact">Let's talk <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button ref={menuButton} className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuPath(menuOpen ? null : location.pathname)}>{menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}</button>
        </div>
        {menuOpen && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation"><NavLink to="/" end onClick={closeMenu}>Home</NavLink><NavLink to="/about" onClick={closeMenu}>About</NavLink><NavLink to="/projects" onClick={closeMenu}>Work</NavLink><a href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={19} aria-hidden="true" /></a></nav>}
      </header>
      {children}
      <CinematicFooter email={contacts.email} linkedin={contacts.linkedin} routeKey={location.pathname} />
    </div></HomeBackgroundProvider>
  )
}
