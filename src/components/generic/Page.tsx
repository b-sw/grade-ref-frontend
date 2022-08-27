import { Flex } from '@chakra-ui/react';

interface PageProps {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
}

export const Page = ({ children }: PageProps) => {
    return (
        <Flex
            p={[2, 4]}
            m={0}
            h={['auto', '100vh']}
            direction={'column'}
            overflow={'hidden'}
            backgroundColor={'gray.400'}
        >
            {children}
        </Flex>
    );
};
