import { Flex, FlexProps, Spacer, Text } from '@chakra-ui/react';

interface PanelProps {
    headerTitle: string;
    headerButtons?: JSX.Element | false;
    children?: (JSX.Element | false)[] | (JSX.Element | false);
    options?: FlexProps;
}

export const Panel = ({ headerTitle, headerButtons, children, options }: PanelProps) => {
    return (
        <Flex direction={'column'} overflow={'hidden'} flexGrow={1} {...options}>
            <Flex mb={1} mr={1} alignItems={'center'}>
                <Text fontWeight={'bold'} fontSize={'4xl'}>
                    {headerTitle}
                </Text>
                <Spacer />
                {headerButtons}
            </Flex>

            <Flex
                direction={'column'}
                borderRadius={10}
                p={5}
                backgroundColor={'gray.300'}
                shadow={'md'}
                overflow={'hidden'}
                flexGrow={1}
                maxH={['90vh', '100%']}
            >
                {children}
            </Flex>
        </Flex>
    );
};
