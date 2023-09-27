const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
const day = String(today.getDate()).padStart(2, "0");

export const currentDate = `${year}-${month}-${day}`;
