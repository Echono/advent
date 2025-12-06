import { OnEventHandler, Request } from "@sap/cds";
import { parseFileToString } from "../../util/parser";
import { TrackPerformance } from "../../util/performer";

/* ########################## */
/* ######### PART 1 ######### */
/* ########################## */

export class pt1Day6Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        const timer = new TrackPerformance(true, "Day 6, Part 1");
        const { fileName } = req.data;
        const workload = parseData(fileName);
        let result = 0;

        timer.end();
        req.reply(result.toString());
    }
}

/* ########################## */
/* ######### PART 2 ######### */
/* ########################## */

export class pt2Day6Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        const timer = new TrackPerformance(true, "Day 6, Part 2");
        const { fileName } = req.data;
        const workload = parseData(fileName);
        let result = 0;

        timer.end();
        req.reply(result.toString());
    }
}

/* ########################## */
/* ######### PARSER ######### */
/* ########################## */

export function parseData(fileName: string): string[] {
    const dir = __dirname + '/../../../inputs/2025/';
    const input = parseFileToString(dir + fileName);
    const workload = (input as string).split("\n");
    return workload;
}