import { OnEventHandler, Request } from "@sap/cds";

/* ########################## */
/* ########################## */
/* ######### PART 1 ######### */

export class pt1Day4Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        
        const { input } = req.data;
        const workload = ( input as string ).split("\n");
        let result = 0;

    }
}

/* ########################## */
/* ######### PART 2 ######### */
/* ########################## */

export class pt2Day4Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        
        const { input } = req.data;
        const workload = ( input as string ).split("\n");
        let result = 0;

    }
}