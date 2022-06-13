import {
   HStack,
   Stack,
   Table,
   TableCaption,
   TableContainer,
   Tbody,
   Td,
   Text,
   Th,
   Thead,
   Tr,
   VStack
} from '@chakra-ui/react';
import React from 'react';
import { FcDownload, FcUpload } from 'react-icons/fc';
import { ServerLogEntry } from '../models';
import { serverDateToUIDate } from '../utils/parse-date';

export const LogTable: React.FC<{ data: ServerLogEntry[] }> = ({ data }) => {
   return (
      <VStack spacing={4}>
         <TableContainer>
            <Table size={{ sm: 'sm', mg: 'lg' }} variant='simple'>
               <TableCaption>Server Logs</TableCaption>
               <Thead>
                  <Tr>
                     {Object.keys(data[0])
                        .filter(x => x !== 'id')
                        .map(header => (
                           <Th key={header} fontSize={{ sm: 'sm', md: 'md' }}>
                              {header}
                           </Th>
                        ))}
                  </Tr>
               </Thead>
               <Tbody>
                  {data.map(d => (
                     <Tr key={d.id}>
                        <Td whiteSpace={'break-spaces'}>
                           <Stack
                              spacing={{ base: 0, md: 1 }}
                              direction={{ base: 'column', md: 'row' }}
                           >
                              <Text fontSize={{ base: 12 }}>
                                 {serverDateToUIDate(d.timestamp)[0]}
                              </Text>
                              <Text fontSize={{ base: 12 }}>
                                 {serverDateToUIDate(d.timestamp)[1]}
                              </Text>
                           </Stack>
                        </Td>
                        <Td>{d.username}</Td>
                        <Td>
                           <HStack>
                              {d.operation === 'download' ? (
                                 <FcDownload />
                              ) : (
                                 <FcUpload />
                              )}
                              <Text fontSize={12}>{d.operation}</Text>
                           </HStack>
                        </Td>
                        <Td>{d.size}kb</Td>
                     </Tr>
                  ))}
               </Tbody>
            </Table>
         </TableContainer>
      </VStack>
   );
};
