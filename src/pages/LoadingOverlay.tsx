import { Flex, Spinner } from '@chakra-ui/react';

export const LoadingOverlay = () => {
    return (
        <Flex p={4} m={0} h={['100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'gray.400'}>
            <Flex flexGrow={1} flexDirection={'column'} justifyContent={'center'}>
                <Flex justifyContent={'center'}>
                    <Spinner size="xl" />
                </Flex>
            </Flex>
        </Flex>
    );
};
