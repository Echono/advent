import { day1pt1 } from '#cds-models/advent2025';
import cds from '@sap/cds';

const test = cds.test(__dirname + '/..');

describe('Test of day 1 code', () => {

    const example = "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82";
    
    it('should run part 1 action and return accumulated times dial hit 0', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day1pt1', {input: example});
        const expectedResult = "3";
        // const result = "3"; // Placeholder for actual result

        expect(result).toBe(expectedResult);

    })

    it('should run part 2 action and return accumulated times the dial crossed 0 or hit 0', async () => {

    })

})