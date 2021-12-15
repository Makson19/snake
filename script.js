
let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let box = 32

// Array que armazenará as posições da cabeça e de todo o corpo da cobrinha 
let snake = []
snake[0] = {
    x: 8*box,
    y: 8*box
}

// Direção inicial da cobrinha
let direction = "right"

// Array que armazena a posição das maçãs
let food = {
    x: Math.floor(Math.random() * 15 + 1)* box, 
    y: Math.floor(Math.random() * 15 + 1)* box
}

let cont = 0   // Variável usada como contador do placar "Score". 
let jogo;      // 

// Função que cria todo o campo de jogo onde a cobrinha irá andar.
function criarBG(){
    context.fillStyle = "lightgreen"
    context.fillRect(0, 0, 16*box, 16*box)
}

// Função que cria a cobrinha
function criarCobrinha(){
    for(var i = 0; i < snake.length; i++){
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

// Função que cria as maçãs
function drawFood(){
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update) // Função responsável por criar eventos quando clicarmos nas teclas direcionais do teclado

// Função responsável por capturar os eventos quando clicarmos nas teclas direcionais do teclado
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left"
    if(event.keyCode == 38 && direction != "down") direction = "up"
    if(event.keyCode == 39 && direction != "left") direction = "right"
    if(event.keyCode == 40 && direction != "up") direction = "down"
}

function iniciarJogo(){
    // Esses condiconais tem como função fazer com que a cobrinha, ao se chocar em uma parede, apareça na parede oposta.
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0
    if(snake[0].x < 0 && direction == "left") snake [0].x = 16*box
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16*box

    // Este laço tem como função encerrar o jogo quando a cobrinha se chocar no seu próprio corpo.
    for(var i = 1; i < snake.length; i++){
        // Este condicional verifica se a posição da cabeça da cobra é igual a posição de alguma parte de seu corpo.
        // Se caso forem iguais, o jogo é encerrado.
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)  // Função responsável por encerrar o loop de animação
            cont = 0
            document.getElementById("score").innerHTML = "Score: " + cont.toString()
            alert("Game Over :(")
            snake = []
            snake[0] = {
                x: 8*box,
                y: 8*box
            }
        }
    }

    criarBG()
    criarCobrinha()
    drawFood()
    
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    // Esses condicionais são responsáveis por dar velocidade ao movimento da cobrinha em várias direções.
    if(direction == "right") snakeX += box
    if(direction == "left") snakeX -= box
    if(direction == "up") snakeY -= box
    if(direction == "down") snakeY += box

    // Este condicional é responsável por dar crescimento ao corpo da cobrinha toda vez que ela comer uma maçã.
    // Na primeira parte do condicional, como a cobrinha é formada por um array de posições, a função pop sempre apagará 
    // as coordenadas da última posição, impedindo assim, que a cobrinha cresça infinitamente.

    // Já na segunda parte do condicional, quando a cobrinha comer uma maçã, uma nova posição será adicionada no array que
    // dá origem a cobrinha, fazendo com que seu corpo aumente.
    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    } else {
        cont++
        document.getElementById("score").innerHTML = "Score: " + cont.toString()
        food.x = Math.floor(Math.random() * 15 + 1)* box
        food.y = Math.floor(Math.random() * 15 + 1)* box
    }
    
    // Esta variável armazena a nova posição que será adicionada no array da cobrinha.
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Essa posição será a nova posição da cabeça da cobra. Ela será o primeiro elemento do array da cobrinha e será adiconada, 
    // dessa forma, por meio da função unshift.
    snake.unshift(newHead)
}

// Função responsável por dar início ao movimento da cobrinha ao clicarmos no botão "Start".
function start(){
    jogo = setInterval(iniciarJogo, 100) // Esta função é responsável por criar o loop de animação do jogo.
                                         // Ela executa a função "iniciarJogo()" várias vezes em intervalos de 100ms.  
}

// Função responsável por pausar o jogo ao clicarmos no botão "Stop".
function stop(){
    clearInterval(jogo)
}


iniciarJogo()
