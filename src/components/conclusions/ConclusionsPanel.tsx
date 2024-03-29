import { Flex, Spacer, Text } from '@chakra-ui/react';
import { useUserFeatures } from 'hooks/useUserFeatures';
import { DataTable } from 'components/matchPage/components/DataTable';
import { NoRecords } from 'components/utils/NoRecords';
import { Feature, FeatureType } from 'entities/Feature';
import { Column } from 'react-table';
import { useTranslation } from 'react-i18next';

export const ConclusionsPanel = () => {
    const { query: featuresQuery } = useUserFeatures();
    const { t } = useTranslation();

    const headers = [t('conclusions.type'), t('conclusions.description')];

    const cols: Column<Feature>[] = [
        {
            Header: headers[0],
            accessor: (d) => d.type,
            Cell: (props: any) => (
                <Text fontWeight={'medium'} color={props.value === FeatureType.Positive ? 'green.500' : 'red.400'}>
                    {props.value}
                </Text>
            ),
        },
        {
            Header: headers[1],
            accessor: 'description',
        },
    ];

    return (
        <Flex flexGrow={1} overflowY={'hidden'} gap={4} p={4} m={-4}>
            <Spacer />

            <Flex
                direction={'column'}
                borderRadius={10}
                p={4}
                backgroundColor={'gray.300'}
                shadow={'md'}
                overflowY={'hidden'}
                alignItems={'center'}
                flexGrow={1}
                maxH={['90vh', '100%']}
                gap={4}
            >
                <Flex
                    direction={'column'}
                    w={'100%'}
                    h={'100%'}
                    borderRadius={10}
                    backgroundColor={'gray.200'}
                    p={5}
                    overflowY={'scroll'}
                >
                    <DataTable columns={cols} data={featuresQuery.data!} readOnly={true} />
                    {!featuresQuery.data!.length && NoRecords(t('noRecords'))}
                </Flex>
            </Flex>

            <Spacer />
        </Flex>
    );
};
