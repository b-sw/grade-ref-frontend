import { Flex } from '@chakra-ui/react';

interface PageProps {
    children: JSX.Element[];
    child?: JSX.Element;
}

export const Page = ({ children, child }: PageProps) => {
    return (
        <Flex
            p={[2, 4]}
            m={0}
            h={['auto', '100vh']}
            direction={'column'}
            overflow={'hidden'}
            backgroundColor={'gray.400'}
        >
            {...children}
            {child}
        </Flex>
    );
};
