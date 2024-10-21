export const statusMap = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Asistió';
    case 'noConfirmed':
      return 'No asistió';
    case 'cancelled':
      return 'Cancelado';
    default:
      return 'Pendiente';
  }
};
