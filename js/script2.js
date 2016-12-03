(function () {

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
        var content = document.querySelector("div.content");
        renderElements(createElements());

        attachListeners();

        content.appendChild(plansza);

        console.log('matrix', matrix, 'elements', elements);
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
                //renderElements(elements);
                stored = false;
            }
        }
    }

    function swapElements(firstX, firstY, secondX, secondY) {
        var temp;

        temp= matrix[firstY][firstX];
        matrix[firstY][firstX] = matrix[secondY][secondX];
        matrix[secondY][secondX] = temp;

        temp = elements[firstY][firstX].className;
        elements[firstY][firstX].className = elements[secondY][secondX].className;
        elements[secondY][secondX].className = temp;

    console.log("plansza: ", elements);
    }

    function createElements() {
        initialized = true;
        return matrix.map(function(rzad, y) {
            var rzadElementow;

            rzadElementow = rzad.map(function(pole,x) {
                var element =  document.createElement("div");

                element.setAttribute("data-x", x);
                element.setAttribute("data-y", y);

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

                return element;
            });

            return rzadElementow;
        });

    }

    function renderElements(elements) {
        elements.forEach(function(rzad) {
            var rzadElementow = document.createElement("div");
            console.log("rzad: ",rzad);
            rzad.forEach(function(pole) {
                rzadElementow.appendChild(pole);
            });

            plansza.appendChild(rzadElementow);
        });

        return elements;
    }

    document.addEventListener("DOMContentLoaded", onload, false);
})();