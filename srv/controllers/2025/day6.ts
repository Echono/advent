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

        for(let i = 0; i < workload.numbers[0].length; i++) {
            let lineResult = 0;
            const lineNumbers: number[] = [];
            const operator = workload.operators[i];
            
            for(const line of workload.numbers) {
                lineNumbers.push(line[i]);
            } 
            
            switch(operator) {
                case Operator.ADD:
                    lineResult = lineNumbers.reduce((a, b) => a + b, 0);
                    break;
                case Operator.MULTIPLY:
                    lineResult = lineNumbers.reduce((acc, current) => acc * current, 1);
                    break;
            }
            result += lineResult;
        }

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
        const workload = parserForPt2(fileName);
        let result = 0;

        for(const line of workload.numbers) {
            const operator =  workload.operators[workload.numbers.indexOf(line)];
            const dataLine = new DataLine(operator, line);
            result += dataLine.compute();
        }

        timer.end();
        req.reply(result.toString());
    }
}

export class DataLine {

    private workingLine: number[];
    private operator: Operator;

    constructor(operator: Operator, line: string[]) {
        this.operator = operator;
        this.workingLine = this.constructWorkLine(line);
    }

    private constructWorkLine(line: string[]): number[] {

        const workline: number[] = [];

        for(let i = 0; i < line[0].length; i ++) {
            let newNumber = "";
            for(const num of line) {
                if(num[i] !== 'x') {
                    newNumber += num[i];
                }
            }
            workline.push(parseInt(newNumber));
        }

        return workline;

    }

    public compute(): number {
        
        let lineResult = 0;

        switch(this.operator) {
            case Operator.ADD:
                lineResult = this.workingLine.reduce((a, b) => a + b, 0);
                break;
            case Operator.MULTIPLY:
                lineResult = this.workingLine.reduce((acc, current) => acc * current, 1);
                break;
        }

        return lineResult;

    }

}

/* ########################## */
/* ######### PARSER ######### */
/* ########################## */

enum Operator {
    ADD = '+',
    MULTIPLY = '*',
    SUBTRACT = '-',
    DIVIDE = '/',
}

type DataTpye = {
    numbers: number[][],
    operators: Operator[]
}

type DataTpyePt2 = {
    numbers: string[][],
    operators: Operator[]
}

export function parseData(fileName: string): DataTpye {
    const dir = __dirname + '/../../../inputs/2025/';
    const input = parseFileToString(dir + fileName);
    const workload = (input as string).split("\n");

    const preFilteredData: string[][] = [];

    for(const line of workload) {
        const parts = line.split(" ").filter(part => part);
        preFilteredData.push(parts);
    }

    const opreators: Operator[] = preFilteredData.pop()!.map(op => op as Operator);

    const data: DataTpye = {
        numbers: preFilteredData.map(arr => arr.map(num => parseInt(num))),
        operators: opreators
    };

    return data;
}

export function parserForPt2(fileName: string): DataTpyePt2 {
    const dir = __dirname + '/../../../inputs/2025/';
    const input = parseFileToString(dir + fileName);
    const workload = (input as string).split("\n");
    const newWorkload: string[][] = [];
    const operatorsLine = workload.pop()!;
    const operatorIndicies = [];
    for(let i = 0; i < operatorsLine.length; i++) {
        const char = operatorsLine[i];
        if(char !== ' ') {
            operatorIndicies.push(i);
        }
    }
    for(let i = 0; i < operatorIndicies.length; i++) {
        const newLine: string[] = [];
        for(const line of workload) {
            let number: string;
            const operatorIndex = operatorIndicies[i];
            if(operatorIndex === 0) {
                number = line.slice(0, operatorIndicies[i + 1] - 1);
            } else if(i === operatorIndicies.length - 1) {
                number = line.slice(operatorIndex);
            } else {
                number = line.slice(operatorIndex, operatorIndicies[i + 1] - 1);
            }
            newLine.push(number.replaceAll(" ", "x"));
        }
        newWorkload.push(newLine);
    }

    const operators: Operator[] = operatorsLine.split(" ").filter(op => op) as Operator[];

    return {
        numbers: newWorkload,
        operators: operators
    } as DataTpyePt2;

}