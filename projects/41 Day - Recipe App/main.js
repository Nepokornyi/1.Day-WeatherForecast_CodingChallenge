const result = document.getElementById('result');
const search = document.getElementById('search-button');


const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

search.addEventListener('click', () => { 
    const userInput = document.getElementById('user-input').value;
    if(userInput.length === 0) {
        result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`
    }

    else {
        fetch(url + userInput)
        .then((response) => response.json())
        .then((data) => {
            const myMeal = data.meals[0];
    
            let count = 1;
            let ingredients = [];
            for (let i in myMeal) {
                let ingredient = '';
                let measure = '';
                if(i.startsWith('strIngredient') && myMeal[i]) {
                    ingredient = myMeal[i];
                    measure = myMeal[`strMeasure` + count];
                    count += 1;
                    ingredients.push(`${measure} ${ingredient}`)
                }
            }
    
            result.innerHTML = `
                <img src=${myMeal.strMealThumb}>
                <div class='details'>
                    <h2>${myMeal.strMeal}</h2>
                    <h4>${myMeal.strArea}</h4>
                </div>
                <div id='ingredient-list'></div>
                <div id='recipe'>
                    <button id='hide-recipe'>X</button>
                    <pre id='instructions'>${myMeal.strInstructions}</pre>
                </div>
                <button id='show-recipe'>View Recipe</button>
                `;
    
            const ingredientList = document.getElementById('ingredient-list');
            const recipe = document.getElementById('recipe');
            const hideRecipe = document.getElementById('hide-recipe');
            const showRecipe = document.getElementById('show-recipe');
            let parent = document.createElement('ul');
    
            ingredients.forEach((i) => {
                let child = document.createElement('li');
                child.innerText = i;
                parent.appendChild(child);
                ingredientList.appendChild(parent)
            });
    
            hideRecipe.addEventListener('click', () => {
                recipe.style.display = 'none';
            });
            showRecipe.addEventListener('click', () => {
                recipe.style.display = 'block';
            })
        }).catch(() => {
            result.innerHTML = `<h3>Invalid Name</h3>`
        })
    }

})

