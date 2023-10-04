import Landing from "./page";
import { act, render, screen } from "@testing-library/react";
import { QuizMockDataInterface } from "./api/quiz/mock-data/quiz.mock-data";
import QuizQuestionType from "./components/quiz/quiz.component";

const QuizMockData: QuizMockDataInterface = {
  questions: [
    {
      question: "Question 1",
      type: QuizQuestionType.ChoiceType,
      options: [
        {
          display: "Q1 Answer 1",
          value: "Q1A1",
          isRejection: false,
        },
        {
          display: "Q1 Answer 2",
          value: "Q1A2",
          isRejection: true,
        },
        {
          display: "Q1 Answer 3",
          value: "Q1A3",
          isRejection: false,
        },
      ],
    },
    {
      question: "Question 2",
      type: QuizQuestionType.ChoiceType,
      options: [
        {
          display: "Q2 Answer 1",
          value: "Q2A1",
          isRejection: false,
        },
        {
          display: "Q2 Answer 2",
          value: "Q2A2",
          isRejection: false,
        },
        {
          display: "Q2 Answer 3",
          value: "Q2A3",
          isRejection: true,
        },
      ],
    },
  ],
};

describe("Landing page", () => {
  it("renders the page", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(QuizMockData),
      }),
    ) as jest.Mock;

    await act(async () => {
      render(<Landing />);
    });

    expect(screen.getByTestId("landing-quiz-heading").textContent).toBe(
      "Be good to yourself",
    );
  });
});
