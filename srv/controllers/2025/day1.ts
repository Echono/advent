import { OnEventHandler, Request } from "@sap/cds";
import { TrackPerformance } from "../../util/performer";

enum directions {
    subtract = "L",
    add = "R" 
}

type recursionResult = {
    newDial: number,
    recursed: number
}

/* ########################## */
/* ######### PART 1 ######### */
/* ########################## */

export class pt1Day1Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {

        const timer = new TrackPerformance(true, "Day 1, Part 1");

        const { input } = req.data;

        const workload = ( input as string ).split("\n");

        let count = 0;
        let currentDial = 50;

        for(const turn of workload) {

            const direction = turn.slice(0,1);
            const steps = parseInt(turn.slice(1));

            const number = this.recursive(currentDial, steps, direction as directions);
            if(number === 100 || number === 0) {
                count++;
                currentDial = 0;
            } else {
                currentDial = number;
            }

        }

        timer.end();

        req.reply(count.toString());

    }

    private static recursive(current: number, steps: number, direction: directions): number {
        switch(direction) {
            case directions.add:
                const missingTo100 = 100 - current;
                if(steps > missingTo100) {
                    return this.recursive(0, steps - missingTo100, direction);
                } else {
                    return current + steps;
                }
            case directions.subtract:
                if(steps > current) {
                    return this.recursive(100, steps - current, direction);
                } else {
                    return current - steps;
                }
        }
    }

}

/* ########################## */
/* ######### PART 2 ######### */
/* ########################## */

export class pt2Day1Controller {

    public static main: OnEventHandler = async (req: Request): Promise<void> => {

        const timer = new TrackPerformance(true, "Day 1, Part 2");

        const { input } = req.data;

        const workload = ( input as string ).split("\n");

        let currentDial = 50;
        let count = 0;

        for(const turn of workload) {

            const direction = turn.slice(0,1);
            const steps = parseInt(turn.slice(1));

            const result: recursionResult = this.recursive(currentDial, steps, direction as directions, 0);
            count += result.recursed;
            if(result.newDial === 100 || result.newDial === 0) {
                count++;
                currentDial = 0;
            } else {
                currentDial = result.newDial;
            }

        }

        timer.end();

        req.reply(count.toString());

    }

    private static recursive(current: number, steps: number, direction: directions, recursed: number): recursionResult {
        switch(direction) {
            case directions.add:
                const missingTo100 = 100 - current;
                if(steps > missingTo100) {
                    return this.recursive(0, steps - missingTo100, direction, recursed + 1);
                } else {
                    return { newDial: current + steps, recursed };
                }
            case directions.subtract:
                if(steps > current) {
                    let currentRecursed = recursed;
                    if(current !== 0) {
                        currentRecursed++;
                    }
                    return this.recursive(100, steps - current, direction, currentRecursed);
                } else {
                    return { newDial: current - steps, recursed };
                }
        }
    }

}