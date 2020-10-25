/*
    Q.1 Create a node js application that takes input from the user and calculates the sum of first 10 prime
    numbers and store the result in a file ‘output.txt’ which already exists. Also print the success message
    on console if success is there and in case of error then error message gets displayed on console.

    Jay Gurav
    5 sept. 2020
*/


const fs = require('fs');
const { Buffer } = require('buffer');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// clear the console
process.stdout.write('\u001B[2J\u001B[0;0f');
process.stdout.write('\n\u001b[33m'); //set to yellow color


readline.question(`Enter a number...\n>`, (numberEntered) => {
    try {
        process.stdout.write('\u001b[0m\u001b[32;1m');
        var numberEntered = Number(numberEntered);
        if (numberEntered !== numberEntered) {      //check for NaN
            throw new Error('Entered not a number!, please enter a number value')
        }

        const { primeArr, sum } = sumOfPrimeNumbersFrom(numberEntered);

        // open file to write the details
        fs.open('output.txt', 'w', function fileHandler(err, fd) {
            if (err) {
                throw new Error('Error opening file output.txt');
            }

            var buffer = Buffer.concat([
                new Buffer.from(`20 Prime numbers from ${numberEntered} are ${primeArr.toString()}`),
                new Buffer.from(`\nSum = ${sum}`)
            ]);
            // write to file
            fs.write(fd, buffer, 0, function writeFileHandler(err, writtenNum, buf) {
                if (err) {
                    throw new Error('Error writing to file output.txt');
                }
                console.log('Successfully written to file output.txt, number of bytes written : ', writtenNum);
                fs.closeSync(fd);
            });

        })

        process.stdout.write('\u001b[0m');//reset colors
        readline.close()
    } catch (error) {
        process.stdout.write('\u001b[31m');
        console.error('Error occured : ', error.message);
        process.stdout.write('\u001b[0m');
        readline.close();
    }
})





function isPrime(num) {
    for (var i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function sumOfPrimeNumbersFrom(n) {
    var arr = [], count = 0, sum = 0;
    for (var i = n; count < 20; i += 1) {
        if (isPrime(i)) {
            count += 1;
            arr.push(i);
            sum += i;
        }
    }
    return {
        primeArr: arr,
        sum
    }
}

