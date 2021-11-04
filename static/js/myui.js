myconfirm = function(title, text, yes_btn, no_btn, f1, f2, closable=true){
	var div = document.createElement("div");
	div.setAttribute("title", title);
	div.id = "mydialog_opened"
	div.innerHTML="<span>"+text+"</span>";
	document.body.appendChild(div);
	$(div).dialog({
		autoOpen : false, modal : true, show : "blind", hide : "blind", dialogClass: closable ? 'mainClassDialog' : 'no-close', buttons: [
		{
			text: yes_btn,
			icon: "ui-icon-check",
      		click: f1
      	}/*,
      	{
      		text: no_btn,
      		icon: "ui-icon-closethick",
      		click: f2
      	}*/]
	});
	$(div).dialog("open");
}

myconfirm_2b = function(title, text, yes_btn, no_btn, f1, f2, closable=true){
	var div = document.createElement("div");
	div.setAttribute("title", title);
	div.id = "mydialog_opened"
	div.innerHTML="<span>"+text+"</span>";
	document.body.appendChild(div);
	$(div).dialog({
		autoOpen : false, modal : true, show : "blind", hide : "blind", dialogClass: closable ? 'mainClassDialog' : 'no-close', buttons: [
		{
			text: yes_btn,
			icon: "ui-icon-check",
      		click: f1
      	},
      	{
      		text: no_btn,
      		icon: "ui-icon-closethick",
      		click: f2
      	}]
	});
	$(div).dialog("open");
}

myalert = function(title, text){
	var div = document.createElement("div");
	div.setAttribute("title", title);
	div.id = "mydialog_opened"
	div.innerHTML="<span>"+text+"</span>";
	document.body.appendChild(div);
	$(div).dialog({
		autoOpen : false, modal : true, show : "blind", hide : "blind", buttons: [
		{
			text: "Ok",
			icon: "ui-icon-check",
      		click: function() {$(this).dialog("close"); $(this).remove();}
      	}]});
	$(div).dialog("open");
}

updatePoints = function(punti){
	$("#points").text(parseInt($("#points").text()) + punti)
	var nome = $("#name").text()
	var pt = parseInt($("#points").text())
	$.ajax({
		url: "addPoints_"+nome+"_"+pt,
		success: function(resp){
			console.log(resp);
		},
		error: function(err){
			console.log(err)
		}
	})
}

getPoints = function(){
	return parseInt($("#points").text());
}

enlight = function(casella, color="yellow", end_pos=false){
	console.log("Enlighting "+casella)
	try{
		if(enlighted == casella){
			return;
		}
		enlighted = casella;
	}catch{}
	var elem = document.getElementById(casella);
	if( elem.childElementCount > 1){
		elem.removeChild(elem.children[elem.childElementCount-1]);
	}else{
		var div = document.createElement("div");
		if(end_pos){
			div.style="width: 70%; height: 70%; background: "+color+"; z-index: 1; position: relative; left: 15%; top: 15%; border-radius: 6px; border: 1px solid black;";
		}else{
			div.style="width: 100%; height: 100%; background: "+color+"; z-index: 1;";
		}
		elem.appendChild(div);
	}
}
enwrite = function(casella, txt, txt_color="white", bck_color="yellow"){
	var elem = document.getElementById(casella);
	if( elem.childElementCount > 1){
		elem.removeChild(elem.children[elem.childElementCount-1]);
	}else{
		var div = document.createElement("div");
		div.style="width: 70%; height: 70%; background: "+bck_color+"; z-index: 1;display: table;left:15%; top: 15%; position: relative; border-radius: 6px;";
		div.innerHTML = "<span style='display: table-cell; vertical-align: middle; color: "+txt_color+"'>"+txt+"</span>";
		elem.appendChild(div);
	}
}