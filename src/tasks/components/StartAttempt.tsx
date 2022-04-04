import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [count, setCount] = useState<number>(4);
    const [start, setStart] = useState<boolean>(false);

    function onStart(): void {
        if (count > 0) {
            setStart(true);
            setCount(count - 1);
        }
    }

    function onStop(): void {
        setStart(false);
    }
    function onMulligan(): void {
        setCount(count + 1);
    }

    return (
        <div>
            <Button onClick={onStart} disabled={count === 0 || start}>
                Start Quiz
            </Button>
            <Button onClick={onStop} disabled={!start}>
                Stop Quiz
            </Button>
            <Button onClick={onMulligan} disabled={start}>
                Mulligan
            </Button>
            {count}
        </div>
    );
}
