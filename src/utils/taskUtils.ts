
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-600';
    case 'in_progress': return 'bg-blue-600';
    case 'cancelled': return 'bg-red-600';
    default: return 'bg-yellow-600';
  }
};

export const getStatusText = (status: string) => {
  return status.replace('_', ' ').toUpperCase();
};
