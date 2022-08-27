import { TabList as ChakraTabList } from '@chakra-ui/react';

interface TabListProps {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
}

export const TabList = ({ children }: TabListProps) => {
    return (
        <ChakraTabList mx={5} my={2} gap={5}>
            {children}
        </ChakraTabList>
    );
};
