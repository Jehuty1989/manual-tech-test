import { act, render, screen } from "@testing-library/react";
import QuizError from "./quiz-error.component";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Quiz Error", () => {
  it("renders the page if there is an error fetching the quiz", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject("Quiz loading error"),
      }),
    ) as jest.Mock;

    await act(async () => {
      render(<QuizError />);
    });

    expect(screen.getByTestId("quiz-error-heading").textContent).toBe(
      "Quiz failed to load",
    );
  });
});
