import {Box, Button, Divider, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {ObserverCreateModal} from "./ObserverCreateModal";
import {useUsers} from "../../../hooks/useUsers";
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {User} from "../../../entities/User";
import {ObserverListItem} from "./ObserverListItem";

export const ObserversPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { observersQuery } = useUsers();

  return (
    <>
      <ObserverCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      <Flex
        direction={'column'}
        borderRadius={10}
        backgroundColor={'gray.750'}
        p={7}
        shadow={'dark-lg'}
        overflowY={'hidden'}
        flexGrow={1}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Observers
          </Text>
          <Spacer />
          <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
            Add
          </Button>
        </Flex>

        <Box overflowY={'scroll'} css={scrollbarStyle}>
          {observersQuery.data &&
            observersQuery.data.map((observer: User, i: number) => (
              <div key={observer.id}>
                <ObserverListItem observer={observer} />
                {i < observersQuery.data.length - 1 && <Divider />}
              </div>
            ))}
        </Box>
      </Flex>
    </>
  );
}