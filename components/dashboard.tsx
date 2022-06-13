import {
   Button,
   Flex,
   Heading,
   Input,
   Stack,
   Text,
   VStack
} from '@chakra-ui/react';
import moment, { Moment } from 'moment';
import React, { useMemo } from 'react';
import { ServerLogEntry } from '../models';
import { serverDateToLocal } from '../utils/parse-date';
import { FileStats } from './file-stats';
import { LogTable } from './log-table';
import { useDashboard } from './use-dashboard';
import { UserStats } from './user-stats';

export const Dashboard: React.FC<{ logs: ServerLogEntry[] }> = ({ logs }) => {
   const {
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
   } = useDashboard(logs);

   const dateInputFormat = 'YYYY-MM-DDTHH:mm';

   const dateRangeUI = () => (
      <VStack>
         <Text>Date Range:</Text>
         <Stack direction={{ sm: 'column', lg: 'row' }}>
            <Input
               value={dateRange[0].format(dateInputFormat)}
               min={moment.unix(minDate).format(dateInputFormat)}
               max={dateRange[1].format(dateInputFormat)}
               style={{ cursor: 'pointer' }}
               onKeyDown={e => {
                  return false;
               }}
               onChange={e => {
                  if (moment(e.target.value).isValid()) {
                     setDateRange(prev => [moment(e.target.value), prev[1]]);
                  }
               }}
               type={'datetime-local'}
            />
            <Input
               value={dateRange[1].format(dateInputFormat)}
               min={dateRange[0].format(dateInputFormat)}
               max={moment.unix(maxDate).format(dateInputFormat)}
               style={{ cursor: 'pointer' }}
               //disabling typing as I want users to use mouse to use the datepicker ui .
               //enabling typing means more sophisticated validation that I don't have time for!
               onKeyDown={e => {
                  return false;
               }}
               onChange={e => {
                  console.log(e.target.value);
                  if (moment(e.target.value).isValid()) {
                     setDateRange(prev => [prev[0], moment(e.target.value)]);
                  }
               }}
               type={'datetime-local'}
            />
         </Stack>
         <Button disabled={dateRangeIsDefault} onClick={resetDateRange}>
            Reset Dates
         </Button>
      </VStack>
   );

   return (
      <VStack spacing={4}>
         <Heading as='h1' size='lg' noOfLines={1}>
            Server Logs
         </Heading>
         {dateRangeUI()}
         <Stack direction={{ sm: 'column', lg: 'row' }} alignItems='stretch'>
            <FileStats
               maxFileSize={maxFileSize}
               minFileSize={minFileSize}
               onRangeChange={range => setFileSizeRange(range)}
               uploads={uploads}
               downloads={downloads}
            />
            <UserStats
               users={uniqueUserList}
               selectedUser={selectedUsers[0]}
               onChangeUser={user => {
                  setSelectedUsers(!user ? [] : [user]);
               }}
            />
         </Stack>
         <LogTable data={displayData} />
      </VStack>
   );
};
