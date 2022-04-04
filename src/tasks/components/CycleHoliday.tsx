import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Holiday =
    | "Christmas"
    | "DragonBoatFestival"
    | "Holloween"
    | "SpringFestival"
    | "Thanksgiving";

const BY_ALP: Record<Holiday, Holiday> = {
    Thanksgiving: "Christmas",
    Christmas: "DragonBoatFestival",
    DragonBoatFestival: "Holloween",
    Holloween: "SpringFestival",
    SpringFestival: "Thanksgiving"
};

const BY_TIME: Record<Holiday, Holiday> = {
    SpringFestival: "DragonBoatFestival",
    DragonBoatFestival: "Holloween",
    Holloween: "Thanksgiving",
    Thanksgiving: "Christmas",
    Christmas: "SpringFestival"
};

const EMOJ: Record<Holiday, string> = {
    Christmas: "Holiday: 🎄",
    DragonBoatFestival: "Holiday: 🎏",
    Holloween: "Holiday: 🎃",
    SpringFestival: "Holiday: 🏮",
    Thanksgiving: "Holiday: 🦃"
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
