export class TrackPerformance {

    private name: string | undefined;
    private startTime: number | undefined;

    constructor(now?: boolean, name?: string) {
        if(now) {
            this.start();
        }
        this.name = name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public start(): void {
        this.startTime = performance.now();
    }

    public end(): void {
        if(this.startTime !== undefined) {
            const endTime = performance.now();
            console.log(`${this.name ? "[" + this.name + "]" + " " : ""}Execution time: ${endTime - this.startTime} ms`);
        } else {
            throw new Error("Performance timer was not started.");
        }
    }

}