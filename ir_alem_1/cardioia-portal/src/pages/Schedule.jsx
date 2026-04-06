import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import styles from './Schedule.module.css';

const initialState = {
  patientName: '',
  date: '',
  time: '',
  type: 'Consulta de Rotina',
  urgency: 'Baixa'
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function Schedule() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      api.scheduleAppointment(state);
      setLoading(false);
      setSuccess(true);
      dispatch({ type: 'RESET' });
      
      setTimeout(() => {
        setSuccess(false);
        navigate('/');
      }, 2000);
    }, 800);
  };

  const handleChange = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Novo Agendamento</h1>
        <p className={styles.subtitle}>Preencha os dados clínicos para agendar uma consulta</p>

        {success && <div className={styles.successAlert}>Agendamento realizado com sucesso! Redirecionando...</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nome do Paciente</label>
            <input 
              type="text" 
              name="patientName"
              value={state.patientName}
              onChange={handleChange}
              placeholder="Ex: Maria Silva"
              required 
            />
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Data</label>
              <input 
                type="date" 
                name="date"
                value={state.date}
                onChange={handleChange}
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Horário</label>
              <input 
                type="time" 
                name="time"
                value={state.time}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Tipo de Atendimento</label>
            <select name="type" value={state.type} onChange={handleChange}>
              <option>Consulta de Rotina</option>
              <option>Retorno de Exames</option>
              <option>Risco Cirúrgico</option>
              <option>Triagem Rápida</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Classificação de Urgência</label>
            <select name="urgency" value={state.urgency} onChange={handleChange}>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média (Atenção moderada)</option>
              <option value="Alta">Alta (Urgência)</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/')}>Cancelar</button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Agendando...' : 'Confirmar Agendamento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
