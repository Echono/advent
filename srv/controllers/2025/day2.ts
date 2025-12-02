import { OnEventHandler, Request } from "@sap/cds";

export class pt1Day2Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        
        const { input } = req.data;
        
        const workload = ( input as string ).split(",").map( str => str.split("-"));
    
        let result = 0;

        workload.map((range) => {
            return new Promise(() => {
                const start = parseInt(range.shift()!);
                const end = parseInt(range.pop()!);

                for(let i = start; i <= end; i++) {

                    const str = i.toString();

                    let firstHalf = "";
                    let secondHalf = "";

                    if(str.length % 2 === 0) {
                        const split = Math.ceil(str.length / 2);
                        firstHalf = str.substring(0, split);
                        secondHalf = str.substring(split);
                    
                        if(firstHalf[0] === "0" || secondHalf[0] === "0") {
                            continue;
                        }
                        
                        if(firstHalf === secondHalf) {
                            result += parseInt(str);
                        }
                    }
                }
            })
        });

        req.reply(result);
    }
}

export class pt2Day2Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        
        const { input } = req.data;

        const workload = ( input as string ).split(",").map( str => str.split("-"));
    
        let result = 0;

        workload.map((range) => {
            return new Promise(() => {
                const start = parseInt(range[0]);
                const end = parseInt(range[1]);

                for(let i = start; i <= end; i++) {

                    if(i < 10) {
                        continue;
                    }

                    const str = i.toString();

                    for(let x = 0; x < Math.ceil(str.length / 2); x++) {
                        const checkPart = str.substring(0, x + 1);
                        const regexString: string = `.{1,${checkPart.length}}`;
                        const chunksOfString = str.substring(x + 1).match(new RegExp(regexString, 'g'));
                        const checks = chunksOfString!.every( chunk => chunk === checkPart );
                        if(checks) {
                            result += parseInt(str);
                            break; 
                        }
                    }
                }
            })
        });

        req.reply(result);

    }
}