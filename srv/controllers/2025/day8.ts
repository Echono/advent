import { OnEventHandler, Request } from "@sap/cds";
import { parseFileToString } from "../../util/parser";
import { TrackPerformance } from "../../util/performer";
import { ci } from "../../../jest.config";

/* ##################################### */
/* ######### Classes and Types ######### */
/* ##################################### */

export type Workload = {
    junctions: Junction[];
}

export type Coordinates = {
    x: number;
    y: number;
    z: number;
}

export class Junction {

    private coordinates: Coordinates;
    private circuit?: Circuit;

    constructor(x: number, y: number, z: number) {
        this.coordinates = { x, y, z };
    }

    public getCoordinates(): Coordinates {
        return this.coordinates;
    }

    public setCircuit(circuit: Circuit): void {
        this.circuit = circuit;
    }

    public getCircuit(): Circuit | undefined {
        return this.circuit;
    }

    public isInCircuit(): boolean {
        return this.circuit !== undefined;
    }

    public createKey(): string {
        return `${this.coordinates.x}::${this.coordinates.y}::${this.coordinates.z}`;
    }

    public distanceTo(other: Junction): number {
        const x = (this.coordinates.x - other.getCoordinates().x) ** 2;
        const y = (this.coordinates.y - other.getCoordinates().y) ** 2;
        const z = (this.coordinates.z - other.getCoordinates().z) ** 2;
        return Math.sqrt(x + y + z);
    }

}

export class Range {

    private pointA: Junction;
    private pointB: Junction;
    private distance: number;

    constructor(pointA: Junction, pointB: Junction) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.distance = pointA.distanceTo(pointB);
    }

    public getPointA(): Junction {
        return this.pointA;
    }

    public getPointB(): Junction {
        return this.pointB;
    }

    public getDistance(): number {
        return this.distance;
    }

}

export class Circuit {

    private junctions: Junction[] = [];

    constructor(junction?: Junction) {
        if(junction) {
            this.addJunction(junction);
        }
    }

    public addJunction(junction: Junction): void {
        this.junctions.push(junction);
        junction.setCircuit(this);
    }

    public getLength(): number {
        return this.junctions.length;
    }

    public consume(circuit: Circuit): void {
        for(const junction of circuit.junctions) {
            this.addJunction(junction);
        }
    }

}

/* ########################## */
/* ######### PART 1 ######### */
/* ########################## */

export class pt1Day8Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        const timer = new TrackPerformance(true, "Day 8, Part 1");
        const { fileName, iterations } = req.data;
        const workload = parseData(fileName);

        let result = 1;
        const ranges: Range[] = [];

        for(let compareJunction = 0; compareJunction < workload.junctions.length; compareJunction++) {
            for(let toJunction = compareJunction + 1; toJunction < workload.junctions.length; toJunction++) {
                const range = new Range(workload.junctions[compareJunction], workload.junctions[toJunction]);
                ranges.push(range);
            }
        }
        ranges.sort((a, b) => a.getDistance() - b.getDistance());

        for(let i = 0; i < parseInt(iterations); i++) {
            const range = ranges[i];
            if(range.getPointA().getCircuit() === range.getPointB().getCircuit()) {
                continue;
            }
            if(range.getPointA().getCircuit() !== range.getPointB().getCircuit()) {
                range.getPointA().getCircuit()!.consume(range.getPointB().getCircuit()!);
            }
        }
        const circuits: Circuit[] = [];
        for(const junction of workload.junctions) {
            if(circuits.includes(junction.getCircuit()!)) {
                continue;
            }
            circuits.push(junction.getCircuit()!);
        }

        circuits.sort((a, b) => b.getLength() - a.getLength());

        for(let i = 0; i < 3; i++) {
            result = result * circuits[i].getLength();
        }

        timer.end();
        req.reply(result.toString());
    }
}

/* ########################## */
/* ######### PART 2 ######### */
/* ########################## */

export class pt2Day8Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        const timer = new TrackPerformance(true, "Day 8, Part 2");
        const { fileName } = req.data;
        const workload = parseData(fileName);

        let result = 1;
        const ranges: Range[] = [];

        for(let compareJunction = 0; compareJunction < workload.junctions.length; compareJunction++) {
            for(let toJunction = compareJunction + 1; toJunction < workload.junctions.length; toJunction++) {
                const range = new Range(workload.junctions[compareJunction], workload.junctions[toJunction]);
                ranges.push(range);
            }
        }
        ranges.sort((a, b) => a.getDistance() - b.getDistance());

        let latestRange;
        for(let i = 0; i < ranges.length; i++) {
            const range = ranges[i];
            if(range.getPointA().getCircuit() === range.getPointB().getCircuit()) {
                continue;
            }
            if(range.getPointA().getCircuit() !== range.getPointB().getCircuit()) {
                range.getPointA().getCircuit()!.consume(range.getPointB().getCircuit()!);
                latestRange = range;
            }
        }
        const circuits: Circuit[] = [];
        for(const junction of workload.junctions) {
            if(circuits.includes(junction.getCircuit()!)) {
                continue;
            }
            circuits.push(junction.getCircuit()!);
        }

        result = latestRange?.getPointA().getCoordinates().x! * latestRange?.getPointB().getCoordinates().x!;

        timer.end();
        req.reply(result.toString());
    }
}

/* ########################## */
/* ######### PARSER ######### */
/* ########################## */

export function parseData(fileName: string): Workload {
    const dir = __dirname + '/../../../inputs/2025/';
    const input = parseFileToString(dir + fileName);
    const parsed = (input as string).split("\n");
    const workload: Workload = { junctions: [] };
    for (const line of parsed) {
        const [x, y, z] = line.split(",").map(Number);
        const junction = new Junction(x, y, z);
        junction.setCircuit(new Circuit(junction));
        workload.junctions.push(junction);
    }
    return workload;
}