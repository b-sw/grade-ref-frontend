import {Button, Flex, Input, InputGroup, InputLeftElement, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {AdminCreateModal} from "./AdminCreateModal";
import {useUsers} from "hooks/useUsers";
import {scrollbarStyle} from "../../dashboard/shared/styles";
import {User} from "entities/User";
import {AdminListItem} from "./AdminListItem";
import { MdSearch } from 'react-icons/md';
import {useSetState} from "hooks/useSetState";
import {useEffect} from "react";
import {userFilter} from "../../shared/filters";

interface State {
  admins: User[],
  filter: string,
}

export const OwnerAdminsPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { adminsQuery } = useUsers();

  const [state, setState] = useSetState({
    admins: [],
    filter: '',
  } as State);

  useEffect(() => {
    const filteredAdmins: User[] = userFilter(adminsQuery.data!, state.filter);
    setState({ admins: filteredAdmins });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter, adminsQuery.data]);

  return (
    <>
      <AdminCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      <Flex
        direction={'column'}
        borderRadius={10}
        p={5}
        backgroundColor={'gray.300'}
        shadow={'md'}
        overflowY={'hidden'}
        flexGrow={1}
        h={'50%'}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Admins
          </Text>
          <Spacer />
          <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
            Add
          </Button>
        </Flex>

        <InputGroup>
          <InputLeftElement
            pointerEvents={'none'}
            children={<MdSearch />}
          />
          <Input
            mb={2}
            placeholder={'Search admin'}
            onChange={(event) => setState({ filter: event.target.value })}
          />
        </InputGroup>

        <Flex direction={'column'} gap={2} overflowY={'scroll'} css={scrollbarStyle}>
          {state.admins.map((admin: User) =>
              <AdminListItem key={admin.id} admin={admin} />
          )}
        </Flex>
      </Flex>
    </>
  );
}