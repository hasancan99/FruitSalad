(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

// const fetchFruitData = (fruit)=>{
//     fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
//         .then((res)=>res.json())
//         .then(data=>addFruit(data))
//         .catch((e)=> console.log(e))
// }

const fetchFruitData = async (fruit) =>{          //this fetch function has better readibilty and better error handling. Also you don't have to chain together the then functions
    try{
        const resp = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
        if (resp.ok){
            const data = await resp.json()
            addFruit(data)
        }else{
            throw "Erro: http status code = " + resp.status
        }
    }catch (err){
        console.log(err)
    }
}

const extractFruit = (e) => {
    e.preventDefault()
    fetchFruitData(e.target.fruitInput.value)
    e.target.fruitInput.value = "" //this replaces what has been typed with an empty string
    
}

fruitForm.addEventListener("submit", extractFruit)    // The submit refers to the type of tag


},{}]},{},[1]);
