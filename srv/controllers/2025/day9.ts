import { OnEventHandler, Request } from "@sap/cds";
import { parseFileToString } from "../../util/parser";
import { TrackPerformance } from "../../util/performer";

/* ##################################### */
/* ######### Classes and Types ######### */
/* ##################################### */

enum Axis {
    HORIZONTAL,
    VERTICAL
}

enum Direction {
    LEFT,
    RIGHT,
    UP,
    DOWN
}

export class Square {

    public area: number;
    public cornorA: Position;
    public cornorB: Position;
    public manhattanDistance: number;

    constructor(cornorA: Position, cornorB: Position) {
        this.cornorA = cornorA;
        this.cornorB = cornorB;
        this.area = this.computeArea();
        this.manhattanDistance = cornorA.manhattanDistanceTo(cornorB);
    }

    private computeArea(): number {
        const width = Math.abs((this.cornorA.x - this.cornorB.x) + 1);
        const height = Math.abs((this.cornorA.y - this.cornorB.y) + 1);
        const size = width * height;
        return size;
    }

    public getMinX(): number {
        return Math.min(this.cornorA.x, this.cornorB.x);
    }

    public getMaxX(): number {
        return Math.max(this.cornorA.x, this.cornorB.x);
    }

    public getMinY(): number {
        return Math.min(this.cornorA.y, this.cornorB.y);
    }

    public getMaxY(): number {
        return Math.max(this.cornorA.y, this.cornorB.y);
    }

    public intersectsWith(square: Square): boolean {
        return (this.getMinX() < square.getMaxX() &&
                this.getMaxX() > square.getMinX() &&
                this.getMinY() < square.getMaxY() &&
                this.getMaxY() > square.getMinY());
    }

    public centerPosition(): Position {
        const centerX = Math.floor((this.cornorA.x + this.cornorB.x) / 2);
        const centerY = Math.floor((this.cornorA.y + this.cornorB.y) / 2);
        return new Position(centerX, centerY);
    }

}

export class Position {

    public x: number;
    public y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public createSquareWith(position: Position): Square {
        return new Square(this, position);
    }

    public manhattanDistanceTo(position: Position): number {
        const distX = Math.abs(this.x - position.x);
        const distY = Math.abs(this.y - position.y);
        return distX + distY;
    }

}

export class Edge {
    public from: Position;
    public to: Position;
    public Axis: Axis;

    constructor(from: Position, to: Position) {
        this.from = from;
        this.to = to;
        this.Axis = this.computeAxis();
    }

    private computeAxis(): Axis {
        if(this.from.x === this.to.x) {
            return Axis.VERTICAL;
        } else {
            return Axis.HORIZONTAL;
        }
    }
}

type Workload = {
    positions: Position[];
    edges: Edge[];
}

/* ########################## */
/* ######### PART 1 ######### */
/* ########################## */

export class pt1Day9Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        const timer = new TrackPerformance(true, "Day 9, Part 1");
        const { fileName } = req.data;
        const workload = parseData(fileName);
        const positions = workload.positions;
        let result = 0;

        const squares: number[] = [];

        for(let i = 0; i < positions.length; i++) {
            for(let j = i + 1; j < positions.length; j++) {
                const square = positions[i].createSquareWith(positions[j]);
                squares.push(square.area);
            }
        }

        squares.sort((a, b) => a - b);
        result = squares[squares.length - 1];

        timer.end();
        req.reply(result.toString());
    }
}

/* ########################## */
/* ######### PART 2 ######### */
/* ########################## */

export class pt2Day9Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        const timer = new TrackPerformance(true, "Day 9, Part 2");
        const { fileName } = req.data;
        const workload = parseData(fileName);
        let result = 0;

        for(let i = 0; i < workload.positions.length; i++) {
            for(let j = i + 1; j < workload.positions.length; j++) {
                const square = workload.positions[i].createSquareWith(workload.positions[j]);
                // Check wether the area of this current square is lower then the best found so far
                if(square.area < result) {
                    continue;
                }
                // Check wether this square intersects with any edges
                if(checkIntersection(workload.edges, square)) {
                    continue;
                }
                // Use raycast from center of square to figure our if its inside polygon
                if(checkInside(workload.edges, square.centerPosition(), Direction.LEFT)
                    && checkInside(workload.edges, square.centerPosition(), Direction.RIGHT)
                    && checkInside(workload.edges, square.centerPosition(), Direction.UP)
                    && checkInside(workload.edges, square.centerPosition(), Direction.DOWN)) {
                    continue;
                }
                result = square.area;
            }
        }

        timer.end();
        req.reply(result.toString());
    }
}

export function checkInside(edges: Edge[], point: Position, direction: Direction): boolean {
    const axis = (direction === Direction.LEFT || direction === Direction.RIGHT) ? Axis.VERTICAL : Axis.HORIZONTAL;
    const pointCoordinate = axis === Axis.VERTICAL ? point.x : point.y;
    let count = 0;
    for(const edge of edges) {
        if(edge.Axis !== axis) {
            // if the edge is not the counter direction of ray
            continue;
        }
        switch(direction) {
            case Direction.LEFT:
                if(edge.from.x < pointCoordinate) count++;
                break;
            case Direction.RIGHT:
                if(edge.from.x > pointCoordinate) count++;
                break;
            case Direction.UP:
                if(edge.from.y > pointCoordinate) count++;
                break;
            case Direction.DOWN:
                if(edge.from.y < pointCoordinate) count++;
                break;
        }
    }
    if(count % 2 === 0) {
        return false;
    } else {
        return true;
    }
}

export function checkIntersection(edges: Edge[], squareB: Square): boolean {
    for(const edge of edges) {
        const squareA = edge.from.createSquareWith(edge.to);
        if(squareA.intersectsWith(squareB)) {
            return true;
        }
    }
    return false;
}

/* ########################## */
/* ######### PARSER ######### */
/* ########################## */

export function parseData(fileName: string): Workload {
    const dir = __dirname + '/../../../inputs/2025/';
    const input = parseFileToString(dir + fileName);
    const parsed = (input as string).split("\n");
    const workload: Workload = {
        positions: [],
        edges: []
    };

    for(const line of parsed) {
        const [ x, y ] = line.split(",").map(Number);
        workload.positions.push(new Position(x, y));
    }

    for(let positionIndex = 0; positionIndex < workload.positions.length; positionIndex++) {
        const startEdge = workload.positions[positionIndex];
        const endEdge = workload.positions.length === positionIndex + 1 ? workload.positions[0] : workload.positions[positionIndex + 1];
        workload.edges.push(new Edge(startEdge, endEdge));
    }

    return workload;
}