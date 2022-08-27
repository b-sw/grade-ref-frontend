import * as React from 'react';
import {
    chakra,
    Flex,
    IconButton,
    Spacer,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Column, Row, usePagination, useSortBy, useTable } from 'react-table';
import { uuid } from 'utils/uuid';
import { AxiosError } from 'axios';
import { UseMutationResult } from 'react-query';
import { useSetState } from 'hooks/useSetState';
import { useLeagueMatch } from 'hooks/useLeagueMatch';

interface EditModalProps<T> {
    isOpen: boolean;
    handleClose: () => void;
    initialValue: T;
}

export type DataTableProps<T extends object> = {
    data: T[];
    columns: Column<T>[];
    readOnly?: boolean;
    deleteMutation?: UseMutationResult<T, AxiosError<unknown, any>, uuid, unknown>;
    EditModal?: ({ isOpen, handleClose, initialValue }: EditModalProps<T>) => JSX.Element;
};

interface DataTableState<T extends object> {
    selected: T | null;
}

export function DataTable<T extends object & { id: uuid }>({
    data,
    columns,
    readOnly,
    deleteMutation,
    EditModal,
}: DataTableProps<T>) {
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
    const { query: matchQuery } = useLeagueMatch();
    const [state, setState] = useSetState({ selected: null } as DataTableState<T>);

    const handleClose = () => {
        setState({ selected: null });
        onEditModalClose();
    };

    const handleEdit = async (row: Row<T>) => {
        if (readOnly) {
            return;
        }
        setState({ selected: row.original });
        await matchQuery.refetch();
        onEditModalOpen();
    };

    const handleDelete = async (row: Row<T>) => {
        if (readOnly) {
            return;
        }
        if (deleteMutation) {
            await matchQuery.refetch();
            deleteMutation.mutate(row.original.id);
        }
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        { columns, data },
        useSortBy,
        usePagination,
    );

    return (
        <Flex overflowY={'scroll'}>
            {!readOnly && EditModal && (
                <EditModal isOpen={isEditModalOpen} handleClose={handleClose} initialValue={state.selected!} />
            )}
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    isNumeric={column.isNumeric}
                                >
                                    <Flex>
                                        <Text fontSize={'md'}>{column.render('Header')}</Text>
                                        <chakra.span pl="4">
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <TriangleDownIcon aria-label="sorted descending" />
                                                ) : (
                                                    <TriangleUpIcon aria-label="sorted ascending" />
                                                )
                                            ) : (
                                                <TriangleUpIcon aria-label="sorted ascending" opacity={0} />
                                            )}
                                        </chakra.span>
                                    </Flex>
                                </Th>
                            ))}
                            <Th />
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} role={'group'}>
                                {row.cells.map((cell: any) => (
                                    <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                                        {cell.render('Cell')}
                                    </Td>
                                ))}
                                <Td>
                                    <Flex _hover={{ child: { display: 'inherit' } }}>
                                        <Spacer />
                                        <Flex gap={2}>
                                            <IconButton
                                                variant={'ghost'}
                                                aria-label="edit"
                                                icon={<EditIcon />}
                                                opacity={0}
                                                cursor={'default'}
                                                _groupHover={{
                                                    opacity: readOnly ? 0 : 1,
                                                    cursor: readOnly ? 'default' : 'pointer',
                                                }}
                                                onClick={async () => {
                                                    await handleEdit(row);
                                                }}
                                            />
                                            <IconButton
                                                variant={'ghost'}
                                                aria-label="delete"
                                                icon={<DeleteIcon />}
                                                opacity={0}
                                                cursor={'default'}
                                                _groupHover={{
                                                    opacity: readOnly ? 0 : 1,
                                                    cursor: readOnly ? 'default' : 'pointer',
                                                }}
                                                onClick={async () => {
                                                    await handleDelete(row);
                                                }}
                                                isLoading={
                                                    deleteMutation?.isLoading &&
                                                    deleteMutation.variables === row.original.id
                                                }
                                            />
                                        </Flex>
                                    </Flex>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Flex>
    );
}
