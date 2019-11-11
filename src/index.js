const pupsURL = 'http://localhost:3000/pups/'

document.addEventListener("DOMContentLoaded", ()=>{
    const div = document.querySelector("#dog-bar")
    const showDiv = document.querySelector("#dog-info")
    const img = document.createElement("img")
    const h2 = document.createElement("h2")
    const statusBtn = document.createElement("button")
    const filterStatus = document.querySelector("#good-dog-filter")

    if(!!div.firstChild){
        fetch(pupsURL)
        .then(res => res.json())
        .then(pupsData => {
            pupsData.forEach( data =>{
                createPup(data)
            })
        })
    }
            
    filterStatus.addEventListener("click", ()=>{
        if(filterStatus.innerText === "Filter good dogs: OFF"){

            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }

            filterStatus.innerText = "Filter good dogs: ON"
            
            fetch(pupsURL)
            .then(res => res.json())
            .then(pupsData => {
                pupsData.forEach( data =>{
                    if(data.isGoodDog){
                        createPup(data)
                    }
                })
            })

        }else if(filterStatus.innerText === "Filter good dogs: ON"){

            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }

            filterStatus.innerText = "Filter good dogs: OFF"

            fetch(pupsURL)
            .then(res => res.json())
            .then(pupsData => {
                pupsData.forEach( data =>{
                    createPup(data)
                })
            })
        }
    })

    const createPup = (data) => {
        const span = document.createElement('span')
        span.innerText = data.name
        span.style.cursor = "pointer"

        showPup(data,span)

        div.append(span)
    }

    const showPup = (data,span) => {

        span.addEventListener("click", () =>{
            img.src, h2.innerText, statusBtn.innerText = ""

            let status = data.isGoodDog
            let pupStatus = "Good"
            if(status === true){
                pupStatus="Good"
            }else if(status === false){
                pupStatus="Bad"
            }

            img.src = data.image
            h2.innerText = data.name
            statusBtn.id = data.id
            statusBtn.innerText = `${pupStatus} Dog!`

            changeStatus(data,statusBtn,status,pupStatus)

            showDiv.append(img,h2,statusBtn)
        })
    }

    const changeStatus = (data,statusBtn,status,pupStatus) =>{

        statusBtn.addEventListener("click", () => {

            if(status === true){
                status= false
                pupStatus="Bad"
            }else if(status === false){
                status=true
                pupStatus ="Good"
            }
            fetch(`${pupsURL}${data.id}`, {
                method:'PATCH',
                headers:{
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    "isGoodDog": status
                })
            })
            .then(res=> res.json())
            .then(data => {
                statusBtn.innerText = `${pupStatus} Dog!`
            })
        })
    }
})
// const pupsURL = 'http://localhost:3000/pups/'

// document.addEventListener("DOMContentLoaded", ()=>{

//     const divInfo = document.querySelector('#dog-info')
//     const img = document.createElement('img')
//     const h2 = document.createElement('h2')
//     const statusBtn = document.createElement('button')

//     fetch(pupsURL)
//     .then(res => res.json())
//     .then(dogsData => {
//         dogsData.forEach(data =>{
//             createDog(data)
//         })
//     })

//     const createDog = (data) => {
//         const div = document.querySelector("#dog-bar")
        
//         let status = "good"
//         if(data.isGoodDog){
//             status = 'Good'
//         }else if(!data.isGoodDog){
//             status = 'Bad'
//         }

//         const span = document.createElement("span")
//         span.innerText = data.name
//         span.style.cursor = 'pointer'
        
//         span.addEventListener('click', () => {
//             img.innerText,h2.innerHTML,statusBtn.innerHTML = ""
//             img.src = data.image
//             h2.innerText =data.name
//             statusBtn.id = data.id
//             statusBtn.innerText = `${status} Dog`
//             divInfo.append(img,h2,statusBtn)
//         })
        
//         div.append(span)
//     }

//     statusBtn.addEventListener("click", ()=>{
//         event.preventDefault()
//         let btnText = event.target.innerText
//         let id = event.target.id
//         let statusNew = true
//         console.log(`${pupsURL}${event.target.id}`)
//         if(btnText === "Bad Dog"){
//             statusNew = true
//             btnText = "Good Dog"
//         }else if(btnText === "Good Dog"){
//             statusNew =false
//             btnText = "Bad Dog"
//         }

//         fetch(`${pupsURL}${event.target.id}`, {
//             method: 'PATCH',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 isGoodDog: statusNew
//             })
//         })
//         .then(res => res.json())
//         .then(statusBtn.innerText = btnText)
//     })
// })
