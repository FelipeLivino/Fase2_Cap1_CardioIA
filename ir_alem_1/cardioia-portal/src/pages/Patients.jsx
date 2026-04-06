import { useEffect, useState } from 'react';
import { api } from '../services/api';
import styles from './Patients.module.css';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPatients() {
      const data = await api.fetchPatients();
      setPatients(data);
      setLoading(false);
    }
    loadPatients();
  }, []);

  if (loading) return <div className={styles.loading}>Extraindo dados do sistema...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Base de Pacientes</h1>
        <button className={styles.exportBtn}>Exportar CSV</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Integrado</th>
              <th>Nome Completo</th>
              <th>Contato (E-mail / Tel)</th>
              <th>Status do Atendimento</th>
              <th>Risco Avaliado</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td>#{p.id.toString().padStart(4, '0')}</td>
                <td className={styles.bold}>{p.name}</td>
                <td>
                  <div>{p.email}</div>
                  <div className={styles.subtext}>{p.phone}</div>
                </td>
                <td><span className={`${styles.badge} ${styles['status_'+p.status.split(' ')[0]]}`}>{p.status}</span></td>
                <td><span className={`${styles.badge} ${styles['risk_'+p.risk]}`}>{p.risk}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
