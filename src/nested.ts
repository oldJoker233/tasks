import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const publishedQ = questions.filter(
        (question: Question): boolean => question.published
    );
    return publishedQ;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const newQarray = [...questions];
    const nonEmptyQ = newQarray.filter(
        (question: Question): boolean =>
            question.body !== "" ||
            question.expected !== "" ||
            question.options.length > 0
    );
    return nonEmptyQ;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const checkedId = questions.find(
        (question: Question): boolean => question.id === id
    );
    if (checkedId === undefined) {
        return null;
    }
    return checkedId;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const checkedId = questions.filter(
        (question: Question): boolean => question.id !== id
    );
    if (checkedId === []) {
        return [];
    }
    return checkedId;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    const nameList = questions.map(
        (question: Question): string => question.name
    );
    return nameList;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const listOfpoints = questions.map(
        (questions: Question): number => questions.points
    );
    const sum = listOfpoints.reduce(
        (total: number, point: number) => total + point,
        0
    );
    return sum;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const listOfP = questions.filter(
        (question: Question): boolean => question.published === true
    );
    const listOfpoints = listOfP.map(
        (questions: Question): number => questions.points
    );
    const sum = listOfpoints.reduce(
        (total: number, point: number) => total + point,
        0
    );
    return sum;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const headers = "id,name,options,points,published\n";
    const QCSV = questions.map(
        (question: Question): string =>
            question.id +
            "," +
            question.name +
            "," +
            question.options.length +
            "," +
            question.points +
            "," +
            question.published +
            "\n"
    );
    return headers + QCSV.join("").trim();
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    const copyToAns = questions.map((question: Question): Answer => {
        return {
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false
        };
    });
    return copyToAns;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const publish = questions.map(
        (question: Question): Question => ({ ...question, published: true })
    );
    return publish;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    const checkType = questions.every(
        (question: Question): boolean => question.type === questions[0].type
    );
    return checkType;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const backup = [...questions];
    const isTargertIn = questions.filter(
        (question: Question): boolean => question.id !== targetId
    );
    if (isTargertIn.length === questions.length) {
        return backup;
    }
    const findTargertIdx = questions.findIndex(
        (question: Question): boolean => question.id === targetId
    );
    const target = backup[findTargertIdx];
    const newTarget = { ...target, name: newName };
    //console.log(backup.splice(findTargertIdx, 1, newTarget));
    backup.splice(findTargertIdx, 1, newTarget);
    return backup;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const backup = [...questions];
    const isTargertIn = questions.filter(
        (question: Question): boolean => question.id !== targetId
    );
    if (isTargertIn.length === questions.length) {
        return backup;
    }
    const findTargertIdx = questions.findIndex(
        (question: Question): boolean => question.id === targetId
    );
    const target = backup[findTargertIdx];
    if (target.type !== "multiple_choice_question") {
        const newtarget = { ...target, type: newQuestionType };
        backup.splice(findTargertIdx, 1, newtarget);
        return backup;
    } else {
        const newtarget2 = { ...target, type: newQuestionType, options: [] };
        backup.splice(findTargertIdx, 1, newtarget2);
        return backup;
    }
    return [];
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
) {
    const backup = [...questions];
    const isTargertIn = questions.filter(
        (question: Question): boolean => question.id !== targetId
    );
    if (isTargertIn.length === questions.length) {
        return backup;
    }
    const findTargertIdx = questions.findIndex(
        (question: Question): boolean => question.id === targetId
    );
    const target = backup[findTargertIdx];
    if (targetOptionIndex === -1) {
        const newTarget = {
            ...target,
            options: [...target.options, newOption]
        };
        backup.splice(findTargertIdx, 1, newTarget);
        return backup;
    } else if (targetOptionIndex >= 0) {
        const newOptions = target.options.map((option: string): string =>
            option === target.options[targetOptionIndex] ? newOption : option
        );
        const newTarget2 = {
            ...target,
            options: newOptions
        };
        backup.splice(findTargertIdx, 1, newTarget2);
        return backup;
    }
    return [];
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    const backup = [...questions];
    const isTargertIn = questions.filter(
        (question: Question): boolean => question.id !== targetId
    );
    if (isTargertIn.length === questions.length) {
        return backup;
    }
    const findTargertIdx = questions.findIndex(
        (question: Question): boolean => question.id === targetId
    );
    const target = backup[findTargertIdx];
    backup.splice(findTargertIdx + 1, 0, duplicateQuestion(newId, target));
    return backup;
}
