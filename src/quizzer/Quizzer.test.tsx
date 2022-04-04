import React from "react";
import { render, screen } from "@testing-library/react";
import { Quiz } from "../interfaces/quiz";
import { Question, QuestionType } from "../interfaces/question";
import { Quizzer } from "./Quizzer";
import userEvent from "@testing-library/user-event";
import sample from "../data/quizzes.json";

const QUIZZES = sample.map(
    (quiz): Quiz => ({
        ...quiz,
        questionList: quiz.questionList.map(
            (q): Question => ({
                ...q,
                submission: "",
                type: q.type as QuestionType
            })
        )
    })
);

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
    });
    test("Users can add a new quiz", () => {
        const button = screen.getByText("Add New Quiz");
        expect(screen.queryByLabelText("Title: ")).not.toBeInTheDocument();
        button.click();
        expect(screen.queryByLabelText("Title:")).toBeInTheDocument();
        const saveButton = screen.getByText("Save Changes");
        saveButton.click();
        expect(screen.queryByText("Example Quiz")).toBeInTheDocument();
    });

    test("Users can see a list of quizzes, including the quizzes title, description, and how many questions it has", () => {
        for (let i = 0; i < QUIZZES.length; i++) {
            expect(screen.queryByText(QUIZZES[i].title)).toBeInTheDocument();
            expect(
                screen.queryByText(
                    QUIZZES[i].questionList.length + " question",
                    { exact: false }
                )
            ).toBeInTheDocument();
            expect(
                screen.queryByText(QUIZZES[i].body, { exact: false })
            ).toBeInTheDocument();
        }
    });

    test("Users can enter or choose an answer for a quiz question, and be told if they are correct", () => {
        const text = screen.getByText("Simple_Questions");
        text.click();
        expect(screen.queryByText("Exit")).toBeInTheDocument();
        expect(
            screen.queryByText("What is 2+2?", { exact: false })
        ).toBeInTheDocument();
        const selectOption = screen.getAllByTestId("select-option")[0];
        expect(screen.queryByText("✔️")).not.toBeInTheDocument();
        userEvent.type(selectOption, "4");
        const submitButton = screen.getAllByText("Submit")[0];
        submitButton.click();
        expect(screen.queryByText("✔️")).toBeInTheDocument();
    });

    test("Users can see how many total points they have earned", () => {
        const text = screen.getByText("Simple_Questions");
        text.click();
        expect(screen.queryByText(/\d\/\d/)).toBeInTheDocument();
    });

    test("Users can delete an existing quiz", () => {
        const text = screen.getByText("Simple_Questions");
        text.click();
        const editButton = screen.getByText("Edit");
        editButton.click();

        const deleteButton = screen.getByText("Delete Quiz");
        deleteButton.click();

        expect(screen.queryByText("Simple_Questions")).not.toBeInTheDocument();
    });

    test("Users can delete an existing quiz question", () => {
        const text = screen.getByText("Simple_Questions");
        text.click();

        expect(
            screen.queryByText("What is 2+2?", { exact: false })
        ).toBeInTheDocument();

        const editButton = screen.getByText("Edit");
        editButton.click();

        const deleteButton = screen.getAllByText("Delete")[0];
        deleteButton.click();

        const saveButton = screen.getByText("Save");
        saveButton.click();

        expect(
            screen.queryByText("What is 2+2?", { exact: false })
        ).not.toBeInTheDocument();
    });

    test("Users can add a new quiz question", () => {
        const text = screen.getByText("Simple_Questions");
        text.click();

        expect(
            screen.queryByText("Example Question", { exact: false })
        ).not.toBeInTheDocument();

        const editButton = screen.getByText("Edit");
        editButton.click();

        const addButton = screen.getByText("Add Question");
        addButton.click();

        const quizPublished = screen.getByTestId("Quiz Published");
        quizPublished.click();
        expect(quizPublished).not.toBeChecked();

        const saveButton = screen.getByText("Save");
        saveButton.click();

        expect(
            screen.queryByText("Example Question", { exact: false })
        ).toBeInTheDocument();
    });

    test("Users can edit the questions and fields of a quiz", () => {
        const text = screen.getByText("Simple_Questions");
        text.click();
        const editButton = screen.getByText("Edit");
        editButton.click();

        const questionTitle = screen.getAllByTestId("edit_question_title")[0];
        userEvent.type(questionTitle, " test");

        const saveButton = screen.getByText("Save");
        saveButton.click();

        expect(
            screen.queryByText(QUIZZES[1].questionList[0].body + " test", {
                exact: false
            })
        ).toBeInTheDocument();
    });
});
