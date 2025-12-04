# Introduction
Welcome to my solutions of advent of code.
This repos sole purpose is hobby coding while still respecting what I work with at a daily basis, which is why this repo makes use of the SAP CAP standards and uses the CAP runtime to execute the solutions.

You can find more here: https://cap.cloud.sap/docs/

The solutions for the code will be stored in the individual years of controller folders located in the srv folder.

The srv files will provide the service which has callable endpoints that takes in your input.

__**Please look at this code at your own risk as this will spoil the puzzle**__

If you'd like to try to execute this code yourself, I suggest creating a http folder that provides your inputs and calls the endpoints.

Beware of changes to the code. As of writing this, day 1 - 2 are manually accessed and you need to convert your input and send it with a request to access the function while day 3 and onwards takes in a filename looking in a "2025" folder located in a "inputs" which should be located in root. (This is subject to change with a UI in the future)