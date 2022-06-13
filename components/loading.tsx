import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

export const Loading: React.FC = () => (
   <Flex mt={40} justifyContent={'center'} w='100%'>
      <Spinner />
   </Flex>
);
