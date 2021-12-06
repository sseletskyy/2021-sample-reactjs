import { FormEvent, FormEventHandler, VFC } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export const INPUT_LOGIN_NAME = "login";

const findLoginInput = (
  event: FormEvent<HTMLFormElement>
): HTMLInputElement | null =>
  event.currentTarget.children[0].children.namedItem(
    INPUT_LOGIN_NAME
  ) as HTMLInputElement;

export interface SearchProps {
  onSubmit(value: string): void;
}

export const Search: VFC<SearchProps> = ({ onSubmit }) => {
  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const inputElement = findLoginInput(event);
    inputElement?.value !== undefined && onSubmit(inputElement.value);
  };
  return (
    <Form onSubmit={submitHandler}>
      <InputGroup className="mb-3">
        <Form.Control
          name={INPUT_LOGIN_NAME}
          placeholder="Login"
          aria-label="login"
          type="text"
        />
        <Button variant="outline-secondary" aria-label="submit" type="submit">
          Submit
        </Button>
      </InputGroup>
    </Form>
  );
};
