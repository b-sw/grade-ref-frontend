export interface AssignmentsEditModalProps {

}

export const AssignmentsEditModal = ({}: AssignmentsEditModalProps) => {
  return (
    <>
    </>
  );
}

// <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
//   <Flex align={'center'} gap={2} mr={5}>
//     <BiDetail size={'25'}/>
//     <Text fontSize={'2xl'} fontWeight={'medium'}>Match Details</Text>
//     <Spacer />
//     <Button
//       variant={'ghost'}
//       leftIcon={<EditIcon />}
//       onClick={onEditOpen}
//     >
//       Edit
//     </Button>
//   </Flex>
//
//   <Flex
//     direction={'column'}
//     w={'100%'}
//     borderRadius={10}
//     backgroundColor={'gray.200'}
//     p={5}
//   >
//     <Flex direction={'column'} pr={[0, 20]} gap={2}>
//       <Flex gap={5}>
//         <Flex w={'50%'}>
//           <Spacer />
//           <Text fontSize={'xl'}>date</Text>
//         </Flex>
//         <Flex w={'50%'}>
//           <Text fontSize={'xl'} fontWeight={'medium'}>{matchDate}</Text>
//           <Spacer />
//         </Flex>
//       </Flex>
//
//       <Flex gap={5}>
//         <Flex w={'50%'}>
//           <Spacer />
//           <Text fontSize={'xl'}>time</Text>
//         </Flex>
//         <Flex w={'50%'}>
//           <Text fontSize={'xl'} fontWeight={'medium'}>{matchTime}</Text>
//           <Spacer />
//         </Flex>
//       </Flex>
//
//       <Flex gap={5}>
//         <Flex w={'50%'}>
//           <Spacer />
//           <Text fontSize={'xl'}>stadium</Text>
//         </Flex>
//         <Flex w={'50%'}>
//           <Text fontSize={'xl'} fontWeight={'medium'}>{props.match.stadium}</Text>
//           <Spacer />
//         </Flex>
//       </Flex>
//
//       <Flex gap={5}>
//         <Flex w={'50%'}>
//           <Spacer />
//           <Text fontSize={'xl'}>home team</Text>
//         </Flex>
//         <Flex w={'50%'}>
//           <Text fontSize={'xl'} fontWeight={'medium'}>{props.homeTeam.name}</Text>
//           <Spacer />
//         </Flex>
//       </Flex>
//
//       <Flex gap={5} mb={5}>
//         <Flex w={'50%'}>
//           <Spacer />
//           <Text fontSize={'xl'}>away team</Text>
//         </Flex>
//         <Flex w={'50%'}>
//           <Text fontSize={'xl'} fontWeight={'medium'}>{props.awayTeam.name}</Text>
//           <Spacer />
//         </Flex>
//       </Flex>
//
//       <Flex gap={5}>
//         <Flex w={'50%'}>
//           <Spacer />
//           <Text fontSize={'xl'}>grade</Text>
//         </Flex>
//         <Flex w={'50%'} align={'center'}>
//           <Badge variant={'outline'} colorScheme={props.match.gradeStatus.badgeScheme} fontSize={'md'} w={'auto'}>
//             {props.match.refereeGrade ?? 'N/A'}
//           </Badge>
//           <Spacer />
//         </Flex>
//       </Flex>
//
//       <Flex gap={5}>
//         <Flex w={'50%'}>
//           <Spacer />
//           <Text fontSize={'xl'}>grade date</Text>
//         </Flex>
//         <Flex w={'50%'} gap={2}>
//           <Text fontSize={'xl'} fontWeight={'medium'}>{refereeGradeDate}</Text>
//           {props.match.gradeStatus.delay &&
//             <HStack>
//               <Tooltip label='delay'>
//                 <WarningIcon color={'red.600'}/>
//               </Tooltip>
//               <Text color={'red.600'}>+{props.match.gradeStatus.delay}</Text>
//             </HStack>
//           }
//           <Spacer />
//         </Flex>
//       </Flex>
//
//       <Flex gap={5}>
//         <Flex w={'50%'} align={'center'}>
//           <Spacer />
//           <Text fontSize={'xl'}>overall grade</Text>
//         </Flex>
//         <Flex w={'50%'}>
//           <Textarea
//             isReadOnly={true}
//             resize={'none'}
//             value={props.match.overallGrade ?? 'N/A'}
//             borderColor={'gray.400'}
//             focusBorderColor={'gray.400'}
//             backgroundColor={'gray.100'}
//             _hover={{}}
//           />
//         </Flex>
//       </Flex>
//
//       <Flex gap={5}>
//         <Flex w={'50%'}>
//           <Spacer />
//           <Text fontSize={'xl'}>overall grade date</Text>
//         </Flex>
//         <Flex w={'50%'}>
//           <Text fontSize={'xl'} fontWeight={'medium'}>{overallGradeDate}</Text>
//         </Flex>
//       </Flex>
//
//     </Flex>
//   </Flex>
// </Flex>