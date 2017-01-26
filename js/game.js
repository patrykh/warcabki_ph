(function() {
    "use strict";

    var plansza = document.createElement("div"),
        // -5 => Puste pole czarne
        // -1 => Pionek czarny
        // 1 => Pionek bialy
        // 5 => Puste pole biale
        matrix = [
            [5, -1, 5, -1, 5, -1, 5, -1],
            [-1, 5, -1, 5, -1, 5, -1, 5],
            [5, -1, 5, -1, 5, -1, 5, -1],
            [-5, 5, -5, 5, -5, 5, -5, 5],
            [5, -5, 5, -5, 5, -5, 5, -5],
            [1, 5, 1, 5, 1, 5, 1, 5],
            [5, 1, 5, 1, 5, 1, 5, 1],
            [1, 5, 1, 5, 1, 5, 1, 5]
        ],
        elements,
        stored,
        initialized = false;

    plansza.classList.add("plansza");

    function onload() {

        Utils.changeCSS();

        var content = document.querySelector("div.content");
        if (!content) {
            return;
        }
        startWebSockets();

        attachListeners();

        content.appendChild(plansza);

        console.log('matrix', matrix, 'elements', elements);
    }

    function startWebSockets() {
        PushStreamService.initWebSocket();
        PushStreamService.addChannel("game_room_" + gameID + ".b5");

        function onsuccess(data, index, channelName) {
            var json = {};

            console.log("Channel: ", channelName);
            console.log("onsuccess");
            try {
                json = JSON.parse(data);
            } catch (e) {
                console.warn(e);
            }

            data = json.data;

            switch (json.type) {
                case "przesun":
                    matrix = data.matrix;

                    refreshPlansza();
                    break;
                default:
                    console.warn("Wysylasz cos, czego nie obslugujemy");
            }

        }

        function refreshPlansza() {
            while (plansza.firstChild) {
                plansza.removeChild(plansza.firstChild);
            }

            elements = renderElements(createElements());
        }

        function onstatuschange(status) {
            if (status === PushStream.OPEN) {
                console.log("Otwarto polaczenie Z WS");
                console.log("matrix conn: ", matrix);
                refreshPlansza();
            } else if (status === PushStream.CLOSED) {
                console.log("Zamknieto polaczenie z WS");
            } else if (status === PushStream.CONNECTING) {
                console.log("Łącze z WS");
            }
        }

        PushStreamService.addListener(onsuccess, onstatuschange);

        PushStreamService.connect();
    }


    function attachListeners() {
        plansza.addEventListener("click", handleClick);

        function handleClick(event) {
            var target = event.target,
                x = target.getAttribute("data-x"),
                y = target.getAttribute("data-y");

            if (target.classList.contains("pionek")) {
                stored = target;
            }

            if ((target.classList.contains("poleCzarne") || false) && stored) {
                
                swapElements(stored.getAttribute("data-x"), stored.getAttribute("data-y"), x, y);
                var object = {type: "przesun",
                    data: {
                        firstX: stored.getAttribute("data-x"),
                        firstY: stored.getAttribute("data-y"),
                        secondX: x,
                        secondY: y,
                        matrix: matrix}
                };

                PushStreamService.getPushStream().sendMessage(JSON.stringify(object));

                stored = false;
            }
        }
    }
    function swapElements(firstX, firstY, secondX, secondY) {
        var temp;

        swap(matrix);

        // @TODO zamieniac tez w elements
        // FIXME
        //swap(elements); //- cos tu nie dziala prawidlowo

        function swap(array) {
            temp = array[firstY][firstX];
            array[firstY][firstX] = array[secondY][secondX];
            array[secondY][secondX] = temp;
        }
    }

    function swapClasses(firstX, firstY, secondX, secondY) {
        var temp = elements[firstY][firstX].className;
        elements[firstY][firstX].className = elements[secondY][secondX].className;
        elements[secondY][secondX].className = temp;
    }

    function createElements() {
        return matrix.map(function(rzad, y) {
            var rzadElementow;

            rzadElementow = rzad.map(function(pole, x) {
                var element =  document.createElement("div");

                element.setAttribute("data-x", x);
                switch(pole) {
                    case -5:
                        element.className = "pole poleCzarne";
                        break;
                    case -1:
                        element.className = "pionek czerwonyPionek";
                        break;
                    case 1:
                        element.className = "pionek bialyPionek";
                        break;
                    case 5:
                        element.className = "pole poleBiale";
                        break;
                }

                element.setAttribute("data-y", y);

                return element;
            });

            return rzadElementow;
        });
    }

    function renderElements(elements) {
        elements.forEach(function(rzad) {
            var rzadElementow = document.createElement("div");

            rzad.forEach(function(pole) {
                rzadElementow.appendChild(pole);
            });

            plansza.appendChild(rzadElementow);
        });

        return elements;
    }

    document.addEventListener("DOMContentLoaded", onload, false);
})();