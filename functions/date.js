const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1; 
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
// const seconds = date.getSeconds();

const ampm = hours >= 12 ? 'PM' : 'AM';
const twelveHourFormat = hours % 12 || 12; // Convert 0 to 12

export const currentDate = `${month}-${day}-${year}`;
export const currentTime = `${twelveHourFormat}:${minutes} ${ampm}`;
