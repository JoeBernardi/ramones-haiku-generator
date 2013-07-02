function new_count(word) {
	word = word.toLowerCase();                                    

  	//case-specific syllable corrections
  	if(word === "d.u.m.b" || word === "1-2-3-4" || word === "4-5-6-7") { return 4; }
  	else if (word === "ph.d" || word === "SLA" || word === "pt-boat" || word === "somebody" || word === "lsd" || word === "lsd," || word === "ddt" || word === "cia" || word === "ooo-ooo-whee!" || word === "53rd" || word === "everything's") { return 3; }
  	else if(word === "tryin'" || word === "moonlight?" || word === "lovely" || word === "wanted" || word === "couldn't" || word === "basement" || word ==="real" || word === "somethin'" || word === "daughter?" || word === "going" || word === "viet" || word === "lying" || word === "tv's" || word === "doing" || word === "gimme" || word === "tired" || word ==="cryin'" || word === "schatze") { return 2; }
  	else if(word.length <= 3 || word === "hand?" || word === "there's" || word === "where's" || word === "future's" || word === "rule") { return 1; }                           
  	else if (word.match(/[aeiouy]{1,2}/g) === null) {console.log(word)}

  		else {
  			word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');  
  			word = word.replace(/^y/, '');                                 

  		//if there's not a question mark in it we're good, otherwise it generally guesses one syllable too low. don't go below zero, though.
  		if(word.indexOf('?') === -1)
  		{
  			return word.match(/[aeiouy]{1,2}/g).length;                    
  		}

  		else 
  		{
  			if (word.match(/[aeiouy]{1,2}/g).length-1 === 0) 
  			{
  				return 1
  			}

  			else {
  				return word.match(/[aeiouy]{1,2}/g).length-1;
  			}
  		}
  	}
  }


  function rollinHaiku(data) {
  	var randomIndex = Math.floor(Math.random() * data.length);
  	var syllableCount = 0;
  	var words = [];
  	var haiku = [];
  	var hitFive = false;
  	var hitTwelve = false;
  	while (syllableCount < 17)
  	{
  		words.push(data[randomIndex]);
  		var syllables = new_count(data[randomIndex])
  		console.log(data[randomIndex] + " : " + syllables)
  		syllableCount += syllables
  		if(syllableCount === 5) {
  			hitFive = true;
  			haiku.push(words);
  			words = [];
  		}
  		else if (syllableCount === 12) {
  			hitTwelve = true;
  			haiku.push(words);
  			words = [];
  		}
  		else if (syllableCount === 17) {
  			haiku.push(words);
  			words = [];
  		}
  		randomIndex++
  	}
  	if(syllableCount > 17 || hitFive === false || hitTwelve === false) {
  		return rollinHaiku(data)
  	}
  	else {
  		return haiku

  	}
  }

  
String.prototype.toTitleCase = function () {
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;

  return this.replace(/([^\W_]+[^\s-]*) */g, function (match, p1, index, title) {
    if (index > 0 && index + p1.length !== title.length &&
      p1.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (p1.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
};

  function getSyllableLines() {
  	$("body").addClass("syllable")
  	$.get('lyrics.txt', function(data) {
  		data = data.replace(/(\r\n|\n|\r)/gm," ").split(" ");
  		var haiku = rollinHaiku(data);
  		var firstLine = haiku[0].toString().replace(/,/g, " ");
  		var secondLine = haiku[1].toString().replace(/,/g, " ");
  		var thirdLine = haiku[2].toString().replace(/,/g, " ")
  		$(".first-line").text(firstLine.toTitleCase())
  		$(".second-line").text(secondLine.toTitleCase())
  		$(".third-line").text(thirdLine.toTitleCase())
  		$("a#tweet").attr("href", "http://twitter.com/share?url=&text=" + firstLine.toTitleCase() + " / " + secondLine.toTitleCase() + " / " + thirdLine.toTitleCase() + " // http://bit.ly/HJ5fsN");
  	  	$("a#facebook").attr("href", "https://www.facebook.com/dialog/feed?app_id=458210984255191&link=http://ihatetourists.com/ramones&picture=http://ihatetourists.com/ramones/logo.png&caption=Haiku%20from%20the%20lyrics%20of%20the%20first%20three%20Ramones%20LPs.&name=Ramones%20Haiku%20Generator&description=" + encodeURIComponent(firstLine.toTitleCase()) + "%20%2F%20" + encodeURIComponent(secondLine.toTitleCase()) + "%20%2F%20" + encodeURIComponent(thirdLine.toTitleCase()) + "&redirect_uri=http://ihatetourists.com/ramones");

  	});
  }

  function getRegularLines() {
  	$("body").removeClass("syllable")
  	$.get('lyrics.txt', function(data) {

  		data = data.split("\n");
  		var lines = []
  		var i = 0
  		while (i < 3) {
  			var lineNumber = Math.floor(Math.random() * data.length);
  			lines.push(data[lineNumber]);
  			i++
  		}

  		$(".first-line").text(lines[0].toTitleCase())
  		$(".second-line").text(lines[1].toTitleCase())
  		$(".third-line").text(lines[2].toTitleCase())	
  		$("a#tweet").attr("href", "http://twitter.com/share?url=&text=" + lines[0].toTitleCase() + " / " + lines[1].toTitleCase() + " / " + lines[2].toTitleCase() + " http://bit.ly/HJ5fsN");
  		$("a#facebook").attr("href", "https://www.facebook.com/dialog/feed?app_id=458210984255191&link=http://ihatetourists.com/ramones&picture=http://ihatetourists.com/ramones/logo.png&caption=Haiku%20from%20the%20lyrics%20of%20the%20first%20three%20Ramones%20LPs.&name=Ramones%20Haiku%20Generator&description=" + encodeURIComponent(lines[0].toTitleCase()) + "%20%2F%20" + encodeURIComponent(lines[1].toTitleCase()) + "%20%2F%20" + encodeURIComponent(lines[2].toTitleCase()) + "&redirect_uri=http://ihatetourists.com/ramones");
  	})
  }

  $(document).ready(function() {
  	getRegularLines();
  	$("#more").click(function() {

  		$(".haiku, #explanation").animate({
  			left: '-150%'
  		}, 'fast', function() {
  			$("#explanation").hide();
  			$('body').removeClass('what')
  			$('.haiku').css("left","150%");

  			if($("#syllables").is(':checked')) {
  				getSyllableLines();			
  			}
  			else {
  				getRegularLines();
  			}

  			$('.haiku').animate({
  				left: '50%'
  			}, 'fast')
  		})

  	})

  	$("#what a").click(function() {
  		if(!$('body').hasClass('what')) {
  			$(".haiku").animate({
  				left: '-150%'
  			}, 'fast', function() {
  				$('body').addClass('what')
  				$('#explanation').css("left","150%");
  				$("#explanation").show().animate({
  					left: '50%'
  				})
  			})
  		}
  	})

  })
