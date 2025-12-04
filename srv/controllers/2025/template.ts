import { OnEventHandler, Request } from "@sap/cds";
import { parseFileToString } from "../../util/parser";

/* ########################## */
/* ######### PART 1 ######### */
/* ########################## */

export class pt1DayxyController {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        
        const { fileName } = req.data;
        const dir = __dirname + '/../../../inputs/2025/';
        const input = parseFileToString(dir + fileName);
        const workload = (input as string).split("\n");
        let result = 0;

    }
}

/* ########################## */
/* ######### PART 2 ######### */
/* ########################## */

export class pt2DayxyController {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        
        const { fileName } = req.data;
        const dir = __dirname + '/../../../inputs/2025/';
        const input = parseFileToString(dir + fileName);
        const workload = (input as string).split("\n");
        let result = 0;

    }
}