'use strict';

function MainScript() {
	var me = this;

	this.styleScript = new StyleScript;
	
	this.submitButton = document.querySelector('.add_new_food');
	this.url = 'http://localhost:3000/meals';

	this.init = function() {
		this.getAllMeals();
		this.submitButtonListener();
		this.deleteButtonListener();
	}

	this.deleteButtonListener = function() {
		var mealsContainer = document.querySelector('.meals');
		mealsContainer.addEventListener('click', function(event) {
			if(event.target.className === 'delete_button') {
				var deleteMealId = event.target.parentNode.id;
				me.removeMealRequest(deleteMealId);
			}
		});
	}

	this.giveFoodName = function() {
		this.inputForFood = document.querySelector('.food_name');
		this.inputForFoodValue = this.inputForFood.value;
		if(this.inputForFoodValue !== ''){
			return this.inputForFoodValue;
		}
	}

	this.giveDate = function() {
		this.actualDate = document.querySelector('.actual_date');
		this.actualDateValue = this.actualDate.value;
		if(this.actualDateValue !== '') {
			return this.actualDateValue;
		}
	}

	this.giveCalorie = function() {
		this.calorie = document.querySelector('.calorie');
		this.calorieValue = this.calorie.value;
		if(this.calorieValue !== '') {
			return this.calorieValue
		}
	}

	this.submitButtonListener = function() {
		this.submitButton.addEventListener('click', function() {
			var data = JSON.stringify(me.dataToObject());
			me.createRequest('POST', me.url, data, me.insertOneMeal);
		});
	}

	this.getAllMeals = function() {
		me.createRequest('GET', me.url, {}, me.appendToMealsholder);
	}
	

	this.removeMealRequest = function(id) {
		var url = this.url + '/' + id;
		// console.log(url + ' ' + id);
		this.createRequest('DELETE', url, null, me.removeMeal);
	}

	this.dataToObject = function() {
		me.giveFoodName();
		me.giveDate();
		me.giveCalorie();
		return {
			name: me.inputForFoodValue,
			calories: me.calorieValue,
			date: me.actualDateValue
		};
	}

	this.createRequest = function(method, url, data, callback) {
	  var request = new XMLHttpRequest();
	  request.open(method, url);
	  request.setRequestHeader('Content-Type', 'application/json');
	  request.send(data);
	  request.onreadystatechange = function() {
	    // console.log('allapot: ', request.readyState);
	    if (request.readyState === 4) {
	      callback(request.response);
	    }
	  }
	}

	this.appendToMealsholder = function(data) {
		var meals = JSON.parse(data);
		meals.forEach(function(meal) {
			me.styleScript.templateForMeal(meal);
		});
	}

	this.removeMeal = function(data) {
		var deleteMeal = JSON.parse(data);
		document.getElementById(deleteMeal.id).remove(); 

	}

	this.requestChecker = function(data) {
		console.log(data);
	}

	this.insertOneMeal = function(data) {
		console.log(data);
		var meal = JSON.parse(data);
		me.styleScript.templateForMeal(meal);
	}

}

var app = new MainScript();
app.init();

console.log('mukszik');