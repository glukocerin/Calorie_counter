'use strict';


function StyleScript() {
	var me = this;
	this.meals = document.querySelector('.meals');
	
	this.templateForMeal = function(meal) {
		console.log(meal.calories);
		this.createMealDiv(meal, function(meal) {
			me.createMealName(meal.name, me.elementAppendToDome);
			me.createMealDate(meal.date, me.elementAppendToDome);
			me.createCalorie(meal.calories, me.elementAppendToDome);
			me.createDeleteButton(me.elementAppendToDome);
		});
	}

	this.createMealDiv = function(meal, cb) {
		this.mealDiv = document.createElement('div');
		this.mealDiv.id = meal.id;
		this.mealDiv.className = 'meal_holder';
		this.meals.insertBefore(this.mealDiv, this.meals.childNodes[0]);
		cb(meal);
	}

	this.elementAppendToDome = function(data) {
		me.mealDiv.appendChild(data);
	}

	this.createMealName = function(name, cb) {
		var mealNameLabel = document.createElement('div');
		mealNameLabel.innerText = name;
		mealNameLabel.className = 'meal_name';
		cb(mealNameLabel);
	}

	this.createMealDate = function(date, cb) {
		var mealDate = document.createElement('div');
		mealDate.className = 'meal_date';
		mealDate.innerText = date;
		cb(mealDate);
	}

	this.createCalorie = function(calorieData, cb) {
		var calorie = document.createElement('div');
		calorie.className = 'meal_calorie';
		console.log(calorieData);
		calorie.innerText = calorieData;
		cb(calorie);
	}

	this.createDeleteButton = function(cb) {
		var button = document.createElement('button');
		button.className = 'delete_button';
		button.innerText = 'delete';
		cb(button);
	}
}