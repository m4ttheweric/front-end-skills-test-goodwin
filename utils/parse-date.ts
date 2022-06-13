//convert the crazy date string to an iso date

import moment from 'moment';

const formatString = `ddd MMM DD HH:mm:ss [UTC] yyyy`;

export const serverDateToLocal = (crazyDate: string) =>
   moment.utc(crazyDate, formatString).local();

//returns a string tuple with [date, time]
export const serverDateToUIDate = (crazyDate: string) =>
   serverDateToLocal(crazyDate).format('MM-DD-YYYY HH:mm:ss').split(' ');
