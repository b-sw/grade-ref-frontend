import { uuid } from 'utils/uuid';

interface SelectOptionsProps {
  data: any & { id: uuid }[];
  labelProps: string[];
}

export const SelectOptions = ({ data, labelProps }: SelectOptionsProps) => {
  return (
    <>
      {data.map((d: any & { id: uuid }) => (
        <option key={d.id} value={d.id}>
          {labelProps.map((prop) => d[prop]).join(' ')}
        </option>
      ))}
    </>
  );
};

interface SelectOptionsConstantProps {
  valuesMap: { [key: string]: any };
}

export const SelectOptionsConstant = ({ valuesMap }: SelectOptionsConstantProps) => {
  return (
    <>
      {Object.keys(valuesMap).map((key) => (
        <option key={key} value={valuesMap[key]}>
          {key}
        </option>
      ))}
    </>
  );
};
