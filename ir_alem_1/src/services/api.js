import { storageManager } from '../utils/storageManager';

export const api = {
  fetchPatients: async () => {
    // 1°. Tenta recuperar silenciosamente da sessão local protegida
    const cachedPatients = storageManager.getItem('cardioia_patients');
    if (cachedPatients) return cachedPatients;

    // 2°. Se for o login inicial e não tiver registro, consome a API (input inicial)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      
      const patients = data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: ['Agendado', 'Aguardando Triagem', 'Alta', 'Em Acompanhamento'][Math.floor(Math.random() * 4)],
        risk: ['Baixo', 'Moderado', 'Alto', 'Crítico'][Math.floor(Math.random() * 4)] // Ajustado pra dar match no app
      }));

      // Cria agendamentos sintéticos para TODOS no mockup (conforme ordem)
      const syntheticAppointments = patients
        .map((p, index) => ({
          id: p.id,
          patientName: p.name,
          email: p.email,
          phone: p.phone,
          date: '2026-10-15', // Data de mock futura
          time: `1${index}:00`,
          type: 'Consulta de Rotina',
          risk: p.risk
        }));

      // Armazena os dois de forma coerente e blindada no Storage
      storageManager.setItem('cardioia_patients', patients);
      storageManager.setItem('cardioia_appointments', syntheticAppointments);

      return patients;
    } catch (e) {
      console.error('Failed to fetch patients', e);
      return [];
    }
  },
  
  getAppointments: () => {
    // Retorna direto do Storage protegido
    const cached = storageManager.getItem('cardioia_appointments');
    return cached || [];
  },

  scheduleAppointment: (appointment) => {
    const current = api.getAppointments();
    const newAppointment = { ...appointment, id: Date.now() };
    const updated = [...current, newAppointment];
    
    // Armazena agendamentos
    storageManager.setItem('cardioia_appointments', updated);

    // Integração Automática à base de Pacientes
    const cachedPatients = storageManager.getItem('cardioia_patients') || [];
    const newPatient = {
      id: newAppointment.id, // Compartilha a Primary Key
      name: appointment.patientName,
      email: appointment.email,
      phone: appointment.phone,
      status: 'Agendado', // Status padrão de novo agendamento
      risk: appointment.risk
    };
    
    storageManager.setItem('cardioia_patients', [newPatient, ...cachedPatients]);

    return newAppointment;
  }
};
