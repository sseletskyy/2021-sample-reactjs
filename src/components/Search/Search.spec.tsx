import { Search, SearchProps } from "./Search";
import { fireEvent, render, screen } from "@testing-library/react";

const defaultProps: SearchProps = {
  onSubmit() {},
};

interface SetupReturn {
  inputElement: HTMLInputElement;
  submitElement: HTMLButtonElement;
}
const setup = (overrideProps: SearchProps = defaultProps): SetupReturn => {
  const props = {
    ...defaultProps,
    ...overrideProps,
  };
  render(<Search {...props} />);
  const inputElement = screen.getByRole<HTMLInputElement>("textbox");
  const submitElement = screen.getByRole<HTMLButtonElement>("button");
  return {
    inputElement,
    submitElement,
  };
};
describe("Search", () => {
  it("should have Login text input", () => {
    const { inputElement } = setup();
    expect(inputElement).toBeTruthy();
    expect(inputElement.placeholder).toEqual("Login");
  });
  it("should have submit button", () => {
    const { submitElement } = setup();
    expect(submitElement).toBeTruthy();
    expect(submitElement.textContent).toEqual("Submit");
  });
  describe("when input is set and form submitted", () => {
    it("should trigger onSubmit with input value", () => {
      // arrange
      const inputValue = "alpha";
      const submitHandler = jest.fn();
      const { inputElement, submitElement } = setup({
        onSubmit: submitHandler,
      });
      fireEvent.change(inputElement, { target: { value: inputValue } });

      // act
      fireEvent.click(submitElement);

      // assert
      expect(submitHandler).toHaveBeenCalledTimes(1);
      expect(submitHandler).toHaveBeenLastCalledWith(inputValue);
    });
  });
});
