const pupsURL = 'http://localhost:3000/pups/'

document.addEventListener("DOMContentLoaded", ()=>{

    const divInfo = document.querySelector('#dog-info')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const statusBtn = document.createElement('button')

    fetch(pupsURL)
    .then(res => res.json())
    .then(dogsData => {
        dogsData.forEach(data =>{
            createDog(data)
        })
    })

    const createDog = (data) => {
        const div = document.querySelector("#dog-bar")
        
        let status = "good"
        if(data.isGoodDog){
            status = 'Good'
        }else if(!data.isGoodDog){
            status = 'Bad'
        }

        const span = document.createElement("span")
        span.innerText = data.name
        span.style.cursor = 'pointer'
        
        span.addEventListener('click', () => {
            img.innerText,h2.innerHTML,statusBtn.innerHTML = ""
            img.src = data.image
            h2.innerText =data.name
            statusBtn.id = data.id
            statusBtn.innerText = `${status} Dog`
            divInfo.append(img,h2,statusBtn)
        })
        
        div.append(span)
    }

    statusBtn.addEventListener("click", ()=>{
        event.preventDefault()
        let btnText = event.target.innerText
        let id = event.target.id
        let statusNew = true
        console.log(`${pupsURL}${event.target.id}`)
        if(btnText === "Bad Dog"){
            statusNew = true
            btnText = "Good Dog"
        }else if(btnText === "Good Dog"){
            statusNew =false
            btnText = "Bad Dog"
        }

        fetch(`${pupsURL}${event.target.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: statusNew
            })
        })
        .then(res => res.json())
        .then(statusBtn.innerText = btnText)
    })
})
