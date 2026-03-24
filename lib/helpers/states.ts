import { randomArray } from "@helpers/randomArray";

export function randomState() {
    const states = ["California", "New York", "Texas", "Florida", "Illinois"];
    return randomArray(states);
}