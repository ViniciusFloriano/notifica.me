const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray')
const connections = [];
const calculateDistance = require('./utils/calculateDistance')

exports.setupWebsocket = (server) => {
    const io = socketio(server);

    io.on('connection', socket => {

        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connections => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    })
}

