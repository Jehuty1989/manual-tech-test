import { act, render, screen } from "@testing-library/react";
import Landing from "../../page";

describe("Quiz Error", () => {
  it("renders the page if there is an error fetching the quiz", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject("Quiz loading error"),
      }),
    ) as jest.Mock;

    await act(async () => {
      render(<Landing />);
    });

    expect(screen.getByTestId("quiz-error-heading").textContent).toBe(
      "Quiz failed to load",
    );
  });
});
