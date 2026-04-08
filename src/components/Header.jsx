import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className="glass-panel" style={{ 
      margin: 'var(--spacing-md)', 
      padding: 'var(--spacing-md)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--spacing-md)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 'var(--text-3xl)' }}>Luz Católica</h1>
        <p style={{ margin: 0, fontSize: 'var(--text-lg)', color: 'var(--color-primary)' }}>Oraciones y Rosario</p>
      </div>

      <nav style={{
        display: 'flex',
        gap: 'var(--spacing-sm)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%'
      }}>
        <CustomNavLink to="/" label="Inicio" />
        <CustomNavLink to="/evangelio" label="Liturgia" />
        <CustomNavLink to="/rosario" label="Rosario" />
        <CustomNavLink to="/oraciones" label="Oraciones" />
        <CustomNavLink to="/novenas" label="Novenas" />
        <CustomNavLink to="/santos" label="Santos" />
        <CustomNavLink to="/muro" label="Muro" />
        <CustomNavLink to="/consejero" label="Guía Espiritual" />
      </nav>
    </header>
  )
}

const CustomNavLink = ({ to, label }) => {
  return (
    <NavLink 
      to={to}
      style={({ isActive }) => ({
        padding: 'var(--spacing-sm) var(--spacing-md)',
        fontSize: 'var(--text-lg)',
        fontWeight: '600',
        borderRadius: 'var(--border-radius-md)',
        textDecoration: 'none',
        transition: 'var(--transition-smooth)',
        backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
        color: isActive ? '#FFFFFF' : 'var(--color-primary)',
        border: isActive ? '2px solid transparent' : '2px solid var(--color-primary)'
      })}
    >
      {label}
    </NavLink>
  )
}

export default Header
