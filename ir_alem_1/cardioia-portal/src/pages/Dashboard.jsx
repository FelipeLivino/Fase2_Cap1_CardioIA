import { useEffect, useState } from 'react';
import { api } from '../services/api';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [stats, setStats] = useState({ patients: 0, appointments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const patientsDB = await api.fetchPatients();
      const appointmentsDB = api.getAppointments();
      setStats({
        patients: patientsDB.length,
        appointments: appointmentsDB.length
      });
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) return <div className={styles.loading}>Carregando métricas...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Visão Geral</h1>
      <div className={styles.metricsGrid}>
        <div className={styles.card}>
          <div className={styles.icon}>🩺</div>
          <div className={styles.info}>
            <h3>Pacientes Registrados</h3>
            <p className={styles.value}>{stats.patients}</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>📅</div>
          <div className={styles.info}>
            <h3>Consultas Realizadas</h3>
            <p className={styles.value}>{stats.appointments}</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>⚠️</div>
          <div className={styles.info}>
            <h3>Em Alerta</h3>
            <p className={styles.value}>0</p>
          </div>
        </div>
      </div>
      
      <div className={styles.welcomeSection}>
        <h2>Bem-vindo ao CardioIA Portal</h2>
        <p>Um sistema focado em rapidez, estabilidade e inteligência preditiva.</p>
        <div className={styles.actionButtons}>
          <a href="/schedule" className={styles.primaryBtn}>Novo Agendamento</a>
          <a href="/patients" className={styles.secondaryBtn}>Ver Pacientes</a>
        </div>
      </div>
    </div>
  );
}
