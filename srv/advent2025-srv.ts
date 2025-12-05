import { day1pt1, day1pt2, day2pt1, day2pt2, day3pt1, day3pt2, day4pt1, day4pt2, day5pt1, day5pt2 } from "#cds-models/advent2025";
import { ApplicationService } from "@sap/cds";
import { pt1Day1Controller, pt2Day1Controller } from "./controllers/2025/day1";
import { pt1Day2Controller, pt2Day2Controller } from "./controllers/2025/day2";
import { pt1Day3Controller, pt2Day3Controller } from "./controllers/2025/day3";
import { pt1Day4Controller, pt2Day4Controller } from "./controllers/2025/day4";
import { pt1Day5Controller, pt2Day5Controller } from "./controllers/2025/day5";

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

        /* ######################### */
        /* ######### DAY 3 ######### */
        /* ######################### */
        this.on(day3pt1, pt1Day3Controller.main);
        this.on(day3pt2, pt2Day3Controller.main);

        /* ######################### */
        /* ######### DAY 4 ######### */
        /* ######################### */
        this.on(day4pt1, pt1Day4Controller.main);
        this.on(day4pt2, pt2Day4Controller.main);

        /* ######################### */
        /* ######### DAY 5 ######### */
        /* ######################### */
        this.on(day5pt1, pt1Day5Controller.main);
        this.on(day5pt2, pt2Day5Controller.main);

    }
}