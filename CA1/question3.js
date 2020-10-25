/**
 *  Q.3 Create a node js application and raise five different events and every event should raise with an
 *  interval of 1sec, 2sec, 3sec, 4 sec and 5sec
 *
 *  Jay Gurav
 *  5 sept. 2020
 */

const EventEmitter = require('events');

// clear the console
process.stdout.write('\u001B[2J\u001B[0;0f');

const Events = new EventEmitter();

Events.on('one', (sec) => {
    console.log(`> Event one emitted at ${sec}sec \n`);
});

Events.on('two', (sec) => {
    console.log(`> Event two emitted at ${sec}sec \n`);
});

Events.on('three', (sec) => {
    console.log(`> Event three emitted at ${sec}sec \n`);
});

Events.on('four', (sec) => {
    console.log(`> Event four emitted at ${sec}sec \n`);
});

Events.on('five', (sec) => {
    console.log(`> Event five emitted at ${sec}sec \n`);
});

const arr = ['one', 'two', 'three', 'four', 'five'],
    timeoutIds = [];

for (let i = 0; i <= 5; i++) {
    id = setTimeout(() => {
        Events.emit(arr[i], i + 1);
    }, (i + 1) * 1000);
    timeoutIds.push(id);
}

process.on('beforeExit', () => {
    console.log('Cleaning up!!');
    timeoutIds.map((id) => clearTimeout(id));
    Events.removeAllListeners();
})