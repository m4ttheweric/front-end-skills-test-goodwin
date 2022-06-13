import {
   Flex,
   RangeSlider,
   RangeSliderFilledTrack,
   RangeSliderMark,
   RangeSliderThumb,
   RangeSliderTrack,
   Stat,
   StatGroup,
   StatLabel,
   StatNumber,
   Text,
   Tooltip,
   VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ServerLogEntry } from '../models';
const labelStyles = {
   mt: '2',
   ml: '-4',
   fontSize: 'sm'
};
interface FileStatsProps {
   minFileSize: number;
   maxFileSize: number;
   uploads: ServerLogEntry[];
   downloads: ServerLogEntry[];
   onRangeChange: (range: number[]) => void;
}

export const FileStats: React.FC<FileStatsProps> = ({
   minFileSize: min,
   maxFileSize: max,
   uploads,
   downloads,
   onRangeChange = () => {}
}) => {
   const [sliderValue, setSliderValue] = useState([min, max]);

   return (
      <Flex p={8} border={'solid 1px #ddd'} boxShadow={'md'} borderRadius={8}>
         <VStack alignItems='flex-start'>
            <StatGroup>
               <Stat mr='8'>
                  <StatLabel># Uploads</StatLabel>
                  <StatNumber>{uploads.length}</StatNumber>
               </Stat>
               <Stat>
                  <StatLabel whiteSpace={'nowrap'}># Downloads</StatLabel>
                  <StatNumber>{downloads.length}</StatNumber>
               </Stat>
            </StatGroup>
            <Text fontSize={12}>Filter by file size:</Text>
            <Flex h={5} />
            <RangeSlider
               aria-label={['min', 'max']}
               defaultValue={[min, max]}
               min={min}
               max={max}
               onChange={range => setSliderValue(range)}
               onChangeEnd={range => onRangeChange(range)}
            >
               <RangeSliderTrack>
                  <RangeSliderFilledTrack />
               </RangeSliderTrack>
               <Tooltip
                  hasArrow
                  bg='blue.500'
                  placement='top'
                  isOpen={true}
                  label={`${sliderValue[0]}kb`}
               >
                  <RangeSliderThumb index={0} />
               </Tooltip>
               <Tooltip
                  hasArrow
                  bg='blue.500'
                  placement='top'
                  isOpen={true}
                  label={`${sliderValue[1]}kb`}
               >
                  <RangeSliderThumb index={1} />
               </Tooltip>
            </RangeSlider>
         </VStack>
      </Flex>
   );
};
