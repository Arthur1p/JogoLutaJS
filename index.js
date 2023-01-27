const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravidade = 0.7

class Sprite {
    constructor({position, velocidade, color = 'red', offset}) {
        this.position = position
        this.velocidade = velocidade
        this.height = 150
        this.width = 50
        this.ultimaTecla
        this.ataqueArea = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.atacando
        this.vida = 100
    }

    desenho(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //Ataque
        if(this.atacando){
            c.fillStyle = "yellow"
            c.fillRect(
                this.ataqueArea.position.x,
                this.ataqueArea.position.y,
                this.ataqueArea.width,
                this.ataqueArea.height
            )
        }
    }

    update(){
        this.desenho()
        this.ataqueArea.position.x = this.position.x + this.ataqueArea.offset.x
        this.ataqueArea.position.y = this.position.y
        
        this.position.x += this.velocidade.x
        this.position.y += this.velocidade.y

        if (this.position.y + this.height + this.velocidade.y >= canvas.height){
            this.velocidade.y = 0
        } else this.velocidade.y += gravidade
    }

    ataque(){
        this.atacando = true
        setTimeout(() => {
            this.atacando = false
        }, 100)
    }
}

const jogador = new Sprite({
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

const inimigo = new Sprite({
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

let tempo = 10
function diminuirTempo(){
    
    if(tempo > 0){
        setTimeout(diminuirTempo, 1000)
        tempo --
        document.querySelector('#tempo').innerHTML = tempo
    }
    if(jogador.vida === inimigo.vida){
        
    }
}
diminuirTempo()

function animar(){
    window.requestAnimationFrame(animar)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
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