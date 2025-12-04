import { OnEventHandler, Request } from "@sap/cds";
import { parseFileToString } from "../../util/parser";

type CoordinateKey = `${number}::${number}`;
type Grid = Map<CoordinateKey, string>
type GridCompilation = {
    papers: Grid,
    complete: Grid
}

enum Cell {
    paper = '@',
    empty = '.'
}

/* ########################## */
/* ######### PART 1 ######### */
/* ########################## */

export class pt1Day4Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {

        const { fileName } = req.data;

        const dir = __dirname + '/../../../inputs/2025/';
        const input = parseFileToString(dir + fileName);

        const workload = (input as string).split("\n");
        let result = 0;

        const grids: GridCompilation = createMaps(workload);
        for(const [key] of grids.papers) {

            let totalRolls = 0;

            const [row, col] = key.split("::").map(Number);

            // Determine any walls
            const leftWall = (col === 0);
            const rightWall = (col === workload[row].length - 1);
            const topWall = (row === 0);
            const bottomWall = (row === workload.length - 1);

            // Check paper rolls above the current row
            if(!topWall) {
                const aboveKey = createKey(row -1, col);
                const above = grids.complete.get(aboveKey);
                if(above === Cell.paper) {
                    totalRolls++;
                }
                const [aboveRow, aboveCol] = aboveKey.split("::").map(Number);
                const aboveLeftWall = (aboveCol === 0);
                const aboveRightWall = (aboveCol === workload[aboveRow].length - 1);

                if(!aboveLeftWall) {
                    const aboveLeft = grids.complete.get(createKey(aboveRow, aboveCol -1))
                    if(aboveLeft === Cell.paper) {
                        totalRolls++;
                    }
                }
                if(!aboveRightWall) {
                    const aboveRight = grids.complete.get(createKey(aboveRow, aboveCol +1))
                    if(aboveRight === Cell.paper) {
                        totalRolls++;
                    }
                }
            }

            // Check adjacent paper rolls
            if(!leftWall) {
                const left = grids.complete.get(createKey(row, col -1))
                if(left === Cell.paper) {
                    totalRolls++;
                }
            }
            if(!rightWall) {
                const right = grids.complete.get(createKey(row, col +1))
                if(right === Cell.paper) {
                    totalRolls++;
                }
            }

            // Check paper rolls below the current row
            if(!bottomWall) {
                const belowKey = createKey(row +1, col);
                const below = grids.complete.get(belowKey);
                if(below === Cell.paper) {
                    totalRolls++;
                }
                const [belowRow, belowCol] = belowKey.split("::").map(Number);
                const belowLeftWall = (belowCol === 0);
                const belowRightWall = (belowCol === workload[belowRow].length - 1);

                if(!belowLeftWall) {
                    const belowLeft = grids.complete.get(createKey(belowRow, belowCol -1))
                    if(belowLeft === Cell.paper) {
                        totalRolls++;
                    }
                }
                if(!belowRightWall) {
                    const belowRight = grids.complete.get(createKey(belowRow, belowCol +1))
                    if(belowRight === Cell.paper) {
                        totalRolls++;
                    }
                }
            }

            if(totalRolls < 4) {
                result++;
            }

        }

        req.reply(result.toString());

    }

}

/* ########################## */
/* ######### PART 2 ######### */
/* ########################## */

export class pt2Day4Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {

        const { input } = req.data;
        const workload = (input as string).split("\n");
        let result = 0;

    }
}

/* ########################### */
/* ######### HELPERS ######### */
/* ########################### */

export function createKey(row: number, col: number): CoordinateKey {
    return `${row}::${col}`;
}

export function createMaps(workload: string[]): GridCompilation {
    const completeGrid: Grid = new Map<CoordinateKey, string>();
    const paperGrid: Grid = new Map<CoordinateKey, string>();

    for (let i = 0; i < workload.length; i++) {
        const row = workload[i].split("");
        for (let x = 0; x < row.length; x++) {
            const key = createKey(i, x);
            completeGrid.set(key, row[x]);
            if (row[x] === Cell.paper) {
                paperGrid.set(key, row[x]);
            }
        }
    }

    return {
        papers: paperGrid,
        complete: completeGrid
    };
}
