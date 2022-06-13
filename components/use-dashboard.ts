import moment, { Moment } from 'moment';
import React, { useMemo } from 'react';
import { ServerLogEntry } from '../models';
import { serverDateToLocal } from '../utils/parse-date';

export function useDashboard(logs: ServerLogEntry[]) {
   const [minFileSize, maxFileSize] = useMemo(() => {
      return [
         Math.min(...logs.flatMap(f => f.size)),
         Math.max(...logs.flatMap(f => f.size))
      ];
   }, [logs]);

   const [minDate, maxDate] = useMemo(() => {
      return [
         Math.min(...logs.flatMap(f => serverDateToLocal(f.timestamp).unix())),
         Math.max(...logs.flatMap(f => serverDateToLocal(f.timestamp).unix()))
      ];
   }, [logs]);

   const uniqueUserList = useMemo(
      () => [...new Set(logs.map(item => item.username))],
      [logs]
   );

   //filter by file size
   const [fileSizeRange, setFileSizeRange] = React.useState([
      minFileSize,
      maxFileSize
   ]);

   //filter by users
   const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

   //filter by date rnage
   const [dateRange, setDateRange] = React.useState<[Moment, Moment]>([
      moment.unix(minDate),
      moment.unix(maxDate)
   ]);

   const resetDateRange = () => {
      setDateRange([moment.unix(minDate), moment.unix(maxDate)]);
   };

   const dateRangeIsDefault =
      dateRange[0].unix() === minDate && dateRange[1].unix() === maxDate;

   const isInDateRange = (logEntry: ServerLogEntry) => {
      const parsedDate = serverDateToLocal(logEntry.timestamp);

      //check if date is before the start date
      if (dateRange[0] != null && parsedDate < dateRange[0]) {
         return false;
      }

      //check if date is after the end date
      if (dateRange[1] != null && parsedDate > dateRange[1]) {
         return false;
      }

      return true;
   };

   //this is the data in the UI
   const displayData = useMemo(() => {
      //if any of the filters are active, then engage a filter...
      if (
         fileSizeRange[0] > minFileSize ||
         fileSizeRange[1] < maxFileSize ||
         selectedUsers.length > 0 ||
         dateRange[0] != null ||
         dateRange[1] != null
      ) {
         return logs.filter(
            log =>
               log.size >= fileSizeRange[0] &&
               log.size <= fileSizeRange[1] &&
               isInDateRange(log) &&
               (selectedUsers.length === 0 ||
                  selectedUsers.includes(log.username))
         );
      }

      return logs;
   }, [selectedUsers, fileSizeRange, dateRange, logs]);

   const uploads = useMemo(
      () => displayData.filter(l => l.operation === 'upload'),
      [displayData]
   );

   const downloads = useMemo(
      () => displayData.filter(l => l.operation === 'download'),
      [displayData]
   );

   return {
      minFileSize,
      maxFileSize,
      minDate,
      maxDate,
      setFileSizeRange,
      dateRange,
      setDateRange,
      dateRangeIsDefault,
      resetDateRange,
      uniqueUserList,
      selectedUsers,
      setSelectedUsers,
      displayData,
      uploads,
      downloads
   };
}
