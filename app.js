const kongMoveSpeed = 500;
const gameSpeed = 200;
let loopTimer = null;

let kongState = 0;

const onStartStopGame = () =>{

    if (loopTimer)
    {
      clearInterval(loopTimer)
      loopTimer = null
    }
    else
    {
        newGame();
        loopTimer = setInterval(gameLoop, gameSpeed)
    }
}

const gameLoop =() =>{

    // Find all the Barrels
    const barrels = document.querySelectorAll('.barrel')

    for (let i = 0; i < barrels.length; i++){
        moveBarrel(barrels[i]);
    }
}
const moveBarrel = (barrel) =>{
    
    let left = 0;
    const girderNumber = parseInt(barrel.parentElement.id.substring(7,8), 10);

    if (barrel.style.left == ''){
        left = 100;
    } else {
        left = parseInt(barrel.style.left, 10);
        left = (girderNumber % 2 == 0) ? left-=20 : left+=20;
    }
    barrel.style.left = `${left}px`;

    if ((left > barrel.parentElement.offsetWidth) || (left < 100)) {
        const nextGirderNumber = ++girderNumber;

        if (nextGirderNumber <= 4){
            const newGirder = document.getElementById(`girder-${nextGirderNumber}`);
            newGirder.appendChild(barrel);

            left = (nextGirderNumber % 2 == 0) ? left-=50 : left;
            barrel.style.left = `${left}px`;
        } else {
            // We've run out of Girders, delete the Barrel
            barrel.parentElement.removeChild(barrel);
        }
    }
}

const newGame = () =>{

    const initKong = () =>{
    
        // Set up Kong's Moves
        const moves = ['stand', 'left-rage', 'stand', 'right-rage', 'stand', 'left-rage', 'stand', 'right-rage', 'stand', 'left-roll', 'stand', 'right-roll', 'stand', 'right-rage'];
    
        const moveKong =() =>{
            
            if (!loopTimer){
                stopKong()
            }

            const kong = document.getElementById('kong-char')

            kongState = (kongState >= (moves.length -1) ? 0: ++kongState);
    
            kong.className = '';
            kong.classList.add(moves[kongState]);            
            kongLoop = setTimeout(moveKong, kongMoveSpeed); // repeat myself

            if (moves[kongState] == 'right-roll'){
                throwBarrel();
            }
        }
    
        let kongLoop = setTimeout(moveKong, kongMoveSpeed);
    
        const stopKong = () =>{ // to be called when you want to stop the timer
            clearTimeout(kongLoop);
        }
    }

    // Initialise Kong's Movement
    initKong();    
}

const throwBarrel = () =>{

    const barrel = document.createElement('div');
    barrel.classList.add('barrel')

    const girder1 = document.getElementById('girder-1')
    girder1.appendChild(barrel)
}

document.addEventListener('DOMContentLoaded', () =>{

    // ** TODO Add later
    // const board = document.getElementById('board')
    // const scoreDisplay = document.getElementById('score')
    
    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
    
          // Start/Stop the game
          onStartStopGame();
        }
      })
})

