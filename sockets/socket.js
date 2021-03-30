const {io} = require('../index');
//Socket messages
io.on('connection', client => {

    console.log('Client connected');
    client.on('disconnect', () => {
        console.log('Client disconected');
    });
    client.on('message', data => {
        console.log(data);

        io.emit('message', {admin:'New message'});
    });
});

