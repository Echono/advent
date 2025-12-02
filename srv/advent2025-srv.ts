import { day1pt1, day1pt2, day2pt1, day2pt2 } from "#cds-models/advent2025";
import { ApplicationService } from "@sap/cds";
import { pt1Day1Controller, pt2Day1Controller } from "./controllers/2025/day1";
import { pt1Day2Controller, pt2Day2Controller } from "./controllers/2025/day2";

export default class SalespriceService extends ApplicationService {
    async init(): Promise<void> {

        /* ######################### */
        /* ######### DAY 1 ######### */
        /* ######################### */
        this.on(day1pt1, pt1Day1Controller.main);
        this.on(day1pt2, pt2Day1Controller.main);

        /* ######################### */
        /* ######### DAY 2 ######### */
        /* ######################### */
        this.on(day2pt1, pt1Day2Controller.main);
        this.on(day2pt2, pt2Day2Controller.main);

    }
}