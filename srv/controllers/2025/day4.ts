import { OnEventHandler, Request } from "@sap/cds";
import { parseFileToString } from "../../util/parser";

enum Cell {
    paper = '@',
    empty = '.'
}

/* ########################## */
/* ######### PART 1 ######### */
/* ########################## */

type CoordinateKey = `${number}::${number}`;
type Grid = Map<CoordinateKey, string>
type GridCompilation = {
    papers: Grid,
    complete: Grid
}

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

/* ########################## */
/* ######### PART 2 ######### */
/* ########################## */

type GridCell = {
    topWall: boolean,
    rightWall: boolean,
    bottomWall: boolean,
    leftWall: boolean
    row: number,
    col: number,
    value: Cell,
    markedForDeletion: boolean
}

type GridMap = Map<CoordinateKey, GridCell>;

type LoopResult = {
    validCells: number,
    fullGrid: GridMap
}

enum FilterType {
    paper,
    marked
}

export class pt2Day4Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        const { fileName } = req.data;
        const input = parseFileToString(__dirname + '/../../../inputs/2025/' + fileName);
        const workload = (input as string).split("\n");
        let result = 0;
        let changes = true;

        let grid = createGridMap(workload);
        let workGrid: GridMap = filterMap(grid, FilterType.paper);

        while(changes) {
            const loopResult = loop(workGrid, grid);
            if(loopResult.validCells === 0) {
                changes = false;
            } else {
                result += loopResult.validCells;
                grid = loopResult.fullGrid;
                for(const [key] of filterMap(grid, FilterType.marked)) {
                    grid.get(key)!.value = Cell.empty;
                }
                workGrid = filterMap(grid, FilterType.paper);
            }
        }

        req.reply(result.toString());
    }
}

/* ########################### */
/* ######### HELPERS ######### */
/* ########################### */

export function loop(workGrid: GridMap, fullGrid: GridMap): LoopResult {

    const result = {
        validCells: 0,
        fullGrid: fullGrid
    } as LoopResult;

    for(const [key, cell] of workGrid) {
        const surroundingPapers = getNumberOfSurroundingPapers(cell, fullGrid);
        if(surroundingPapers < 4) {
            result.validCells++;
            result.fullGrid.get(key)!.markedForDeletion = true;
        }
    }

    return result;

}

export function filterMap(grid: GridMap, type: FilterType): GridMap {
    const filtered: GridMap = new Map<CoordinateKey, GridCell>();
    switch(type) {
        case FilterType.marked:
            for(const [key, cell] of grid) {
                if(cell.markedForDeletion) {
                    filtered.set(key, cell);
                }
            }
            break;
        case FilterType.paper:
            for(const [key, cell] of grid) {
                if(cell.value === Cell.paper) {
                    filtered.set(key, cell);
                }
            }
            break;
    }
    return filtered;
}

export function createGridMap(workload: string[]): GridMap {

    const map: GridMap = new Map<CoordinateKey, GridCell>();

    for (let i = 0; i < workload.length; i++) {
        const row = workload[i].split("");
        for (let x = 0; x < row.length; x++) {
            const cell: GridCell = {
                topWall: (i === 0),
                rightWall: (x === row.length -1),
                bottomWall: (i === workload.length -1),
                leftWall: (x === 0),
                row: i,
                col: x,
                value: row[x] as Cell,
                markedForDeletion: false
            };
            map.set(createKey(i, x), cell);
        }
    }

    return map;
    
}

export function getNumberOfSurroundingPapers(cell: GridCell, grid: GridMap): number {
    let total = 0;

    // Check above
    if(!cell.topWall) {
        const aboveCell = grid.get(createKey(cell.row -1, cell.col));
        if(aboveCell!.value === Cell.paper) {
            total++;
        }
        if(!aboveCell!.leftWall) {
            const aboveLeftCell = grid.get(createKey(cell.row -1, cell.col -1));
            if(aboveLeftCell!.value === Cell.paper) {
                total++;
            }
        }
        if(!aboveCell!.rightWall) {
            const aboveRightCell = grid.get(createKey(cell.row -1, cell.col +1));
            if(aboveRightCell!.value === Cell.paper) {
                total++;
            }
        }
    }

    // Check left
    if(!cell.leftWall) {
        const leftCell = grid.get(createKey(cell.row, cell.col -1));
        if(leftCell!.value === Cell.paper) {
            total++;
        }
    }

    // Check right
    if(!cell.rightWall) {
        const rightCell = grid.get(createKey(cell.row, cell.col +1));
        if(rightCell!.value === Cell.paper) {
            total++;
        }
    }
    
    // Check below
    if(!cell.bottomWall) {
        const belowCell = grid.get(createKey(cell.row +1, cell.col));
        if(belowCell!.value === Cell.paper) {
            total++;
        }
        if(!belowCell!.leftWall) {
            const belowLeftCell = grid.get(createKey(cell.row +1, cell.col -1));
            if(belowLeftCell!.value === Cell.paper) {
                total++;
            }
        }
        if(!belowCell!.rightWall) {
            const belowRightCell = grid.get(createKey(cell.row +1, cell.col +1));
            if(belowRightCell!.value === Cell.paper) {
                total++;
            }
        }
    }

    return total;
}