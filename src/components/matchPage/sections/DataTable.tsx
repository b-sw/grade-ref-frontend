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
  Spacer
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  TriangleDownIcon,
  TriangleUpIcon
} from "@chakra-ui/icons";
import { useTable, useSortBy, Column, usePagination } from "react-table";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: Column<Data>[];
};

export function DataTable<Data extends object>({
                                                 data,
                                                 columns
                                               }: DataTableProps<Data>,
                                               readOnly?: boolean,
                                               /*onDelete?: (id: string) => void,
                                               onEdit?: (id: string) => void*/) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
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
                      // onClick={onEdit}
                    />
                    <IconButton
                      variant={'ghost'}
                      aria-label='delete'
                      icon={<DeleteIcon />}
                      opacity={0}
                      cursor={'default'}
                      _groupHover={{ opacity: readOnly ? 0 : 1, cursor: readOnly ? 'default' : 'pointer' }}
                      // onClick={onDelete}
                    />
                  </Flex>
                </Flex>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
