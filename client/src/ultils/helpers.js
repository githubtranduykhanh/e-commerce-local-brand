export const createSlug = str => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('-')
export const formatMoney = number => Number(number.toFixed(1)).toLocaleString()