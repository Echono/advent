import { day1pt1 } from '#cds-models/advent2025';
import cds from '@sap/cds';
import { parseFileToString } from '../srv/util/parser';
import { createGridMap, createKey, createMaps, filterMap, FilterType, getNumberOfSurroundingPapers, loop } from '../srv/controllers/2025/day4';
import { parseData } from '../srv/controllers/2025/day5';

cds.test(__dirname + '/..');

const dir = __dirname + '/../inputs/2025/';

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

    const example = 'day3example.txt';
    const myInput = 'day3.txt';
    const exampleData = parseFileToString(dir + example);
    const myInputData = parseFileToString(dir + myInput);

    it('should run part 1 finding the biggest battry combinations using example data', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt1', {input: exampleData});
        const expectedResult = "357";

        expect(result).toBe(expectedResult);

    })

    it('should run part 1 finding the biggest battry combinations using my input', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt1', {input: myInputData});
        const expectedResult = "17196";

        expect(result).toBe(expectedResult);

    })

    it('should run part 2 action and return accumelation of 12 batteries per bank for all example data', async () => {
        
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day3pt2', {input: exampleData});
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
        const result = await service.send('day3pt2', {input: myInputData});
        const expectedResult = "171039099596062";
        
        expect(result).toBe(expectedResult);
        
    })
    
});

describe('Test of day 4 code', () => {
    
    const example = 'day4example.txt';
    const path = dir + example;
    const exampleData = parseFileToString(path);

    it('should run part 1 action and figure out how many rolls of paper are accessible', async () => {
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day4pt1', {fileName: example});
        const expectedResult = "13";
        expect(result).toBe(expectedResult);
    
    });

    it('should run helper function that creates the grids and return the correct amount grids using the example data', () => {
        const workload = exampleData.split("\n");
        const grids = createMaps(workload);
        expect(grids.papers.size).toBe(71);
        expect(grids.complete.size).toBe(100);
    })
    
    it('should run helper function that creates the keys and return the correct key format', () => {
        const key = createKey(2, 6);
        expect(key).toBe('2::6');
    })
    
    it('should run part 2 action and loop through the input removing rolls until no more rolls are removeable', async () => {
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day4pt2', {fileName: example});
        const expectedResult = "43";
        expect(result).toBe(expectedResult);
    })

    it('should run helper function that filters a grid map and returns a new map that only contains paper cells', () => {
        const workload = exampleData.split("\n");
        const map = createGridMap(workload);
        const filtered = filterMap(map, FilterType.paper);
        expect(filtered.size).toBe(71);
    })

    it('should run helper function that filters a grid map and returns a new map that only contains marked', () => {
        const workload = exampleData.split("\n");
        const map = createGridMap(workload);
        map.get(createKey(0, 0))!.markedForDeletion = true;
        map.get(createKey(1, 1))!.markedForDeletion = true;
        map.get(createKey(2, 2))!.markedForDeletion = true;
        const filtered = filterMap(map, FilterType.marked);
        expect(filtered.size).toBe(3);
    })

    it('should run helper function that loops through a work grid and mark valid cells for deletion as well as counting that amount', () => {
        const workload = exampleData.split("\n");
        const map = createGridMap(workload);
        const workGrid = filterMap(map, FilterType.paper);
        const result = loop(workGrid, map);
        const expectedValidCells = 13;
        expect(result.validCells).toBe(expectedValidCells);
    })
    
    it('should run helper function that finds surrounding papers of a specific cell and return that amount', () => {
        const workload = exampleData.split("\n");
        const map = createGridMap(workload);
        const cell = map.get(createKey(1, 4));
        const result = getNumberOfSurroundingPapers(cell!, map);
        const expectedResult = 4;
        expect(result).toBe(expectedResult);
    })

});

describe('Test of day 5 code', () => {

    it('should parse the example input file', () => {

        const fileName = 'day5example.txt';
        const parsedData = parseData(fileName);
        const { ranges, ids } = parsedData;

        const expectedRanges = [
            { min: 3, max: 5 },
            { min: 10, max: 20 }
        ]
        const expectedIds = [1, 5, 8, 11, 17, 32];

        expect(ranges.length).toBe(expectedRanges.length);
        expect(ids.length).toBe(expectedIds.length);

        const randomRangeIndex = Math.floor(Math.random() * (expectedRanges.length)) + 0;
        const randomIdsIndex = Math.floor(Math.random() * (expectedIds.length)) + 0;

        expect(ranges[randomRangeIndex].min).toBe(expectedRanges[randomRangeIndex].min);
        expect(ranges[randomRangeIndex].max).toBe(expectedRanges[randomRangeIndex].max);
        expect(ids[randomIdsIndex]).toBe(expectedIds[randomIdsIndex]);

    })

    it('should run part 1 action and return expected data using the example input', async () => {
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day5pt1', {fileName: 'day5example.txt'});
        const expectedResult = "3";
        expect(result).toBe(expectedResult);

    })

    it('should run part 2 action and return amount of fresh ingredients which is resolved by checking all the numbers within a range', async () => {
        const service = await cds.connect.to('advent2025');
        const result = await service.send('day5pt2', {fileName: 'day5example.txt'});
        const expectedResult = "14";
        expect(result).toBe(expectedResult);
    })

})