import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import * as React from 'react';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import { Dashboard } from '../components/dashboard';
import { Loading } from '../components/loading';
import { ServerLogEntry } from '../models/ServerLogEntry';

const Home: NextPage = () => {
   const [logs, setLogs] = React.useState<ServerLogEntry[]>([]);
   const [loading, setLoading] = React.useState(true);

   React.useEffect(() => {
      axios
         .get<ServerLogEntry[]>('/api/logs')
         .then(({ data: logs }) => {
            setLogs(logs);
         })
         .finally(() => {
            setLoading(false);
         });
   }, []);

   return (
      <Flex maxW={1800} m='auto' direction='column' p={{ base: 4, md: 10 }}>
         <ColorModeSwitcher alignSelf={'flex-end'} />
         {loading ? <Loading /> : <Dashboard logs={logs} />}
      </Flex>
   );
};

export default Home;
