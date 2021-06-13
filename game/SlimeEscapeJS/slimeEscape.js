let curLvl = 1;
let maxLvl = 7;
let slime, map, boxes, traps, door;

function gameMenu() {
    // gameStart()
    // help()
} // end gameMenu()

function gameStart() {
    let controller = new GameController(slime);
    setUp();
    main();
} // end grameStart()

function setUp() {
    map = controller.setMap(curLvl);
    slime = new SlimeModel(map.getSlimeInitX(), map.getSlimeInitY());
    boxes = map.getAllBoxes();
    traps = map.getAllTraps();
    door = map.getDoor();
} // end setUp()

const arrowKeyMap = {
    "ArrowUp": 0, "ArrowDown": 1, "ArrowLeft": 2, "ArrowRight" : 3
};
function main() {
    let isMoved = [false, false];
    // read key: arrowkeys to move and push, and [R] to restart
    document.addEventListener("keyup", (event) => {
        if (event.key === "R" || event.key === "r") setUp();
        if (event.key in arrowKeyMap) {
            isMoved = controller.update(arrowKeyMap[event.key]);
        } // end if
    });

    if (isMoved[0]) {
        // push box animation
    } // end if
    if (isMoved[1]) {
        // slime move animation
    }

    let renderDoorAnimation = controller.modifyDoorStatus();
    if (renderDoorAnimation === 1) {
        // door open animation
    }
    if (renderDoorAnimation === 2) {
        // door close animation
    }

    if (controller.checkEndCurLvl()) {
        curLevel++;
        if (curLvl > maxLvl) return; // finished the game!
        setUp();
    }


    //render();

    // Request to do this again ASAP
    requestAnimationFrame(main);
} // end main()
