window.addEventListener("load", function(event) {
	var forms = document.querySelectorAll("form");
	var css   = document.styleSheets;

	for(var i = 0; i < forms.length; i++)
		forms[i].action = "";

	for(var i = 0; i < css.length; i++)
		if(css[i].title === "loading")
			//css[i].deleteRule("form");
			css[i].disabled = true;
});