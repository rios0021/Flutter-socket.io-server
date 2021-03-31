const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Metallica'));
bands.addBand( new Band('BonJovi'));
bands.addBand( new Band('Skap'));

//Socket messages
io.on('connection', client => {

    client.emit('active-bands', bands.getBands());

    console.log('Client connected');
    client.on('disconnect', () => {
        console.log('Client disconected');
    });
    // client.on('message', payload => {
    //     console.log(payload);
    //     io.emit('message', {admin:'New message'});
    // });

    // client.on('emit-message', (payload) => {
    //     client.broadcast.emit('new-message', payload);
    // }); 

    client.on('connect_failed', (err) => {
        console.log('Sorry, there seems to be an issue with the connection! $err');
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    client.on('add-band', (payload) => {
        bands.addBand( new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});

