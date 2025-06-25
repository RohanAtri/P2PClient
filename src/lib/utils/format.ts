export const removeComma = (value: any): number => {
  if (typeof value === 'number') return value;

  if (typeof value === 'string' && value.trim() !== '') {
    const cleaned = value.replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }

  return 0;
};