import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): JSX.Element {
    const [valueL, setValueL] = useState<number>(1);
    const [valueR, setValueR] = useState<number>(2);

    return (
        <>
            <span>
                <Button onClick={() => setValueL(d6)}>Roll Left</Button>
                {valueL}
            </span>
            <span>
                <Button onClick={() => setValueR(d6)}>Roll Right</Button>
                {valueR}
            </span>
            <div>
                {valueL === valueR && valueR !== 1 ? (
                    <span>You Win!</span>
                ) : valueL === valueR && valueR === 1 ? (
                    <span>You lose!</span>
                ) : (
                    <span>Roll!</span>
                )}
            </div>
        </>
    );
}
