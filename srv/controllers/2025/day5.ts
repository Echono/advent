import { OnEventHandler, Request } from "@sap/cds";
import { parseFileToString } from "../../util/parser";

type IDRange = {
    min: number,
    max: number
}

type ParsedData = {
    ranges: IDRange[],
    ids: number[]
}

/* ########################## */
/* ######### PART 1 ######### */
/* ########################## */

export class pt1Day5Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        
        const { fileName } = req.data;
        const workload = parseData(fileName);
        let result = 0;

        for(const id of workload.ids) {
            const isValid = recursiveCheck(workload.ranges, id);
            if(isValid) {
                result++;
            }
        }

        req.reply(result.toString());   

    }
}

/* ########################### */
/* ######### HELPERS ######### */
/* ########################### */

export function recursiveCheck(ranges: IDRange[], id: number): boolean {
    let result = false;

    const midPoint = Math.floor(ranges.length / 2);

    const checkRange = ranges[midPoint];
    
    // If the recursive gets to a point where there's only one range left
    if(ranges.length === 1) {
        if(id >= checkRange.min && id <= checkRange.max) {
            return true;
        } else {
            return false;
        }
    }

    // If the id is just straight in the range
    if(id >= checkRange.min && id <= checkRange.max) {
        result = true;
    }

    // Check right side
    if(!result && id > checkRange.max) {
        const rightSide = ranges.slice(midPoint + 1);
        if(rightSide.length > 0) {
            result = recursiveCheck(rightSide, id);
        }
    }

    // check left side
    if(!result && id < checkRange.max) {
        const leftSide = ranges.slice(0, midPoint);
        if(leftSide.length > 0) {
            result = recursiveCheck(leftSide, id);
        }
    }

    return result;
}

/* ########################## */
/* ######### PART 2 ######### */
/* ########################## */

export class pt2Day5Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        
        const { fileName } = req.data;
        const workload = parseData(fileName);

    }
}

/* ########################## */
/* ######### PARSER ######### */
/* ########################## */

export function parseData(fileName: string): ParsedData {
    const returnData = {
        ranges: [],
        ids: []
    } as ParsedData;

    const dir = __dirname + '/../../../inputs/2025/';
    const input = parseFileToString(dir + fileName);
    const workload = (input as string).split("\n");

    for(const line of workload) {
        if(!line) {
            continue;
        }
        if(line.includes("-")) {
            const [min, max] = line.split("-").map((num) => parseInt(num));
            const range = { min, max };
            returnData.ranges.push(range);
        } else {
            const id = parseInt(line);
            returnData.ids.push(id);
        }
    }

    returnData.ranges.sort((a, b) => a.min - b.min);
    returnData.ranges = fixOverlaps(returnData.ranges);

    return returnData;
}

export function fixOverlaps(ranges: IDRange[]): IDRange[] {
    const fixedRanges: IDRange[] = [];
    for(let i = 0; i < ranges.length; i++) {
        const newRange = {...ranges[i]} as IDRange;
        let rangeOverlap = true;
        for(let j = i + 1; j < ranges.length && rangeOverlap; j++) {
            if(newRange.max >= ranges[j].min) {
                newRange.max = Math.max(newRange.max, ranges[j].max);
                i = j;
            } else {
                rangeOverlap = false;
            }
        }
        fixedRanges.push(newRange);
    }
    return fixedRanges;
}