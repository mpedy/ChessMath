moveRook = function(casella, x,y){
	possible_moves = new Array();
	for(var i=1; i<9; i++){//up
		var newcasella = casella[0]+(y+i)
		if(y+i<9 && ( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
			possible_moves.push(newcasella)
		}
		try{
			if(y+i>=8 || obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type")) ){
				break;
			}
		}catch (errore){
			continue;
		}
	}
	for(var i=1; i<9; i++){//down
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
	for(var i=1; i<9; i++){//dx
		//console.log("Dx: "+(x+i));
		var newcasella = String.fromCharCode(65+x+i-1)+casella[1]
		//console.log("Newcasella: "+newcasella)
		if(x+i<9 && (
			$("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
			possible_moves.push(newcasella)
		}
		try{
			if(x+i>=8 || obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type")) ){
				break;
			}
		}catch (errore){
			continue;
		}
	}
	for(var i=1; i<9; i++){//sx
		//console.log("Sx: "+(x-i));
		var newcasella = String.fromCharCode(65+x-i-1)+casella[1]
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
	for(var i=1; i<9; i++){//sx up
		if(x-i>0 && y+i<9){
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
	for(var i=1; i<9; i++){//sx down
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
	for(var i=1; i<9; i++){//dx up
		//console.log("Dx: "+(x+i));
		if(x+i<9 && y+i<9){
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
	for(var i=1; i<9; i++){//dx down
		//console.log("Sx: "+(x-i));
		if(x+i<9 && y-i>0){
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
	if(y+2<9){
		if(x-1>0){
			var newcasella = String.fromCharCode(x-1+65-1)+(y+2)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
		if(x+1<9){
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
		if(x+1<9){
			var newcasella = String.fromCharCode(x+1+65-1)+(y-2)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
	}
	if(x+2<9){
		if(y-1>0){
			var newcasella = String.fromCharCode(x+2+65-1)+(y-1)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
		if(y+1<9){
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
		if(y+1<9){
			var newcasella = String.fromCharCode(x-2+65-1)+(y+1)
			if(( $("#"+newcasella).children().length==0 || !obstacles.includes($("#"+newcasella).children()[0].getAttribute("data-type"))) ){
				possible_moves.push(newcasella)
			}
		}
	}

	return possible_moves;
}


