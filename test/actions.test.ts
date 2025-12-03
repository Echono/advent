import { day1pt1 } from '#cds-models/advent2025';
import cds from '@sap/cds';
import { parseFileToString } from '../srv/util/parser';

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

    it('should run part 1 action and return count of invalid passwords that are angel numbers', async () => {
        
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

describe('Test of day 3 code', () => {

    const example = "987654321111111\n811111111111119\n234234234234278\n818181911112111"
    const dir = __dirname + '/../inputs/day3.txt'
    const myInput = parseFileToString(dir);

    it('should run part 1 finding the biggest battry combinations using example data', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt1', {input: example});
        const expectedResult = "357";

        expect(result).toBe(expectedResult);

    })

    it('should run part 1 finding the biggest battry combinations using my input', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt1', {input: myInput});
        const expectedResult = "17196";

        expect(result).toBe(expectedResult);

    })

    it('should run part 2 action and return accumelation of 12 batteries per bank for all example data', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt2', {input: example});
        const expectedResult = "3121910778619";

        expect(result).toBe(expectedResult);
    
    })

    it('should run part 2 with first line of example to test limit logic', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt2', {input: "987654321111111"});
        const expectedResult = "987654321111";

        expect(result).toBe(expectedResult);
    
    })

    it('should run part 2 with second line of example to test limit logic', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt2', {input: "811111111111119"});
        const expectedResult = "811111111119";

        expect(result).toBe(expectedResult);
    
    })

    it('should run part 2 with third line of example to test limit logic', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt2', {input: "234234234234278"});
        const expectedResult = "434234234278";

        expect(result).toBe(expectedResult);
    
    })

    it('should run part 2 with fourth line of example to test limit logic', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt2', {input: "818181911112111"});
        const expectedResult = "888911112111";

        expect(result).toBe(expectedResult);
        
    })
    
    it('should run part 2 finding the biggest battery combination of 12 batteries using my input', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt2', {input: myInput});
        const expectedResult = "171039099596062";
    
        expect(result).toBe(expectedResult);

    })

});