console.log('HELLO');

const recipes = [
	{
		title: 'Eggs',
		picture: 'https://bit.ly/2ZXyiKI',
		author: 'Loïc',
		difficulty: 'easy',
		timing: '15',
		ingredients: ['eggs', 'salt', 'oil'],
		steps: [
			'Put a pan on the fire',
			'Crack the eggs on it',
			'Wait, put them out',
			'Add some oil and salt on it',
		],
		id: 1596168482053,
	},
	{
		title: 'Ravitoto',
		picture: 'https://bit.ly/2ZXyiKI',
		author: 'Mama onja',
		difficulty: 'difficult',
		timing: 'less than 15',
		ingredients: ['cassava leaves', 'salt', 'oil'],
		steps: [
			'Put a pot on fire',
			'Pour some oil in',
			'Wait, add some water',
			'Add some salt in and add the cassava leaves',
		],
		id: 1596168522409,
	},
	{
		title: 'My recipe',
		picture: 'https://bit.ly/2ZXyiKI',
		author: 'Maman Rija',
		difficulty: 'Medium',
		timing: 'more than 1h',
		ingredients: ['eggs', 'salt', 'vegetable'],
		steps: [
			'Put a pot on the fire',
			'add the vegetable',
			'Wait, put them out',
			'Add some salt in',
		],
		id: 1596168522409,
	},
];
const recipeContainer = document.querySelector('.container');
const renderCard = () => {
	// check the recipes collection
	//loop through the ingredients
	for (let i = 0; i < recipes.length; i++) {
		const ingr = recipes[i].ingredients;
		ingr.forEach(element =>  {
			return `<li>${element}</li>`;
		});

	//loop through the steps
	for (let i = 0; i < recipes.length; i++) {
		const step = recipes[i].steps;
		step.forEach(element =>  {
			return `<li>${element}</li>`;
		
		});
	}
	// generate the HTML
	const myRecipeCard = `
	<div class="recipe" data-id="${recipes[i].id}" data-ingr="${recipes[i].ingredients}" data-step="${recipes[i].steps}">
		<h3>${recipes[i].title}</h3>
		<img src="${recipes[i].picture}" alt="${recipes[i].title}">
		<ul class="tim-dif">
			<li class="timing">Timing:${recipes[i].timing}</li>
			<li class="difficulty">Difficulty:${recipes[i].difficulty}</li>
		</ul>
		<button class="more-info">More info</button>
	</div>
	`;
	// put it in the DOM
	recipeContainer.insertAdjacentHTML("beforeend", myRecipeCard);
	}
};

const generateButton = document.querySelector('button.generate');
const outerModal = document.querySelector('.outer-modal');
const innerModal = document.querySelector('.inner-modal');


const handleMoreInfoBtn = (e) => { // more info btn
	if (e.target.matches('.more-info')) {
		const parent = e.target.closest('.recipe');
		const id = Number(parent.dataset.id);
		const {ingr, step} = parent.dataset; 
		const recipe = recipes.find(recipe => recipe.id === id);
		const modalHtml = `
		<div>
		<h3>${recipe.title} by <small>${recipe.author}</small></h3>
		<img src="${recipe.picture}" alt="${recipe.title}">
		<ul class="tim-dif">
			<li class="timing">Timing:${recipe.timing}</li>
			<li class="difficulty">Difficulty:${recipe.difficulty}</li>
			<li class="ingred-list">Ingredients:
				<ul class="steps">
					${ingr}
				</ul>
			</li>
			<li>Steps:
				<ul class="steps">
					${step}
				</ul>
			</li>
		</ul>
		</div>
		`;
		innerModal.innerHTML = modalHtml;
		outerModal.classList.add('open');
	}
}
	

// close the modal
const closeModal = () => {
    outerModal.classList.remove('open');
}

outerModal.addEventListener('click', event => {
    const isOutside = !event.target.closest('.inner-modal');
    if (isOutside) {
        outerModal.classList.remove('open');
    } 
});

window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// add a new recipe
const addNewRecipeBtn = document.querySelector('.add-recipe');
const handleAddRecipeBtn = (e) => {
	const myform = `
	<form>
                <div>
                    <p><label for="name">What's the recipe name?</label></p>
                    <p><input type="text" name="name" id="name" required></p>
                </div>
                <div>
                    <p><label for="picture">Picture of the result(URL)</label></p>
                    <p><input type="url" name="picture" id="picture" required></p>
                </div>
                <div>
                    <p><label for="cook-name">Who is the cook?</label></p>
                    <p><input type="text" name="cook" id="cook-name" required></p>
                </div>
                <div>
                    <p><label for="difficulty">What's the difficulty?</label></p>
                    <p>
                        <select name="difficulty" id="difficulty">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </p>
                </div>
                <div>
                    <p><label for="time">How much time does it take?</label></p>
                    <p>
                        <select name="time" id="time">
                            <option value="less-than-15min">Less than 15min</option>
                            <option value="15mn">15min</option>
                            <option value="30min">30min</option>
                            <option value="45min">45min</option>
                            <option value="60min">60min</option>
                            <option value="more-than-1h">More than 1h</option>
                        </select>
                    </p>
                </div>
                <div>
                    <p><label for="ingredients">Ingredients</label></p>
                    <ul class="ingredient-list">
                        <li><input type="text" name="ingredient1" id="ingredient1"><br></li>
                    </ul>
                    <p><button class="add-new-ingredient">Add a new ingredient to the list</button></p>
                </div>
                <div>
                    <p><label for="steps">Steps</label></p>
                    <ol class="step-list">
                        <li><input type="text" name="step1" id="step1"><br></li>
                    </ol>
                    <p><button class="add-new-step">Add a new step to the list</button></p>
                </div>
                <button class="submit-btn" type="submit">Submit</button>
            </form>`;
			innerModal.innerHTML = myform;
			outerModal.classList.add('open');
		}

//add event listener

window.addEventListener('click', handleMoreInfoBtn);
generateButton.addEventListener('click', renderCard);
addNewRecipeBtn.addEventListener('click', handleAddRecipeBtn);
