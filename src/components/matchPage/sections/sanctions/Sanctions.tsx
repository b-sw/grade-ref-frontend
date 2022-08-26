import { Badge, Button, Flex, Icon, Spacer, useDisclosure } from '@chakra-ui/react';
import { MdWarning } from 'react-icons/md';
import { IoIosShirt } from 'react-icons/io';
import { Column } from 'react-table';
import * as React from 'react';
import { DataTable } from 'components/matchPage/components/DataTable';
import { Card, Foul } from 'entities/Foul';
import { Team } from 'entities/Team';
import { uuid } from 'utils/uuid';
import { AddIcon } from '@chakra-ui/icons';
import { timeItem } from 'components/dashboard/matches/MatchListItem';
import { useStore } from 'zustandStore/store';
import { Role } from 'utils/Role';
import { NoRecords } from 'components/utils/NoRecords';
import { SectionHeading } from 'components/matchPage/components/SectionHeading';
import { SanctionAddModal } from 'components/matchPage/sections/sanctions/modals/SanctionAddModal';
import { SectionBody } from 'components/matchPage/components/SectionBody';
import { Section } from 'components/matchPage/components/Section';
import { useMatchFouls } from 'components/matchPage/sections/sanctions/useMatchFouls';
import { SanctionEditModal } from 'components/matchPage/sections/sanctions/modals/SanctionEditModal';
import { useTranslation } from 'react-i18next';

interface SanctionsProps {
    teams: Team[];
}

export const Sanctions = ({ teams }: SanctionsProps) => {
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const { query: foulsQuery, deleteMutation } = useMatchFouls();
    const mappedTeams: { [id: uuid]: Team } = {};
    const user = useStore((state) => state.user);
    const { t } = useTranslation();

    teams.forEach((team) => (mappedTeams[team.id] = team));

    const validityValues = {
        [true.toString()]: t('matchPage.sanctions.correct'),
        [false.toString()]: t('matchPage.sanctions.incorrect'),
    };

    const headers = {
        minute: t('matchPage.sanctions.minute'),
        card: t('matchPage.sanctions.card'),
        player: t('matchPage.sanctions.player'),
        team: t('matchPage.sanctions.team'),
        description: t('matchPage.sanctions.description'),
        validity: t('matchPage.sanctions.validity'),
    };

    const cardBadges: { [key: string]: JSX.Element } = {
        [Card.Yellow]: (
            <Badge colorScheme={'yellow'} variant={'solid'}>
                {t('matchPage.sanctions.yellow')}
            </Badge>
        ),
        [Card.Red]: (
            <Badge colorScheme={'red'} variant={'solid'}>
                {t('matchPage.sanctions.red')}
            </Badge>
        ),
    };

    const cols: Column<Foul>[] = [
        {
            Header: headers.minute,
            accessor: (d) => d.minute,
            Cell: (props: any) => (
                <Flex>
                    <Spacer />
                    {timeItem(props.value.toString())}
                    <Spacer />
                </Flex>
            ),
        },

        {
            Header: headers.card,
            accessor: (d) => d.card,
            Cell: (props: any) => cardBadges[props.value],
        },
        {
            Header: headers.player,
            accessor: (d) => d.playerNumber,
            Cell: (props: any) => (
                <Flex alignItems={'center'}>
                    <IoIosShirt />
                    {props.value}
                </Flex>
            ),
        },
        {
            Header: headers.team,
            accessor: (d) => mappedTeams[d.teamId].name,
        },
        {
            Header: headers.description,
            accessor: 'description',
        },
        {
            id: 'valid',
            Header: headers.validity,
            accessor: (d) => d.valid.toString(),
            Cell: (props: any) => (
                <Badge variant={'outline'} colorScheme={props.value === 'true' ? 'linkedin' : 'gray'}>
                    {validityValues[props.value]}
                </Badge>
            ),
        },
    ];

    const userCanEdit: boolean = user.role === Role.Observer;

    return (
        <>
            {userCanEdit && <SanctionAddModal isOpen={isAddOpen} handleClose={onAddClose} />}

            <Section>
                <SectionHeading title={t('matchPage.sanctions.title')} icon={<Icon as={MdWarning} boxSize={25} />}>
                    <Button
                        variant={'ghost'}
                        leftIcon={<Icon as={AddIcon} />}
                        onClick={onAddOpen}
                        disabled={!userCanEdit}
                    >
                        {t('modal.add')}
                    </Button>
                </SectionHeading>

                <SectionBody>
                    <>
                        <DataTable
                            columns={cols}
                            data={foulsQuery.data!}
                            readOnly={!userCanEdit}
                            deleteMutation={deleteMutation}
                            EditModal={SanctionEditModal}
                        />
                        {!foulsQuery.data!.length && NoRecords(t('noRecords'))}
                    </>
                </SectionBody>
            </Section>
        </>
    );
};
