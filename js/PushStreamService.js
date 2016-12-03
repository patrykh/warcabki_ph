

var PushStreamService = function() {
    var pushStream = {};

    function initWebSocket() {
        var pushStreamIp = "localhost",
            pushStreamPort = 9080;

        if (!(pushStream instanceof PushStream)) {
            pushStream = new PushStream({
                host: pushStreamIp,
                port: pushStreamPort,
                modes: 'websocket',
                useSSL: false,
                timeout: 2000,
                reconnectOnTimeoutInterval: 1000,
                reconnectOnChannelUnavailableInterval: 1000 // proba podlaczenia do ws
            });
        }
    }

    function getPushStream() {
        return pushStream;
    }

    function addChannel(channel) {
        channel = channel.toString();
        if (pushStream instanceof PushStream) {
            pushStream.addChannel(channel);
        } else {
            console.log('Nie zainicializowano obiektu PushStream');
        }
    }

    function connect() {
        if (pushStream instanceof PushStream) {
            pushStream.connect();
        } else {
            console.log('Nie udało podlączyć się do socketa');
        }
    }

    function pushStreamDisconnect() {
        console.log("disconnect");
        if (pushStream instanceof PushStream) {
            pushStream.disconnect();
            pushStream = {};
        }
    }

    function addListener(onmessage, onstatuschange) {
        if (pushStream instanceof PushStream) {

            pushStream.onmessage = onmessage;

            pushStream.onstatuschange = onstatuschange;
        }
    }

    return {
        getPushStream: getPushStream,
        initWebSocket: initWebSocket,
        addChannel: addChannel,
        connect: connect,
        pushStreamDisconnect: pushStreamDisconnect,
        addListener: addListener
    }
}();