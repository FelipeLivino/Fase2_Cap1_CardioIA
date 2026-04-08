import { useEffect, useState } from 'react';
import { api } from '../services/api';
import styled from 'styled-components';

export default function Dashboard() {
  const [stats, setStats] = useState({ 
    patients: 0, alerts: 0, 
    agendados: 0, triagem: 0, acompanhamento: 0, alta: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const patientsDB = await api.fetchPatients();
      const alertsCount = patientsDB.filter(p => p.risk === 'Crítico').length;
      
      setStats({
        patients: patientsDB.length,
        alerts: alertsCount,
        agendados: patientsDB.filter(p => p.status === 'Agendado').length,
        triagem: patientsDB.filter(p => p.status === 'Aguardando Triagem').length,
        acompanhamento: patientsDB.filter(p => p.status === 'Em Acompanhamento').length,
        alta: patientsDB.filter(p => p.status === 'Alta').length
      });
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) return <Loading>Carregando métricas...</Loading>;

  return (
    <Container>
      <Title>Visão Geral</Title>
      <MetricsGrid>
        <Card>
          <Icon>🩺</Icon>
          <Info>
            <h3>Total de Pacientes</h3>
            <Value>{stats.patients}</Value>
          </Info>
        </Card>
        <Card>
          <Icon>⚠️</Icon>
          <Info>
            <h3>Em Alerta (Crítico)</h3>
            <Value>{stats.alerts}</Value>
          </Info>
        </Card>
        <Card>
          <Icon>📅</Icon>
          <Info>
            <h3>Agendado</h3>
            <Value>{stats.agendados}</Value>
          </Info>
        </Card>
        <Card>
          <Icon>⏳</Icon>
          <Info>
            <h3>Ag. Triagem</h3>
            <Value>{stats.triagem}</Value>
          </Info>
        </Card>
        <Card>
          <Icon>🤝</Icon>
          <Info>
            <h3>Em Acompanhamento</h3>
            <Value>{stats.acompanhamento}</Value>
          </Info>
        </Card>
        <Card>
          <Icon>✅</Icon>
          <Info>
            <h3>Alta</h3>
            <Value>{stats.alta}</Value>
          </Info>
        </Card>
      </MetricsGrid>
      
      <WelcomeSection>
        <h2>Bem-vindo ao CardioIA Portal</h2>
        <p>Um sistema focado em rapidez, estabilidade e inteligência preditiva.</p>
        <ActionButtons>
          <PrimaryBtn href="/schedule">Novo Agendamento</PrimaryBtn>
          <SecondaryBtn href="/patients">Ver Pacientes</SecondaryBtn>
        </ActionButtons>
      </WelcomeSection>
    </Container>
  );
}

const Loading = styled.div`
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
  font-size: 1.2rem;
`;

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: var(--text-primary);
  font-size: 1.8rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const Card = styled.div`
  background: var(--surface-color);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  background: var(--bg-color);
  padding: 1rem;
  border-radius: 12px;
`;

const Info = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const Value = styled.p`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const WelcomeSection = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);

  h2 {
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const PrimaryBtn = styled.a`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  background: var(--primary-color);
  color: white;

  &:hover {
    background: var(--secondary-color);
  }
`;

const SecondaryBtn = styled.a`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  background: var(--bg-color);
  color: var(--text-primary);
  border: 1px solid #E2E8F0;

  &:hover {
    background: #E2E8F0;
  }
`;
