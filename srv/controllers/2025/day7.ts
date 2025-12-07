import { OnEventHandler, Request } from "@sap/cds";
import { parseFileToString } from "../../util/parser";
import { TrackPerformance } from "../../util/performer";

/* ########################## */
/* ######### PART 1 ######### */
/* ########################## */

export class pt1Day7Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        const timer = new TrackPerformance(true, "Day 7, Part 1");
        const { fileName } = req.data;
        const workload = parseData(fileName);
        let result =  0;

        let beams: number[] = [];
        beams.push(workload.tachyon.getCoordinates().x);

        for(let line = 1; line < workload.grid.length; line++) {
            const newBeams: number[] = [];
            const removeableBeams: number[] = [];
            for(const beam of beams) {
                const cell = workload.grid[line][beam];
                switch(cell.getType()) {
                    case CellType.EMPTY:
                        cell.setType(CellType.BEAM);
                        break;
                    case CellType.SPLITTER:
                        result++;
                        removeableBeams.push(beam);
                        if(!cell.isLeftWall()) {
                            const leftCell = workload.grid[line][beam - 1];
                            if(leftCell.getType() === CellType.EMPTY) {
                                leftCell.setType(CellType.BEAM);
                                newBeams.push(leftCell.getCoordinates().x);
                            }
                        }
                        if(!cell.isRightWall()) {
                            const rightCell = workload.grid[line][beam + 1];
                            if(rightCell.getType() === CellType.EMPTY) {
                                rightCell.setType(CellType.BEAM);
                                newBeams.push(rightCell.getCoordinates().x);
                            }
                        }
                        break;
                }
            }
            beams = beams.concat(newBeams);
            beams = Array.from(new Set(beams));
            for(const removeable of removeableBeams) {
                const index = beams.indexOf(removeable);
                if(index > -1) {
                    beams.splice(index, 1);
                }
            }
        }

        /* ######################## */
        /* ### Draw the tree :) ### */
        /* ######################## */

        // for(const line of workload.grid) {
        //     let lineString = "";
        //     for(const cell of line) {
        //         lineString += cell.getType();
        //     }
        //     console.log(lineString);
        // }

        timer.end();
        req.reply(result.toString());
    }
}

/* ########################## */
/* ######### PART 2 ######### */
/* ########################## */

export class pt2Day7Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        const timer = new TrackPerformance(true, "Day 7, Part 2");
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

enum CellType {
    TACHYON = 'S',
    EMPTY = '.',
    SPLITTER = '^',
    BEAM = '|'
}

type Coordinates = {
    x: number,
    y: number
}

type CellWalls = {
    left?: boolean,
    right?: boolean,
    top?: boolean,
    bottom?: boolean
}

export class Cell {
    
    private type: CellType;
    private coordinates: Coordinates;
    
    private leftWall: boolean;
    private rightWall: boolean;
    private topWall: boolean;
    private bottomWall: boolean;

    constructor(type: CellType, x: number, y: number, walls?: CellWalls) {
        this.type = type;
        this.coordinates = { x, y };

        this.leftWall = walls?.left ?? false;
        this.rightWall = walls?.right ?? false;
        this.topWall = walls?.top ?? false;
        this.bottomWall = walls?.bottom ?? false;
    }

    public isTachyon(): boolean {
        return this.type === CellType.TACHYON;
    }

    public setType(type: CellType): void {
        if(type === CellType.TACHYON) {
            throw new Error("Cannot change cell to Tachyon type");
        }
        if(type === CellType.SPLITTER) {
            throw new Error("Cannot change cell to Splitter type");
        }
        if(this.isTachyon()) {
            throw new Error("Cannot change Tachyon cell to another type");
        }
         this.type = type;
    }

    public getType(): CellType {
        return this.type;
    }

    public getCoordinates(): Coordinates {
        return this.coordinates;
    }

    public isAnyWall(): boolean {
        return this.leftWall || this.rightWall || this.topWall || this.bottomWall;
    }

    public isLeftWall(): boolean {
        return this.leftWall;
    }

    public isRightWall(): boolean {
        return this.rightWall;
    }

    public isTopWall(): boolean {
        return this.topWall;
    }

    public isBottomWall(): boolean {
        return this.bottomWall;
    }

}

type Workload = {
    grid: Cell[][],
    tachyon: Cell
}

export function parseData(fileName: string): Workload {
    const dir = __dirname + '/../../../inputs/2025/';
    const input = parseFileToString(dir + fileName);
    const parsed = (input as string).split("\n");

    let tachyon: Cell;
    const grid: Cell[][] = [];
    
    for(let line = 0; line < parsed.length; line++) {

        const cellLine: Cell[] = [];

        for(let col = 0; col < parsed[line].length; col++) {

            const cellWalls = {
                left: col === 0,
                right: col === parsed[line].length - 1,
                top: line === 0,
                bottom: line === parsed.length - 1
            }
            const type = parsed[line][col] as CellType;
            const cell = new Cell(type, col, line, cellWalls);

            if(cell.isTachyon()) {
                tachyon = cell;
            }

            cellLine.push(cell);

        }

        grid.push(cellLine);
    }

    const workload: Workload = {
        grid: grid,
        tachyon: tachyon!
    }

    return workload;

}