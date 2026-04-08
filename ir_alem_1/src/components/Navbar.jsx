import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import { api } from '../services/api';
import { storageManager } from '../utils/storageManager';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    async function initPatientsCookie() {
      // Usando policy unificada localstorage
      if (!storageManager.getItem('cardioia_patients')) {
        const patients = await api.fetchPatients();
        storageManager.setItem('cardioia_patients', patients);
      }
    }
    initPatientsCookie();
  }, []);

  if (!user) return null;

  return (
    <NavContainer>
      <Brand>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        <span>CardioIA</span>
      </Brand>
      <NavLinks>
        <li><StyledNavLink to="/">Dashboard</StyledNavLink></li>
        <li><StyledNavLink to="/patients">Pacientes</StyledNavLink></li>
        <li><StyledNavLink to="/schedule">Agendamentos</StyledNavLink></li>
      </NavLinks>
      <UserControls>
        <Greeting>Olá, {user.name}</Greeting>
        <LogoutBtn onClick={logout}>Sair</LogoutBtn>
      </UserControls>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--surface-color);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const Brand = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    gap: 1rem;
    width: 100%;
    justify-content: center;
    border-top: 1px solid #F1F5F9;
    border-bottom: 1px solid #F1F5F9;
    padding: 0.8rem 0;
  }

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 600;
  color: var(--text-secondary);
  transition: color 0.2s;
  padding: 0.5rem;

  &.active, &:hover {
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
  }
`;

const UserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Greeting = styled.span`
  font-weight: 500;
  color: var(--text-primary);
`;

const LogoutBtn = styled.button`
  background: transparent;
  border: 1px solid var(--danger-color);
  color: var(--danger-color);
  padding: 0.375rem 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: var(--danger-color);
    color: white;
  }
`;
