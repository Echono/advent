import { day1pt1, day1pt2, day2pt1, day2pt2, day3pt1, day3pt2, day4pt1, day4pt2, day5pt1, day5pt2, day6pt1, day6pt2, day7pt1, day7pt2, day8pt1, day8pt2, day9pt1, day9pt2 } from "#cds-models/advent2025";
import { ApplicationService } from "@sap/cds";
import { pt1Day1Controller, pt2Day1Controller } from "./controllers/2025/day1";
import { pt1Day2Controller, pt2Day2Controller } from "./controllers/2025/day2";
import { pt1Day3Controller, pt2Day3Controller } from "./controllers/2025/day3";
import { pt1Day4Controller, pt2Day4Controller } from "./controllers/2025/day4";
import { pt1Day5Controller, pt2Day5Controller } from "./controllers/2025/day5";
import { pt1Day6Controller, pt2Day6Controller } from "./controllers/2025/day6";
import { pt1Day7Controller, pt2Day7Controller } from "./controllers/2025/day7";
import { pt1Day8Controller, pt2Day8Controller } from "./controllers/2025/day8";
import { pt1Day9Controller, pt2Day9Controller } from "./controllers/2025/day9";

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

        /* ######################### */
        /* ######### DAY 6 ######### */
        /* ######################### */
        this.on(day6pt1, pt1Day6Controller.main);
        this.on(day6pt2, pt2Day6Controller.main);

        /* ######################### */
        /* ######### DAY 7 ######### */
        /* ######################### */
        this.on(day7pt1, pt1Day7Controller.main);
        this.on(day7pt2, pt2Day7Controller.main);

        /* ######################### */
        /* ######### DAY 8 ######### */
        /* ######################### */
        this.on(day8pt1, pt1Day8Controller.main);
        this.on(day8pt2, pt2Day8Controller.main);

        /* ######################### */
        /* ######### DAY 9 ######### */
        /* ######################### */
        this.on(day9pt1, pt1Day9Controller.main);
        this.on(day9pt2, pt2Day9Controller.main);

    }
}