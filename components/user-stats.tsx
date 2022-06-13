import {
   Select,
   Stat,
   StatLabel,
   StatNumber,
   Text,
   VStack
} from '@chakra-ui/react';
import React from 'react';

interface UserStatsProps {
   users: string[];
   selectedUser: string;
   onChangeUser: (user: string) => void;
}
export const UserStats: React.FC<UserStatsProps> = ({
   users,
   selectedUser,
   onChangeUser
}) => (
   <VStack p={4} border={'solid 1px #ddd'} boxShadow={'md'} borderRadius={8}>
      <Stat>
         {!selectedUser && <StatLabel>Distinct Users</StatLabel>}
         <StatNumber>{!!selectedUser ? selectedUser : users.length}</StatNumber>
      </Stat>
      <Text fontSize={12}>Showing data for:</Text>
      <Select
         onChange={e => {
            onChangeUser(e.target.value);
         }}
      >
         <option value={''}>All Users</option>
         {users.map(u => (
            <option key={u} value={u}>
               {u}
            </option>
         ))}
      </Select>
   </VStack>
);
