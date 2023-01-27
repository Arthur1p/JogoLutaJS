const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravidade = 0.7


const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background/background1.png'
})

const jogador = new Lutador({
    position: {
        x: 0,
        y: 0
    },
    velocidade: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
})

jogador.desenho()

const inimigo = new Lutador({
    position: {
    x: 400,
    y: 100
},
    velocidade: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    }
})

inimigo.desenho()

const teclas = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

function colisaoRetangulo({ retangulo1, retangulo2}){
    return(
        retangulo1.ataqueArea.position.x + retangulo1.ataqueArea.width >= retangulo2.position.x &&
        retangulo1.ataqueArea.position.x <= retangulo2.position.x + retangulo2.width &&
        retangulo1.ataqueArea.position.y + retangulo1.ataqueArea.height >= retangulo2.position.y &&
        retangulo1.ataqueArea.position.y <= retangulo2.position.y + retangulo2.height
    )
}

function determinarVencedor({jogador, inimigo, tempoId}){
    clearTimeout(tempoId)
    document.querySelector("#displayText").style.display = 'flex'
    if(jogador.vida === inimigo.vida){
        document.querySelector("#displayText").innerHTML = 'Empate!'

    } else if (jogador.vida > inimigo.vida){
        document.querySelector("#displayText").innerHTML = 'Jogador 1 venceu!'

    } else if (inimigo.vida > jogador.vida){
        document.querySelector("#displayText").innerHTML = 'Jogador 2 venceu!'
    }
}

let tempo = 20
let tempoId
function diminuirTempo(){
    
    if(tempo > 0){
        tempoId = setTimeout(diminuirTempo, 1000)
        tempo --
        document.querySelector('#tempo').innerHTML = tempo
    }
    if(tempo === 0){

        determinarVencedor({jogador, inimigo, tempoId})
    }
}
diminuirTempo()

function animar(){
    window.requestAnimationFrame(animar)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    jogador.update()
    inimigo.update()

    jogador.velocidade.x = 0
    inimigo.velocidade.x = 0

    //Movimento Jogador
    if (teclas.a.pressed && jogador.ultimaTecla === 'a'){
        jogador.velocidade.x = -5
    } else if (teclas.d.pressed && jogador.ultimaTecla === 'd'){
        jogador.velocidade.x = 5
    }

    //Movimento Inimigo
    if (teclas.ArrowLeft.pressed && inimigo.ultimaTecla === 'ArrowLeft'){
        inimigo.velocidade.x = -5
    } else if (teclas.ArrowRight.pressed && inimigo.ultimaTecla === 'ArrowRight'){
        inimigo.velocidade.x = 5
    }


    //Detectar Acerto
    if(
        colisaoRetangulo({
            retangulo1: jogador,
            retangulo2: inimigo
        }) &&
        jogador.atacando
        ){
        
        jogador.atacando = false
        inimigo.vida -= 20
        document.querySelector('#vidaInimiga').style.width = inimigo.vida + '%'
        
    }
    
    if(
        colisaoRetangulo({
            retangulo1: inimigo,
            retangulo2: jogador
        }) &&
        inimigo.atacando
        ){
        
        inimigo.atacando = false
        jogador.vida -= 20
        document.querySelector('#vidaJogador').style.width = jogador.vida + '%'
        
    }

    //Acabar jogo com 0 vida
    if (inimigo.vida <= 0 || jogador.vida <= 0){
        determinarVencedor({jogador, inimigo, tempoId})
    }

}

animar()

window.addEventListener('keydown', (event) => {
    switch(event.key){
        //Comandos do Jogador
        case 'd':
            teclas.d.pressed = true
            jogador.ultimaTecla = 'd'
            break
        case 'a':
            teclas.a.pressed = true
            jogador.ultimaTecla = 'a'
            break
        case 'w':
            jogador.velocidade.y = -20
            break
        case ' ':
            jogador.ataque()
            break

        //Comandos do inimigo
        case 'ArrowRight':
            teclas.ArrowRight.pressed = true
            inimigo.ultimaTecla = 'ArrowRight'
            break
        case 'ArrowLeft':
            teclas.ArrowLeft.pressed = true
            inimigo.ultimaTecla = 'ArrowLeft'
            break
        case 'ArrowUp':
            inimigo.velocidade.y = -20
            break
        case 'ArrowDown':
            inimigo.ataque()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            teclas.d.pressed = false
            break
        case 'a':
            teclas.a.pressed = false
            break
        //Comandos do inimigo
        case 'ArrowRight':
            teclas.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            teclas.ArrowLeft.pressed = false
            break
        
    }
})