export const getFormattedDate = (date: number) => {
  return new Date(date).toLocaleDateString('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const getFormattedDate_yymmdd = (date: number) => {
  return new Date(date).toLocaleDateString('ko', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const getFormattedDateCustom = (date: number | string) => {
  return new Date(date).toLocaleDateString('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};
