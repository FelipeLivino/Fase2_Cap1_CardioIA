import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.icon}>❤️</span>
        <span>CardioIA</span>
      </div>
      <ul className={styles.navLinks}>
        <li><NavLink to="/" className={({isActive}) => isActive ? styles.active : ''}>Dashboard</NavLink></li>
        <li><NavLink to="/patients" className={({isActive}) => isActive ? styles.active : ''}>Pacientes</NavLink></li>
        <li><NavLink to="/schedule" className={({isActive}) => isActive ? styles.active : ''}>Agendamentos</NavLink></li>
      </ul>
      <div className={styles.userControls}>
        <span className={styles.greeting}>Olá, {user.name}</span>
        <button onClick={logout} className={styles.logoutBtn}>Sair</button>
      </div>
    </nav>
  );
}
