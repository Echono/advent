import { day1pt1 } from '#cds-models/advent2025';
import cds from '@sap/cds';

cds.test(__dirname + '/..');

describe('Test of day 1 code', () => {

    const example = "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82";
    
    it('should run part 1 action and return accumulated times dial hit 0', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send(day1pt1, {input: example});
        const expectedResult = "3";

        expect(result).toBe(expectedResult);

    })

    it('should run part 2 action and return accumulated times the dial crossed 0 or hit 0', async () => {

        const service = await cds.connect.to('advent2025');
        const result = await service.send('day1pt2', {input: example});
        const expectedResult = "6";

        expect(result).toBe(expectedResult);

    })

})

describe('Test of day 2 code', () => {

    const example = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"

    it('should run part 2 action and return count of invalid passwords that are angel numbers', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day2pt1', {input: example});
        const expectedResult = "1227775554";

        expect(result).toBe(expectedResult);

    })

    it('should run part 2 action and return count of invalid ids that are multiplied numbers', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day2pt2', {input: example});
        const expectedResult = "4174379265";

        expect(result).toBe(expectedResult);
    
    })

});