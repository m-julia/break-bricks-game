 const showRulesBtn = document.getElementById('rules-btn');
 const closeRulesBtn = document.getElementById("close-btn");
 const rules = document.getElementById("rules");
 const canvas = document.getElementById("canvas");
 const context = canvas.getContext('2d');

 let score = 0;

 const brickColumnCount = 5;
 const brickRowCount = 9;

// Create props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

const paddle = {
    x: canvas.width / 2,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 9,
    dx: 0   
}

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

const bricks = [];
for(let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo}
    }
}

// Draw objects on canvas
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    context.fillStyle = '#40C1CC';
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    context.fillStyle = '#40C1CC';
    context.fill();
    context.closePath();
}

function drawScore() {
    context.font = '20px Arial';
    context.fillText(`Score: ${score}`, canvas.width -100, 30);
}

function drowBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            context.beginPath();
            context.rect(brick.x, brick.y, brick.w, brick.h);
            context.fillStyle = brick.visible ? '#F2C740' : 'transparent';
            context.fill();
            context.closePath;
        })
    })
}

function movePaddle() {
    paddle.x += paddle.dx;

    if(paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0) {
        paddle.x = 0
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    }

    if(ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
        ball.dy *= -1
    }

    if(
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y - paddle.h
    )  {
        ball.dy = -ball.speed
    }
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if(
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.h
                ) {
                    console.log('hhhh')
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();    
                }
            }
        });
    });

    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
    
}

function drow() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawBall();
    drawPaddle();
    drawScore();
    drowBricks();
}

function update() {
    movePaddle();
    moveBall();
    drow();
    requestAnimationFrame(update);
}

update();


function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        })
    })
}

function increaseScore() {
    score++;
    if(score % (brickRowCount * brickColumnCount) === 0) {
        showAllBricks();
        score = 0;
    }
}





function keyDown(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed
    }   
}


function keUp(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft' ) {
        paddle.dx = 0;
    }
}



// Show and close rules event handler
showRulesBtn.addEventListener('click', () => rules.classList.add('show'));

closeRulesBtn.addEventListener('click', () => rules.classList.remove('show'));

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keUp);