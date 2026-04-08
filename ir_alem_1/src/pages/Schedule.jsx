import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import styled, { keyframes } from 'styled-components';

const initialState = {
  patientName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  type: 'Consulta de Rotina',
  risk: 'Baixo'
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
    
    setTimeout(() => {
      // api.js agora aciona o cookieManager.setCookie internamente blindando a transacao
      api.scheduleAppointment(state);
      
      setLoading(false);
      setSuccess(true);
      dispatch({ type: 'RESET' });
      
      setTimeout(() => {
        setSuccess(false);
        navigate('/patients'); // Melhor redirecionar para ver o paciente novo sumado
      }, 2000);
    }, 800);
  };

  const handleChange = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  return (
    <Container>
      <FormCard>
        <Title>Novo Agendamento</Title>
        <Subtitle>Preencha os dados clínicos para agendar uma consulta</Subtitle>

        {success && <SuccessAlert>Agendamento salvo e paciente integrado à base!</SuccessAlert>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Nome do Paciente</label>
            <input 
              type="text" 
              name="patientName"
              value={state.patientName}
              onChange={handleChange}
              placeholder="Ex: Maria Silva"
              required 
            />
          </InputGroup>

          <Row>
            <InputGroup>
              <label>E-mail de Contato</label>
              <input 
                type="email" 
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="ex: maria@email.com"
                required 
              />
            </InputGroup>
            <InputGroup>
              <label>Telefone</label>
              <input 
                type="tel" 
                name="phone"
                value={state.phone}
                onChange={handleChange}
                placeholder="(11) 90000-0000"
                required 
              />
            </InputGroup>
          </Row>

          <Row>
            <InputGroup>
              <label>Data</label>
              <input 
                type="date" 
                name="date"
                value={state.date}
                onChange={handleChange}
                required 
              />
            </InputGroup>
            <InputGroup>
              <label>Horário</label>
              <input 
                type="time" 
                name="time"
                value={state.time}
                onChange={handleChange}
                required 
              />
            </InputGroup>
          </Row>

          <Row>
            <InputGroup>
              <label>Tipo de Atendimento</label>
              <select name="type" value={state.type} onChange={handleChange}>
                <option>Consulta de Rotina</option>
                <option>Retorno de Exames</option>
                <option>Risco Cirúrgico</option>
                <option>Triagem Rápida</option>
              </select>
            </InputGroup>
            <InputGroup>
              <label>Risco Avaliado</label>
              <select name="risk" value={state.risk} onChange={handleChange}>
                <option value="Baixo">Baixo (Rotina)</option>
                <option value="Moderado">Moderado (Atenção)</option>
                <option value="Alto">Alto (Prioridade)</option>
                <option value="Crítico">Crítico (Emergência)</option>
              </select>
            </InputGroup>
          </Row>

          <Actions>
            <CancelBtn type="button" onClick={() => navigate('/')}>Cancelar</CancelBtn>
            <SubmitBtn type="submit" disabled={loading}>
              {loading ? 'Agendando...' : 'Confirmar Agendamento'}
            </SubmitBtn>
          </Actions>
        </Form>
      </FormCard>
    </Container>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 80px);
`;

const FormCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h1`
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  margin: 0 0 2rem 0;
`;

const SuccessAlert = styled.div`
  background: var(--success-color);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
  animation: ${fadeIn} 0.3s ease;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  input, select {
    padding: 0.8rem 1rem;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s;
    background: var(--bg-color);
    color: var(--text-primary);

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      background: white;
      box-shadow: 0 0 0 3px rgba(12, 130, 240, 0.1);
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #F1F5F9;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    
    button {
      width: 100%;
    }
  }
`;

const SubmitBtn = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--primary-color);
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: var(--secondary-color);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const CancelBtn = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid #E2E8F0;

  &:hover {
    background: #F1F5F9;
    color: var(--text-primary);
  }
`;
