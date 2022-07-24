import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  IconButton,
  Flex,
  Spacer,
  useDisclosure
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  TriangleDownIcon,
  TriangleUpIcon
} from "@chakra-ui/icons";
import { useTable, useSortBy, Column, usePagination } from "react-table";
import { uuid } from 'utils/uuid';
import { AxiosError } from "axios";
import { UseMutationResult } from "react-query";
import { useSetState } from 'hooks/useSetState';

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
  // EditModal?: React.ComponentType<{ isOpen: boolean, handleClose: () => void, value: T }>;
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
  const [state, setState] = useSetState({ selected: null } as DataTableState<T>);

  const handleClose = () => {
    setState({ selected: null });
    onEditModalClose();
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <>
      {
        !readOnly && EditModal &&
        <EditModal isOpen={isEditModalOpen} handleClose={handleClose} initialValue={state.selected!} />
      }
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps()
                  )}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
              <Th/>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} role={'group'}>
                {row.cells.map((cell: any) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
                <Td>
                  <Flex _hover={{ child: { display: 'inherit'} }}>
                    <Spacer />
                    <Flex gap={2}>
                      <IconButton
                        variant={'ghost'}
                        aria-label='edit'
                        icon={<EditIcon />}
                        opacity={0}
                        cursor={'default'}
                        _groupHover={{ opacity: readOnly ? 0 : 1, cursor: readOnly ? 'default' : 'pointer' }}
                        onClick={() => {
                          setState({ selected: row.original });
                          onEditModalOpen();
                        }}
                      />
                      <IconButton
                        variant={'ghost'}
                        aria-label='delete'
                        icon={<DeleteIcon />}
                        opacity={0}
                        cursor={'default'}
                        _groupHover={{ opacity: readOnly ? 0 : 1, cursor: readOnly ? 'default' : 'pointer' }}
                        onClick={(_) => { deleteMutation?.mutate(row.original.id) }}
                        isLoading={deleteMutation?.isLoading && deleteMutation.variables === row.original.id}
                      />
                    </Flex>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}
