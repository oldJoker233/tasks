import React, { useState } from "react";
import { Form } from "react-bootstrap";

const CHOICE = ["A", "B", "C"];
export function MultipleChoiceQuestion({
    options,
    expectedAnswer
}: {
    options: string[];
    expectedAnswer: string;
}): JSX.Element {
    const [choice, setChoice] = useState<string>(options[0]);

    function updateOption(event: React.ChangeEvent<HTMLSelectElement>) {
        setChoice(event.target.value);
    }

    return (
        <div>
            <h3>Multiple Choice Question</h3>
            <Form.Group controlId="userChoice">
                <Form.Label>What is your choice? Answer is B</Form.Label>
                <Form.Select value={choice} onChange={updateOption}>
                    {CHOICE.map((color: string) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {choice === expectedAnswer ? <span>✔️</span> : <span>❌</span>}
        </div>
    );
}
