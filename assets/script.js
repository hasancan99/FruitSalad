const fruitForm = document.querySelector("#inputSection form")
const fruitNutrition = document.querySelector("#nutritionSection p")        //refers to the p tag in the nutrition section
let cal = 0
console.log(fruitForm)

const fruitList = document.querySelector("#fruitSection ul")



const addFruit = (fruit) =>{
    const li =document.createElement('li')
    li.textContent = `${fruit.name} of Genus ${fruit.genus}`

    li.addEventListener("click", ()=>{
        li.remove()
        cal -= fruit.nutritions.calories
        fruitNutrition.textContent= "Total Calories " + cal
    },{once: true})  
    fruitList.appendChild(li)

    

    cal+= fruit.nutritions.calories
    fruitNutrition.textContent= cal
}

const addImage = (fruit) => {
    const img = document.createElement('img')
    img.src = `${fruit.hits[0].webformatURL}`
    console.log(fruit.hits[0])
    fruitList.appendChild(img)
}

// const fetchFruitData = (fruit)=>{
//     fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
//         .then((res)=>res.json())
//         .then(data=>addFruit(data))
//         .catch((e)=> console.log(e))
// }

const fetchFruitData = async (fruit) =>{          //this fetch function has better readabilty and better error handling. Also you don't have to chain together the then functions
    try{
        const resp = await fetch(`https://laisfruitapi.onrender.com/fruits/${fruit}`)
        if (resp.ok){
            const data = await resp.json()
            addFruit(data)
        }else{
            throw "Error: http status code = " + resp.status
        }
    }catch (err){
        console.log(err)
    }
}

const fetchFruitImage = async(fruit) => {
    try {
        const resp = await fetch(`https://pixabay.com/api/?key=37050631-94e3049955c2bae83580c342b&q=${fruit}&image_type=photo`)
        if (resp.ok) {
            const data = await resp.json()
            addImage(data)
        }

    } catch (err) {
        console.log(err)
    }
}

const extractFruit = (e) => {
    e.preventDefault()
    fetchFruitData(e.target.fruitInput.value)
    fetchFruitImage(e.target.fruitInput.value)
    e.target.fruitInput.value = "" //this replaces what has been typed with an empty string
    
}

fruitForm.addEventListener("submit", extractFruit)    // The submit refers to the type of tag

