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
}

getPoints = function(){
	return parseInt($("#points").text());
}