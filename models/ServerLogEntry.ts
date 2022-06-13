// TODO: type the data from data/server_log.json
export type ServerLogEntry = {
   id: string;
   timestamp: string;
   username: string;
   operation: 'upload' | 'download';
   size: number;
};
