import React, { useState } from "react";
import { Quiz } from "../interfaces/quiz";
import { Question, QuestionType } from "../interfaces/question";
import { QuizList } from "./QuizList";
import { AddQuizModal } from "./AddQuizModal";

import "./Quizzer.css";
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

export const Quizzer = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>(QUIZZES);
    const [showAddModal, setShowAddModal] = useState(false);

    function editQuiz(qId: number, newQuiz: Quiz) {
        setQuizzes(
            quizzes.map((q: Quiz): Quiz => (q.id === qId ? newQuiz : q))
        );
    }

    function addQuiz(title: string, body: string) {
        const newQuiz = {
            id: quizzes.length + 1,
            title: title,
            body: body,
            published: false,
            questionList: [] as Question[]
        };
        setQuizzes([...quizzes, newQuiz]);
    }

    function deleteQuiz(qId: number) {
        setQuizzes(quizzes.filter((q: Quiz): boolean => qId !== q.id));
    }

    const handleShowModal = () => setShowAddModal(true);
    const handleCloseModal = () => setShowAddModal(false);

    return (
        <div className="quizzer">
            <QuizList
                quizzes={quizzes}
                editQuiz={editQuiz}
                deleteQuiz={deleteQuiz}
                showModal={handleShowModal}
            ></QuizList>
            <AddQuizModal
                show={showAddModal}
                handleClose={handleCloseModal}
                addQuiz={addQuiz}
            ></AddQuizModal>
        </div>
    );
};
