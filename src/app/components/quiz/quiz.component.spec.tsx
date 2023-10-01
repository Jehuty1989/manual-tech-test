import { describe } from "node:test";
import Landing from "../../page";
import { act, render, screen, cleanup } from "@testing-library/react";
import { QuizMockDataInterface } from "../../api/quiz/mock-data/quiz.mock-data";
import QuizQuestionType from "../../components/quiz/quiz.component";

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

const startQuiz = (): void => screen.getByTestId("start-quiz-button").click();
const selectCorrectAnswer = (): void =>
  screen.getAllByTestId("quiz-answer")[0].click();
const selectWrongAnswer = (): void =>
  screen.getAllByTestId("quiz-answer")[1].click();
const nextQuestion = (): void => screen.getByTestId("quiz-next-button").click();

describe("Quiz", () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(QuizMockData),
      }),
    ) as jest.Mock;

    await act(async () => {
      render(<Landing />);
    });
  });

  afterEach(cleanup);

  it("renders the quiz", async () => {
    await act(async () => {
      startQuiz();
    });

    expect(screen.getByTestId("quiz-question").textContent).toBe("Question 1");
  });

  describe("selects a correct answer", () => {
    it("goes to next question", async () => {
      await act(async () => {
        startQuiz();
        selectCorrectAnswer();
      });
      await act(async () => {
        nextQuestion();
      });

      expect(screen.getByTestId("quiz-question").textContent).toBe(
        "Question 2",
      );
    });

    it("shows final button when quiz is finished", async () => {
      await act(async () => {
        startQuiz();
        selectCorrectAnswer();
      });
      await act(async () => {
        nextQuestion();
      });
      await act(async () => {
        selectCorrectAnswer();
      });
      await act(async () => {
        nextQuestion();
      });

      expect(screen.getByTestId("quiz-finish-button")).toBeInTheDocument();
    });
  });

  describe("select wrong answer", async () => {
    it("shows rejection message", async () => {
      await act(async () => {
        startQuiz();
        selectWrongAnswer();
      });

      expect(screen.getByTestId("quiz-rejection-message")).toBeInTheDocument();
    });

    it("next button is disabled after selection", async () => {
      await act(async () => {
        startQuiz();
        selectWrongAnswer();
      });

      expect(screen.getByTestId("quiz-next-button")).toHaveAttribute(
        "disabled",
      );
    });
  });
});
