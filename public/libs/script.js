'use strict';

function MainScript() {
	var me = this;

	this.styleScript = new StyleScript;
	this.pieChart = new CreatePieChart;
	
	this.submitButton = document.querySelector('.add_new_food');
	this.filterButton = document.querySelector('.filter_button');
	this.calorieButton = document.querySelector('.calorie_button');
	console.log(this.filterButton);

	this.url = 'http://localhost:3000/meals';

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

	this.giveFilterDate = function() {
		this.filterDate = document.querySelector('.filter_date');
		this.filterDateValue = this.filterDate.value;
		this.filteredDate = this.filterDateValue.replace(/\-/g,'/');
		return this.filteredDate;
	}

	this.submitButtonListener = function() {
		this.submitButton.addEventListener('click', function() {
			var data = JSON.stringify(me.dataToObject());
			me.createRequest('POST', me.url, data, me.insertOneMeal);
		});
	}

	this.filterButtonListener = function() {
		this.filterButton.addEventListener('click', function() {
			me.pieChart.myData = [];
			me.makeFilter();
		});
		me.pieChart.myData = [];
		me.makeFilter();
	}

	this.calorieButtonListener = function() {
		this.calorieButton.addEventListener('click', function() {
			me.pieChart.myData = [];
			me.createNewPieChart(me.pieChart.plotData); 
		});
	}

	this.createNewPieChart = function(cb) {
		var badCalorie = document.querySelectorAll('.bad').length;
		var mediumCalorie = document.querySelectorAll('.medium').length;
		var goodCalorie = document.querySelectorAll('.good').length;
		console.log(goodCalorie);
		me.pieChart.myData.push(badCalorie, mediumCalorie, goodCalorie);
		cb();
	}

	this.countCalories = function() {
		var sumCalorie = 0;
		var mealsHolder = document.querySelector('.meals');
		const mealsDiv = Array.from(mealsHolder.children);
		Array.from(mealsHolder.children);
		mealsDiv.forEach( function(meal) {
			var actualMealCalorie = meal.children[2].innerText
			sumCalorie += Number(actualMealCalorie);
		});
		console.log(sumCalorie);
		return sumCalorie;
	}


	this.makeFilter = function() {
		var mealsHolder = document.querySelector('.meals');
		const mealsDiv = 
			Array.from(mealsHolder.children);
		mealsDiv.forEach(function(meal) {
 			var compareDate = meal.children[1].innerText.substring(0, 10);
 			var filterDate = me.giveFilterDate();
 			if(filterDate !== compareDate) {
 				document.getElementById(meal.id).remove();
				me.addCalorieToHtml(filterDate);
 			}
 		});
		me.createNewPieChart(me.pieChart.plotData);
	}

	this.addCalorieToHtml = function(date) {
		var filterDateHeader = document.querySelector('.filtered_date');
		filterDateHeader.innerText = '';
		filterDateHeader.innerText = date;
		filterDateHeader.innerText += ' ' + this.countCalories() + ' (Kcal)';
	}
	

	this.removeMealRequest = function(id) {
		var url = this.url + '/' + id;
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
		var meal = JSON.parse(data);
		me.styleScript.templateForMeal(meal);
	}

	this.getAllMeals = function(cb) {
		me.createRequest('GET', me.url, {}, me.appendToMealsholder);
	}

	this.init = function() {
		this.getAllMeals(this.createNewPieChart);
		this.submitButtonListener();
		this.deleteButtonListener();
		this.filterButtonListener();
		this.calorieButtonListener();
	}
}

var app = new MainScript();
app.init();