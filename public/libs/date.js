'use strict';

function DateConverter() {
	var me = this;	

	this.actualDate = {
		year: 0,
		month: 0,
		date: 0,
		hour: 0,
		minute: 0
	};

	this.compareDate = {
		breakfast: 5,
		lunch: 12, 
		dinner: 19
	};

	this.dateToObject = function(string) {
		var date = new Date(string);
		this.actualDate.year =  date.getFullYear();
		this.actualDate.month = this.pad(date.getMonth() + 1);
		this.actualDate.date = this.pad(date.getDate());
		this.actualDate.hour =  this.pad(date.getHours());
		this.actualDate.minute = this.pad(date.getMinutes());
		return this.actualDate;
	}
	
	this.formatDate = function(string) {
		this.dateToObject(string);
		return  this.actualDate.year + '/' + 
				this.actualDate.month + '/' +
				this.actualDate.date + ' ' +
				this.actualDate.hour + ':' +
				this.actualDate.minute;
	}


	this.pad = function(number) {
		if(number < 10) {
			return '0' + number;
		}
		return number;
	}

	this.isHealthy = function(date) {
		this.dateToObject(date);
		console.log(this.actualDate.hour);
		console.log(this.compareDate);
		if (this.actualDate.hour > this.compareDate.dinner) {
			return false;
		}
	}
}