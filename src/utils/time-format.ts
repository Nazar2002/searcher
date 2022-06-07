import moment from 'moment';

export const timeFormat = (data: string | undefined): string => moment(data).format('ll');
