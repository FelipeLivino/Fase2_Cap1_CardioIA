import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import styled from 'styled-components';
import { storageManager } from '../utils/storageManager';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editState, setEditState] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPatients() {
      const data = await api.fetchPatients();
      setPatients(data);
      setLoading(false);
    }
    loadPatients();
  }, []);

  const openModal = (patient) => {
    setSelectedPatient(patient);
    // Extrai de forma protegida via module e resolve fallbacks
    const appts = api.getAppointments();
    const found = appts.find(a => a.id === patient.id) || {};
    
    setEditState({
      id: patient.id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      status: patient.status,
      risk: patient.risk,
      date: found.date || '',
      time: found.time || '',
      type: found.type || 'Consulta de Rotina'
    });
  };

  const closeModal = () => setSelectedPatient(null);

  const handleEditChange = (e) => {
    setEditState({ ...editState, [e.target.name]: e.target.value });
  };

  const saveEdits = (e) => {
    e.preventDefault();
    
    const currentPatients = storageManager.getItem('cardioia_patients') || [];
    const updatedPatients = currentPatients.map(p => 
      p.id === editState.id ? { 
        ...p, 
        name: editState.name, email: editState.email, phone: editState.phone, 
        status: editState.status, risk: editState.risk 
      } : p
    );
    
    const currentAppts = storageManager.getItem('cardioia_appointments') || [];
    let updatedAppts;
    const exists = currentAppts.some(a => a.id === editState.id);
    if(exists) {
      updatedAppts = currentAppts.map(a => 
        a.id === editState.id ? {
          ...a,
          patientName: editState.name, email: editState.email, phone: editState.phone,
          date: editState.date, time: editState.time, type: editState.type, risk: editState.risk
        } : a
      );
    } else {
      updatedAppts = [...currentAppts, {
        id: editState.id, patientName: editState.name, email: editState.email, phone: editState.phone,
        date: editState.date, time: editState.time, type: editState.type, risk: editState.risk
      }];
    }

    storageManager.setItem('cardioia_patients', updatedPatients);
    storageManager.setItem('cardioia_appointments', updatedAppts);

    setPatients(updatedPatients); 
    closeModal();
  };

  const handleExportCSV = () => {
    const headers = ['ID Integrado', 'Nome Completo', 'Email', 'Telefone', 'Status do Atendimento', 'Risco Avaliado'];
    const csvContent = [
      headers.join(','),
      ...patients.map(p => 
        [p.id, `"${p.name}"`, `"${p.email}"`, `"${p.phone}"`, `"${p.status}"`, `"${p.risk}"`].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pacientes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColors = (status) => {
    const key = status.split(' ')[0];
    switch(key) {
      case 'Agendado': return { bg: '#E0F2FE', color: '#0284C7' };
      case 'Aguardando': return { bg: '#FEF3C7', color: '#D97706' };
      case 'Alta': return { bg: '#D1FAE5', color: '#059669' };
      case 'Em': return { bg: '#F3E8FF', color: '#7E22CE' };
      default: return { bg: '#F3F4F6', color: '#4B5563' };
    }
  };

  const getRiskColors = (risk) => {
    switch(risk) {
      case 'Baixo': return { bg: '#D1FAE5', color: '#059669' };
      case 'Moderado': return { bg: '#FEF3C7', color: '#D97706' };
      case 'Alto':
      case 'Crítico': return { bg: '#FEE2E2', color: '#DC2626' };
      default: return { bg: '#F3F4F6', color: '#4B5563' };
    }
  };

  const updatePatientField = (id, field, value) => {
    const updated = patients.map(p => p.id === id ? { ...p, [field]: value } : p);
    setPatients(updated);
    cookieManager.setCookie('cardioia_patients', updated);
  };

  if (loading) return <Loading>Extraindo dados do sistema...</Loading>;

  return (
    <Container>
      <Header>
        <Title>Base de Pacientes</Title>
        <ExportBtn onClick={handleExportCSV}>Exportar CSV</ExportBtn>
      </Header>

      <TableWrapper>
        <Table>
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
            {patients.map(p => {
              const sColor = getStatusColors(p.status);
              const rColor = getRiskColors(p.risk);
              return (
                <tr key={p.id}>
                  <td data-label="ID Integrado">#{p.id.toString().padStart(4, '0')}</td>
                  <td data-label="Nome Completo">
                    <ClickableText onClick={() => openModal(p)}>{p.name}</ClickableText>
                  </td>
                  <td data-label="Contato">
                    <div style={{ textAlign: 'right' }}>
                      <div>{p.email}</div>
                      <Subtext>{p.phone}</Subtext>
                    </div>
                  </td>
                  <td data-label="Status do Atendimento">
                    <BadgeSelect 
                      value={p.status} 
                      onChange={(e) => updatePatientField(p.id, 'status', e.target.value)}
                      $bg={sColor.bg} 
                      $color={sColor.color}
                    >
                      <option value="Agendado">Agendado</option>
                      <option value="Aguardando Triagem">Aguardando Triagem</option>
                      <option value="Em Acompanhamento">Em Acompanhamento</option>
                      <option value="Alta">Alta</option>
                    </BadgeSelect>
                  </td>
                  <td data-label="Risco Avaliado">
                    <BadgeSelect 
                      value={p.risk} 
                      onChange={(e) => updatePatientField(p.id, 'risk', e.target.value)}
                      $bg={rColor.bg} 
                      $color={rColor.color}
                    >
                      <option value="Baixo">Baixo</option>
                      <option value="Moderado">Moderado</option>
                      <option value="Alto">Alto</option>
                      <option value="Crítico">Crítico</option>
                    </BadgeSelect>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>

      {selectedPatient && (
        <ModalOverlay onClick={closeModal}>
          <ModalCard onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Visão 360º do Paciente</ModalTitle>
              <CloseBtn onClick={closeModal}>&times;</CloseBtn>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={saveEdits}>
                <InputGroup>
                  <label>Nome do Paciente</label>
                  <input type="text" name="name" value={editState.name || ''} onChange={handleEditChange} required />
                </InputGroup>

                <Row>
                  <InputGroup>
                    <label>E-mail</label>
                    <input type="email" name="email" value={editState.email || ''} onChange={handleEditChange} required />
                  </InputGroup>
                  <InputGroup>
                    <label>Telefone</label>
                    <input type="tel" name="phone" value={editState.phone || ''} onChange={handleEditChange} required />
                  </InputGroup>
                </Row>

                <Row>
                  <InputGroup>
                    <label>Data Agendada</label>
                    <input type="date" name="date" value={editState.date || ''} onChange={handleEditChange} required />
                  </InputGroup>
                  <InputGroup>
                    <label>Horário</label>
                    <input type="time" name="time" value={editState.time || ''} onChange={handleEditChange} required />
                  </InputGroup>
                </Row>

                <Row>
                  <InputGroup>
                    <label>Tipo de Atendimento</label>
                    <select name="type" value={editState.type || ''} onChange={handleEditChange}>
                      <option>Consulta de Rotina</option>
                      <option>Retorno de Exames</option>
                      <option>Risco Cirúrgico</option>
                      <option>Triagem Rápida</option>
                    </select>
                  </InputGroup>
                  <InputGroup>
                    <label>Risco Avaliado</label>
                    <select name="risk" value={editState.risk || ''} onChange={handleEditChange}>
                      <option value="Baixo">Baixo</option>
                      <option value="Moderado">Moderado</option>
                      <option value="Alto">Alto</option>
                      <option value="Crítico">Crítico</option>
                    </select>
                  </InputGroup>
                </Row>

                <InputGroup>
                  <label>Status do Atendimento</label>
                  <select name="status" value={editState.status || ''} onChange={handleEditChange}>
                    <option value="Agendado">Agendado</option>
                    <option value="Aguardando Triagem">Aguardando Triagem</option>
                    <option value="Alta">Alta</option>
                    <option value="Em Acompanhamento">Em Acompanhamento</option>
                  </select>
                </InputGroup>

                <Actions>
                  <CancelBtn type="button" onClick={closeModal}>Cancelar</CancelBtn>
                  <SubmitBtn type="submit">Atualizar Registros</SubmitBtn>
                </Actions>
              </Form>
            </ModalBody>
          </ModalCard>
        </ModalOverlay>
      )}

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 1.8rem;
  margin: 0;
`;

const ExportBtn = styled.button`
  background: white;
  border: 1px solid #E2E8F0;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F1F5F9;
  }
`;

const TableWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  overflow-x: auto;

  @media (max-width: 768px) {
    background: transparent;
    box-shadow: none;
    overflow-x: visible;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem 1.5rem;
    text-align: left;
    border-bottom: 1px solid #E2E8F0;
  }

  th {
    background: var(--bg-color);
    color: var(--text-secondary);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  tbody tr:hover {
    background: var(--bg-color);
  }

  @media (max-width: 768px) {
    thead {
      display: none;
    }
    
    tr {
      display: block;
      margin-bottom: 1.5rem;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      overflow: hidden;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    
    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #F1F5F9;
      text-align: right;
    }

    td:last-child {
      border-bottom: none;
    }
    
    td::before {
      content: attr(data-label);
      font-weight: 600;
      color: var(--text-secondary);
      font-size: 0.75rem;
      text-transform: uppercase;
      text-align: left;
      padding-right: 1rem;
    }

    tbody tr:hover {
      background: white; /* Reseta o hover pra nao conflitar no cel */
    }
  }
`;

const BoldText = styled.span`
  font-weight: 600;
  color: var(--text-primary);
`;

const Subtext = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
`;

const BadgeSelect = styled.select`
  appearance: none;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid transparent;
  background: ${props => props.$bg || '#f1f5f9'};
  color: ${props => props.$color || '#475569'};
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    filter: brightness(0.95);
    border-color: ${props => props.$color || '#475569'}40; /* adiona um traco da cor nativa como borda translúcida pra indicar click */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.$color || '#475569'}40;
  }

  option {
    background: white;
    color: var(--text-primary);
  }
`;

const ClickableText = styled(BoldText)`
  cursor: pointer;
  color: var(--primary-color);
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all 0.2s;

  &:hover {
    text-decoration-color: var(--primary-color);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
`;

const ModalCard = styled.div`
  background: white;
  width: 90%;
  max-width: 600px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
  overflow: hidden;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ModalHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface-color);
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: var(--text-primary);
  font-size: 1.4rem;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.8rem;
  line-height: 1;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;

  &:hover { color: var(--danger-color); }
`;

const ModalBody = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  input, select {
    padding: 0.7rem 1rem;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    font-size: 0.95rem;
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

  &:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
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
