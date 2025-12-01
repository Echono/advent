import { day1pt1, day1pt2 } from "#cds-models/advent2025";
import { ApplicationService } from "@sap/cds";
import { pt1Day1Controller, pt2Day1Controller } from "./controllers/2025/day1Controller";

export default class SalespriceService extends ApplicationService {
    async init(): Promise<void> {

        this.on(day1pt1, pt1Day1Controller.main);
        this.on(day1pt2, pt2Day1Controller.main);

    }
}