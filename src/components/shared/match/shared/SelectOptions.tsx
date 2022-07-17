import {uuid} from "utils/uuid";

export interface SelectOptionsProps {
  data: any & { id: uuid }[];
  labelProps: string[];
}

export const SelectOptions = ({ data, labelProps }: SelectOptionsProps) => {
  return (
    <>
      {(data).map((d:  any & { id: uuid }) => (
        <option key={d.id} value={d.id}>
          {labelProps.map((prop) => d[prop]).join(' ')}
        </option>
      ))}
    </>
  );
}