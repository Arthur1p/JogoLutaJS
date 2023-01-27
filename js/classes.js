class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
    }

    desenho(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.desenho()
        
    }

}

class Lutador {
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
