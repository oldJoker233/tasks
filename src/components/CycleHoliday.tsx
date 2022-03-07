import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Holiday =
    | "Christmas"
    | "Dragon Boat Festival"
    | "Holloween"
    | "Spring Festival"
    | "Thanksgiving";

const BY_ALP: Record<Holiday, Holiday> = {
    Thanksgiving: "Christmas",
    Christmas: "Dragon Boat Festival",
    "Dragon Boat Festival": "Holloween",
    Holloween: "Spring Festival",
    "Spring Festival": "Thanksgiving"
};

const BY_TIME: Record<Holiday, Holiday> = {
    "Spring Festival": "Dragon Boat Festival",
    "Dragon Boat Festival": "Holloween",
    Holloween: "Thanksgiving",
    Thanksgiving: "Christmas",
    Christmas: "Spring Festival"
};

const EMOJ: Record<Holiday, string> = {
    Christmas: "🎄",
    "Dragon Boat Festival": "🎏",
    Holloween: "🎃",
    "Spring Festival": "🏮",
    Thanksgiving: "🦃"
};

export function CycleHoliday(): JSX.Element {
    const [value, setValue] = useState<Holiday>("Christmas");

    function byTime(): void {
        setValue(BY_TIME[value]);
    }

    function byAlp(): void {
        setValue(BY_ALP[value]);
    }
    //    function eMoj(): void{
    //        setValue(EMOJ[value]);
    //    }

    return (
        <div>
            <div>
                <Button onClick={() => byAlp()}>Advance by Alphabet</Button>{" "}
                {EMOJ[value]}
                <Button onClick={() => byTime()}>Advance by Year</Button>
            </div>
        </div>
    );
}
