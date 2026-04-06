export const api = {
  fetchPatients: async () => {
    try {
      // JSONPlaceholder acting as our fake API for patients
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      
      // Formatting the generic payload to clinic data
      return data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: ['Agendado', 'Aguardando Triagem', 'Alta', 'Em Acompanhamento'][Math.floor(Math.random() * 4)],
        risk: ['Baixo', 'Alto', 'Crítico'][Math.floor(Math.random() * 3)]
      }));
    } catch (e) {
      console.error('Failed to fetch patients', e);
      return [];
    }
  },
  
  getAppointments: () => {
    const raw = localStorage.getItem('@CardioIA:appointments');
    return raw ? JSON.parse(raw) : [];
  },

  scheduleAppointment: (appointment) => {
    const current = api.getAppointments();
    const newAppointment = { ...appointment, id: Date.now() };
    localStorage.setItem('@CardioIA:appointments', JSON.stringify([...current, newAppointment]));
    return newAppointment;
  }
};
