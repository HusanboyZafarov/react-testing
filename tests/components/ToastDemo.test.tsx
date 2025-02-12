import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToastDemo from "../../src/components/ToastDemo";
import { Toaster } from "react-hot-toast";

describe("ToastDemo", () => {
  it("should render a success toast when button is clicked", async () => {
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    const toasts = await screen.findByText(/success/i);
    expect(toasts).toBeInTheDocument();
  });
});
