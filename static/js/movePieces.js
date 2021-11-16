moveRook = function(casella, x,y){
	possible_moves = new Array();
	var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
	for(var i=1; i<dim+1; i++){//up
		var newcasella = casella[0]+(y+i)
		if(y+i<dim+1 && ( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
			possible_moves.push(newcasella)
		}
		try{
			if(y+i>=dim || obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type")) ){
				break;
			}
		}catch (errore){
			continue;
		}
	}
	for(var i=1; i<dim+1; i++){//down
		//console.log("Down: "+(y-i));
		var newcasella = casella[0]+(y-i)
		if(y-i>0 && ( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
			possible_moves.push(newcasella)
		}
		try{
			if(y-i<=1 || obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type")) ){
				break;
			}
		}catch (errore){
			continue;
		}
	}
	for(var i=1; i<dim+1; i++){//dx
		//console.log("Dx: "+(x+i));
		var newcasella = String.fromCharCode(65+x+i-1)+y
		//console.log("Newcasella: "+newcasella)
		if(x+i<dim+1 && (
			$("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
			possible_moves.push(newcasella)
		}
		try{
			if(x+i>=dim || obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type")) ){
				break;
			}
		}catch (errore){
			continue;
		}
	}
	for(var i=1; i<dim+1; i++){//sx
		//console.log("Sx: "+(x-i));
		var newcasella = String.fromCharCode(65+x-i-1)+y
		//console.log("Newcasella: "+newcasella)
		if(x-i>0 && (
			$("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
			possible_moves.push(newcasella)
		}
		try{
			if(x-i<=1 || obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type")) ){
				break;
			}
		}catch (errore){
			continue;
		}
	}
	return possible_moves;
}

moveBishop = function(casella, x, y){
	possible_moves = new Array();
	var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
	for(var i=1; i<dim+1; i++){//sx up
		if(x-i>0 && y+i<dim+1){
			var newcasella = String.fromCharCode(x-i+65-1)+(y+i)
			try{
				if(obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))){
					break;
				}
			}catch (errore){}
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
		else{
			break;
		}
	}
	for(var i=1; i<dim+1; i++){//sx down
		//console.log("Down: "+(y-i));
		if(x-i>0 && y-i>0){
			var newcasella = String.fromCharCode(x-i+65-1)+(y-i)
			try{
				if(obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))){
					break;
				}
			}catch (errore){}
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}else{
			break;
		}
	}
	for(var i=1; i<dim+1; i++){//dx up
		//console.log("Dx: "+(x+i));
		if(x+i<dim+1 && y+i<dim+1){
			var newcasella = String.fromCharCode(x+i+65-1)+(y+i)
			try{
				if(obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))){
					break;
				}
			}catch (errore){}
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}else{
			break;
		}
	}
	for(var i=1; i<dim+1; i++){//dx down
		//console.log("Sx: "+(x-i));
		if(x+i<dim+1 && y-i>0){
			var newcasella = String.fromCharCode(x+i+65-1)+(y-i)
			try{
				if(obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))){
					break;
				}
			}catch (errore){}
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}else{
			break;
		}
	}
	return possible_moves;
}


moveKnight = function(casella, x, y){
	possible_moves = new Array();
	var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
	if(y+2<dim+1){
		if(x-1>0){
			var newcasella = String.fromCharCode(x-1+65-1)+(y+2)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
		if(x+1<dim+1){
			var newcasella = String.fromCharCode(x+1+65-1)+(y+2)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
	}
	if(y-2>0){
		if(x-1>0){
			var newcasella = String.fromCharCode(x-1+65-1)+(y-2)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
		if(x+1<dim+1){
			var newcasella = String.fromCharCode(x+1+65-1)+(y-2)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
	}
	if(x+2<dim+1){
		if(y-1>0){
			var newcasella = String.fromCharCode(x+2+65-1)+(y-1)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
		if(y+1<dim+1){
			var newcasella = String.fromCharCode(x+2+65-1)+(y+1)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
	}
	if(x-2>0){
		if(y-1>0){
			var newcasella = String.fromCharCode(x-2+65-1)+(y-1)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
		if(y+1<dim+1){
			var newcasella = String.fromCharCode(x-2+65-1)+(y+1)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
	}

	return possible_moves;
}





toro_moveRook = function(casella, x,y){
	possible_moves = new Array();
	var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
	for(var i=1; i<dim*2+1; i++){//up
		var newcasella = casella[0]+((y+i-1)%dim+1)
		if(newcasella == casella){
			break;
		}
		if( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))){
			possible_moves.push(newcasella)
		}
		try{
			if(obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type")) ){
				break;
			}
		}catch (errore){
			continue;
		}
	}
	for(var i=1; i<dim*2+1; i++){//down
		var newcasella = casella[0]+((y-i-1)%dim+1)
		if(newcasella == casella){
			break;
		}
		if($("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))){
			possible_moves.push(newcasella)
		}
		try{
			if(obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))){
				break;
			}
		}catch (errore){
			continue;
		}
	}
	for(var i=1; i<dim*2+1; i++){//dx
		var newcasella = String.fromCharCode(65+((x+i-1)%dim+1)-1)+y
		if(newcasella == casella){
			break;
		}
		if($("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))){
			possible_moves.push(newcasella)
		}
		try{
			if(obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type")) ){
				break;
			}
		}catch (errore){
			continue;
		}
	}
	for(var i=1; i<dim*2+1; i++){//sx
		var _x = x-i
		while(_x <= 0){
			_x+=dim;
		}
		var newcasella = String.fromCharCode(65+((_x-1)%dim+1)-1)+y
		if(newcasella == casella){
			break;
		}
		if($("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))){
			possible_moves.push(newcasella)
		}
		try{
			if(obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))){
				break;
			}
		}catch (errore){
			continue;
		}
	}
	return possible_moves;
}
