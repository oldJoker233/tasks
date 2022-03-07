import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [count, setCount] = useState<number>(4);
    const [driving, setDriving] = useState<boolean>(false);

    function onStart(): void {
        if (count > 0) {
            setDriving(true);
            setCount(count - 1);
        }
    }

    function offStart(): boolean {
        if (count == 0 || driving) {
            return true;
        }
        return false;
    }

    function onStop(): void {
        setDriving(false);
    }
    function onMulligan(): void {
        setCount(count + 1);
    }

    return (
        <div>
            <Button onClick={onStart} disabled={count === 0 || driving}>
                Start Quiz
            </Button>
            <Button onClick={onStop} disabled={!driving}>
                Stop Quiz
            </Button>
            <Button onClick={onMulligan} disabled={driving}>
                Mulligan
            </Button>
            {count}
        </div>
    );
}
