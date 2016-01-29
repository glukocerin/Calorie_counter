'use strict';

function CreatePieChart() {
	var me = this;

	this.myColor = ["red","#CDDC39","green"];
    this.myData = [];

    this.getTotal = function(){
    	var myTotal = 0;
    	for (var j = 0; j < this.myData.length; j++) {
    		myTotal += (typeof this.myData[j] == 'number') ? this.myData[j] : 0;
    	}
    return myTotal;
    }

    this.plotData = function() {
      var canvas;
      var ctx;
      var lastend = 0;
      var myTotal = me.getTotal();

      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < me.myData.length; i++) {
          ctx.fillStyle = me.myColor[i];
          ctx.beginPath();
          ctx.moveTo(200,150);
          ctx.arc(200,150,150,lastend,lastend + (Math.PI*2*(me.myData[i]/myTotal)),false);
          ctx.lineTo(200,150);
          ctx.fill();
          lastend += Math.PI*2*(me.myData[i]/myTotal);
        }
    }
    // plotData();
}

