import { Text } from "@chakra-ui/react";
import {Field} from "components/matchPage/components/Field";

export interface TextFieldProps {
  name: string;
  text: string;
}

export const TextField = ({ name, text } : TextFieldProps) => {
  const element: JSX.Element = (
      <Text fontSize={'xl'} fontWeight={'medium'}>{text}</Text>
  );

  return (
    <Field name={name} element={element} />
  );
}