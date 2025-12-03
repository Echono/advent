import { OnEventHandler, Request } from "@sap/cds";

type BatteryIndex = {index: number, value: number};

export class pt1Day3Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        
        const { input } = req.data;
        
        const workload = ( input as string ).split("\n");
    
        let result = 0;

        for(const bank of workload) {

            const first = bank.split("").map((battery) => parseInt(battery)).reduce((acc, current, index): BatteryIndex => {
                if(acc.value < current && index < bank.length - 1) {
                    acc.index = index;
                    acc.value = current;
                }
                return acc;

            }, {index: 0, value: 0} as BatteryIndex);

            const second = bank.split("").splice(first.index + 1).map((battery) => parseInt(battery)).reduce((acc, current): BatteryIndex => {
                if(acc.value < current) {
                    acc.value = current;
                }
                return acc;

            }, {index: 0, value: 0} as BatteryIndex);

            const valueInString = first.value.toString() + second.value.toString();
            result += parseInt(valueInString);

        }

        req.reply(result.toString());
    }
}

export class pt2Day3Controller {
    public static main: OnEventHandler = async (req: Request): Promise<void> => {
        
        const { input } = req.data;
        const workload = ( input as string ).split("\n");
        let result = 0;
        
        for(const bank of workload) {
            
            let limit = 12;

            const batteries: BatteryIndex[] = [];

            for(let i = 0; i < 12; i++) {
                const start = batteries.length > 0 ? batteries[batteries.length - 1].index + 1 : 0;
                const battery = this.reduction(bank, start, limit === 1 ? 0 : limit - i - 1);
                batteries.push(battery);
            }

            const jolt = batteries.map(battery => battery.value).join("");

            result += parseInt(jolt);

        }

        req.reply(result.toString());

    }

    public static reduction(input: string, start: number, limit: number): BatteryIndex {

        let splice: string[];
        if(limit <= 0) {
            splice = input.split("").slice(start);
        } else {
            splice = input.split("").slice(start, -limit);
        }
        const mapped = splice!.map(battery => parseInt(battery));

        const result = mapped.reduce((acc, current, index): BatteryIndex => {
            if(acc.value < current) {
                acc.index = index + start;
                acc.value = current;
            }
            return acc;

        }, {index: 0, value: 0} as BatteryIndex);

        return result;

    }
}