import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styled, { keyframes } from 'styled-components';

export default function Login() {
  const [email, setEmail] = useState('admin@cardioia.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Logo>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px', marginBottom: '4px' }}>
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          CardioIA
        </Logo>
        <Title>Acesso Restrito</Title>
        <Subtitle>Portal Automático de Triagem</Subtitle>
        
        {error && <ErrorAlert>{error}</ErrorAlert>}
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Email Profissional</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Senha Segura</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <SubmitBtn type="submit" disabled={loading}>
            {loading ? 'Validando Acesso...' : 'Entrar no Portal'}
          </SubmitBtn>
        </Form>
      </LoginCard>
    </Container>
  );
}

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 420px;
  animation: ${slideUp} 0.6s ease-out;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const ErrorAlert = styled.div`
  background: #FEF2F2;
  color: var(--danger-color);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #FCA5A5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  input {
    padding: 0.8rem 1rem;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(12, 130, 240, 0.1);
    }
  }
`;

const SubmitBtn = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: var(--secondary-color);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
