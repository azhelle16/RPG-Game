/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

/* GLOBAL VARIABLES */
var bp = {
	"ariel" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
	"aurora" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
	"belle" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
	"cinderella" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
	"jasmine" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
	"mulan" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
	"pocahontas" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
	"snow white" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
	"tiana" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
	player1 : "",
	player2 : "",
	p1Attack : 1,
	disabled : 0
}

$(document).ready(function() {

	//set background image same size of the body
	document.body.style.backgroundSize = window.innerWidth+"px "+window.innerHeight+"px"

	//generates HP for each of the princess
	generateHPValues();

	//generate attack values for each of the princess
	generateAttackValues();

	//generate counter attack values for each of the princess
	generateCounterAttackValues();

	//initializes button functionalities
	initializeButtons();


})

/*
 #######################################################################
 #
 #  FUNCTION NAME : generateHPValues
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 14, 2019 PST
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 17, 2019 PST
 #  REVISION #    : 1
 #  DESCRIPTION   : generates random number for HP values
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function generateHPValues() {

	var valArr = []
	var num = 0 // 9 random numbers should be selected

	while (num != 9) {
		var rand = Math.ceil(Math.random() * (300 - 100) + 100);
		if (!valArr.includes(rand)) {
			num++;
			valArr.push(rand)
		}
	}

	var i = 0;
	$('#prImg img').each(function() {
		if ($(this).hasClass("princesses")) {
			switch (i) {
				case 0 : bp["ariel"]["hp"] = valArr[i]; break;
				case 1 : bp["aurora"]["hp"] = valArr[i]; break;
				case 2 : bp["belle"]["hp"] = valArr[i]; break;
				case 3 : bp["cinderella"]["hp"] = valArr[i]; break;
				case 4 : bp["jasmine"]["hp"] = valArr[i]; break;
				case 5 : bp["mulan"]["hp"] = valArr[i]; break;
				case 6 : bp["pocahontas"]["hp"] = valArr[i]; break;
				case 7 : bp["snow white"]["hp"] = valArr[i]; break;
				case 8 : bp["tiana"]["hp"] = valArr[i]; break;
			}
			$(this).next().children().text(valArr[i]);
			i++;
		}
	})

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : initializeButtons
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 15, 2019 PST
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 20, 2019 PST
 #  REVISION #    : 4
 #  DESCRIPTION   : initializes button functionalities
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function initializeButtons() {

	$("#prImg img").on("click",function() {
		if(bp.player1 == "" || bp.player2 == "") {
			var pr = $(this).attr("alt").split(" ")[1].toLowerCase();
			var sel = "./assets/images/"+pr+"_fb.png"
			if (pr == "snowwhite") //for snow white
				pr = "snow white"
			var j = $("<img src='"+sel+"'>")
			// $(this).parent().addClass("dispHide")
			if (bp.player1 == "") {
				$("#player1").append(j)
				bp.player1 = pr;
				bp[pr]["main"] = true;
				$("#p1HP").empty().append("Current HP: "+bp[bp.player1]["hp"])
			} else {
				$("#player2").append(j)
				bp.player2 = pr;
				bp[pr]["enemy"] = true;
				$("#p2HP").empty().append("Current HP: "+bp[bp.player2]["hp"])
				bp.disabled += 1
			  }
			$(this).parent().css("opacity","0").attr("disabled",true)
		}
	})

	$("#attackButton").on("click",function(){
		if ($("#player1").children().length == 0 && $("#player2").children().length == 0) {
			alert("Please select characters for both challenger and defender.")
			return false
		} else if ($("#player2").children().length == 0) {
			alert("Please select a character to fight with.")
			return false
		  }

		//MAIN CHARACTER
		var toSub = bp[bp.player2]["hp"] - (bp[bp.player1].attack * bp.p1Attack)		
		bp[bp.player2]["hp"] = toSub
		
		//ENEMY
		var toSub2 = bp[bp.player1]["hp"] - bp[bp.player2].cAttack
		bp[bp.player1]["hp"] = toSub2
		

		$("#p1Status").empty().append("You attacked "+ucwords(bp.player2)+" for "+(bp[bp.player1].attack * bp.p1Attack)+" damage.")
		$("#p1HP").empty().append("Current HP: "+bp[bp.player1]["hp"])
		$("#p2Status").empty().append(ucwords(bp.player2)+" attacked you back for "+(bp[bp.player2].cAttack)+" damage.")
		$("#p2HP").empty().append("Current HP: "+bp[bp.player2]["hp"])
		bp.p1Attack += 1

		if (bp[bp.player1]["hp"] <= 0 && bp[bp.player2]["hp"] > 0) {
			$("#p1Status").empty().append("You got defeated by "+ucwords(bp.player2))
			$("#player1, #p1HP").empty();
			$("#attackButton").addClass("dispHide");
			$("#restartButton").removeClass("dispHide");
		} else if (bp[bp.player2]["hp"] <= 0  && bp[bp.player1]["hp"] > 0) {
			//CHECK IF THERE IS ENOUGH PLAYERS LEFT
			if (bp.disabled == $("#prImg img").length - 1) {
				$("#p1Status").empty().append("Congratulations! You defeated all the princesses!")
				$("#attackButton").addClass("dispHide");
				$("#restartButton").removeClass("dispHide");
			} else {
				$("#p1Status").empty().append("You defeated "+ucwords(bp.player2))
			  }						
			$("#player2, #p2Status, #p2HP").empty();
			bp.player2 = ""
		  } else if (bp[bp.player2]["hp"] <= 0  && bp[bp.player1]["hp"] <= 0) {
		  		if (bp[bp.player1]["hp"] > bp[bp.player2]["hp"]) {
		  			if (bp.disabled == $("#prImg img").length - 1) {
						$("#p1Status").empty().append("Congratulations! You defeated all the princesses!")
					} else {
		  				$("#p1Status").empty().append("You don't have enough HP to continue with the battle.")
		  			  }	
		  			$("#player2, #p2HP, #p2Status").empty();
					$("#attackButton").addClass("dispHide");
					$("#restartButton").removeClass("dispHide");
				} else {
					$("#p1Status").empty().append("You got defeated by "+ucwords(bp.player2))
					$("#player1, #p1HP").empty();
					$("#attackButton").addClass("dispHide");
					$("#restartButton").removeClass("dispHide");
				  }
		    }

	})

	$("#restartButton").on("click",function(){
		restartGame();
	})

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : generateAttackValues
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 16, 2019 PST
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 17, 2019 PST
 #  REVISION #    : 2
 #  DESCRIPTION   : generates random number for Attack values
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function generateAttackValues() {

	var valArr = []
	var num = 0 // 9 random numbers should be selected

	while (num != 9) {
		var rand = Math.ceil(Math.random() * (20 - 5) + 5);
		if (!valArr.includes(rand)) {
			num++;
			valArr.push(rand)
		}
	}

	var i = 0;
	$('#prImg img').each(function() {
		if ($(this).hasClass("princesses")) {
			switch (i) {
				case 0 : bp["ariel"]["attack"] = valArr[i]; break;
				case 1 : bp["aurora"]["attack"] = valArr[i]; break;
				case 2 : bp["belle"]["attack"] = valArr[i]; break;
				case 3 : bp["cinderella"]["attack"] = valArr[i]; break;
				case 4 : bp["jasmine"]["attack"] = valArr[i]; break;
				case 5 : bp["mulan"]["attack"] = valArr[i]; break;
				case 6 : bp["pocahontas"]["attack"] = valArr[i]; break;
				case 7 : bp["snow white"]["attack"] = valArr[i]; break;
				case 8 : bp["tiana"]["attack"] = valArr[i]; break;
			}
			// $(this).next().children().text(valArr[i]);
			i++;
		}
	})

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : generateCounterAttackValues
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 16, 2019 PST
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 19, 2019 PST
 #  REVISION #    : 2
 #  DESCRIPTION   : generates random number for Counter Attack values
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function generateCounterAttackValues() {

	var valArr = []
	var num = 0 // 9 random numbers should be selected

	while (num != 9) {
		var rand = Math.ceil(Math.random() * (30 - 20) + 20);
		if (!valArr.includes(rand)) {
			num++;
			valArr.push(rand)
		}
	}

	var i = 0;
	$('#prImg img').each(function() {
		if ($(this).hasClass("princesses")) {
			switch (i) {
				case 0 : bp["ariel"]["cAttack"] = valArr[i]; break;
				case 1 : bp["aurora"]["cAttack"] = valArr[i]; break;
				case 2 : bp["belle"]["cAttack"] = valArr[i]; break;
				case 3 : bp["cinderella"]["cAttack"] = valArr[i]; break;
				case 4 : bp["jasmine"]["cAttack"] = valArr[i]; break;
				case 5 : bp["mulan"]["cAttack"] = valArr[i]; break;
				case 6 : bp["pocahontas"]["cAttack"] = valArr[i]; break;
				case 7 : bp["snow white"]["cAttack"] = valArr[i]; break;
				case 8 : bp["tiana"]["cAttack"] = valArr[i]; break;		}
			// $(this).next().children().text(valArr[i]);
			i++;
		}
	})

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : ucwords
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 17, 2019 PST
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : capitalizes the first letter of the string
 #  PARAMETERS    : string
 #
 #######################################################################
*/

function ucwords (str) {

    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : restartGame
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 17, 2019 PST
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 20, 2019 PST
 #  REVISION #    : 1
 #  DESCRIPTION   : restarts the whole game
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function restartGame() {

	bp = {
		"ariel" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
		"aurora" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
		"belle" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
		"cinderella" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
		"jasmine" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
		"mulan" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
		"pocahontas" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
		"snow white" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
		"tiana" : {"hp":0,"attack":0,"cAttack":0,"main":false,"enemy":false},
		player1 : "",
		player2 : "",
		p1Attack : 1,
		disabled : 0
	}

	$("#player1, #player2, #p1Status, #p2Status, #p1HP, #p2HP").empty();
	$("#attackButton").removeClass("dispHide");
	$("#restartButton").addClass("dispHide");
	$("#prImg img").each(function(){
		if ($(this).parent().attr("disabled") == "disabled") {
			$(this).parent().css("opacity","1").attr("disabled",false)
		}	
	})
	generateHPValues();
	generateAttackValues();
	generateCounterAttackValues();
}