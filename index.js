const imgs = document.querySelectorAll('.wrapper')
imgs.forEach((card,i)=>{
    card.style.setProperty('--i',`${imgs.length-i}`)
})

let audio = new Audio("./sounds/swipe.mp3");   
audio.volume=.1 
let hearts=Array(2).fill().map((_,i)=>{
    let clone=document.querySelector('.like svg').cloneNode(true)
    document.querySelector('.like svg').after(clone)
    clone.classList.add('invisible')
    clone.style.setProperty('--i',`${i}`)
    return clone
})

let played=false

let dislikes=Array(2).fill().map((_,i)=>{
    let clone=document.querySelector('.dislike svg').cloneNode(true)
    document.querySelector('.dislike svg').after(clone)
    clone.classList.add('invisible')
    clone.style.setProperty('--i',`${i}`)
    return clone
})

imgs.forEach((img,i) => {
    let amoutX
    let amoutY
    let screenX, screenY
    const start = (e) => {
        e.preventDefault() 
        img.classList.remove('active')
        screenX = e.screenX || e.changedTouches[0].clientX
        screenY = e.screenY || e.changedTouches[0].clientY

        img.addEventListener('mousemove', moving, false)
        img.addEventListener('touchmove', moving, false)
        img.addEventListener('mouseup', (e) => { console.log('mouseup'); stopMoving(e) }, false)
        img.addEventListener('touchend', (e) => { console.log('mouseleave'); stopMoving(e) }, false)
        img.addEventListener('mouseleave', (e) => { console.log('mouseleave'); stopMoving(e) }, false)
        img.addEventListener('touchleave', (e) => { console.log('mouseout'); stopMoving(e) }, false)
    }
    const moving = (e) => {
        played=false
        amoutX = Number(e.screenX || e.changedTouches[0].clientX) - Number(screenX)
        amoutY = Number(e.screenY || e.changedTouches[0].clientY) - Number(screenY)
        console.log(img.style.getPropertyValue('transform'));
        img.style.transform = `translate(${amoutX}px,${amoutY}px) rotate(${Math.floor(57.2958 * Math.atan(amoutX / img.offsetHeight))}deg)`

    }
    const stopMoving = (e) => { 
        e.preventDefault()
        amoutX = Number(e.screenX || e.changedTouches[0].clientX) - Number(screenX)
        amoutY = Number(e.screenY || e.changedTouches[0].clientY) - Number(screenY)
        console.log(`amountx ${amoutX} amountY ${amoutY}`);
        if((Math.abs(amoutX)>50)){ 
            if(!played){
                audio.play()
            }
            played=true
            if(amoutX>50){
            hearts.forEach(heart=>{
                    heart.animate([
                        {
                            opacity:.5,
                            visibility:`visible`,
                            transform: 'translate(0px,-80px) scale(.4)'
                        },
                    ],{
                        duration:1000,
                        delay:100, 
                    })
                    
                })
            }else{
                dislikes.forEach(dis=>{
                    dis.animate([
                        {
                            opacity:.5,
                            visibility:`visible`,
                            transform: 'translate(0px,-80px) scale(.4)'
                        },
                    ],{
                        duration:1000,
                        delay:100, 
                    })
                    
                })
            } 
            if(i+1<imgs.length){
                imgs[i+1].classList.add('active')
            }
            img.animate([
                {
                    opacity:0,
                    visibility:`hidden`,
                },
            ],{
                duration:400,
                delay:00,
                fill:'forwards'
            })
        }else{
            requestAnimationFrame(()=>{
                img.style=''
                img.style.setProperty('--i',`${imgs.length-i}`)
                img.classList.add('active')
            })
        }
        // img.style.transition = `transform 200ms 00ms ease`
        // img.style.transform = `translateX(0px) rotate(0deg)`
        console.log('stopMoving')

        img.removeEventListener('mousemove', moving, false)
        img.removeEventListener('touchmove', moving, false)
        img.removeEventListener('mouseup', stopMoving, false)
        img.removeEventListener('touchend', stopMoving, false)
        img.removeEventListener('mouseleave', stopMoving, false)
        
    }

    img.addEventListener('mousedown', start, false)
    img.addEventListener('touchstart', start, false)
    img.addEventListener('dragstart', (e) => e.preventDefault(), false)
});

