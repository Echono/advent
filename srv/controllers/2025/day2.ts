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
    

    }
}