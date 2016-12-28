let NGA = (function(){
	const 	APIKEY = "b432ab4c30b70e77ba87cefd375e0e8d",
			APIURL = "http://words.bighugelabs.com/api/2/b432ab4c30b70e77ba87cefd375e0e8d/",
			FONTS = ["Arial", "Helvetica", "sans-serif", "Arial Black", "Gadget", "Comic Sans MS5", "cursive", "Courier New", "monospace", "Georgia", "serif", "Impact", "monospace", "Lucida Console", "Palatino Linotype", "Palatino", "Tahoma", "Geneva", "Times New Roman", "Times", "Trebuchet MS", "Symbol", "MS Sans"],
			SIZES = [1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6],
			WEIGHTS = ["normal", "bold", "bolder", "lighter"],
			OPACITIES = [.4,.6,.8,1];

	let buildUrl = function(word){
		modifiedUrl = APIURL + word + "/json";
		return modifiedUrl;
	},

	randomItem = function(array){
		let itemNum = Math.floor(Math.random() * array.length);
			return array[itemNum];
	};

	return{
		init : function(fetch){

			document.addEventListener('keyup',function(e){
				if(e.keyCode === 13){
					e.preventDefault();
					e.stopPropagation();
					fetch.request();
				}
			});

		},
		reset : function(){
			if(document.getElementById('errorContainer').classList.value.indexOf("hide") === -1){
				document.getElementById('errorContainer').classList.add('hide');
			}
		},
		error : function(){
			document.getElementById('errorContainer').classList.remove('hide');
			document.getElementById('wordContainer').classList.add('hide');
		},
		fetch : (function(){
			return{
				buildUrl : function(){
					let word = document.getElementById("word").value,
						url = buildUrl(word);
						
					return url;
				},
				request : function(){
					let request = new XMLHttpRequest(),
						url = this.buildUrl(),
						that = this;

						NGA.reset();

					    request.open('GET', url, true);
					    
					    request.onload = function() {
					      if (request.status >= 200 && request.status < 400) {
					        // Success!
					        const DATA = JSON.parse(request.responseText);
					        	//console.log(DATA);
					        	
					        	that.generateWords(DATA);
					        
					      } else {
					        // We reached our target server, but it returned an error
					        console.log('error');
					        NGA.error();
					      }
					    };
					    
					    request.onerror = function() {
					      // There was a connection error of some sort
					      console.log("Connection Error");
					      NGA.error();
					    };
					    
					    request.send();
				},
				generateWords : function(data){
					let container = document.getElementById("wordContainer"),
						html = "";
						console.log('DATA',data);

						function build(word){
							let randomFont = randomItem(FONTS),
								randomSize = randomItem(SIZES),
								randomWeight = randomItem(WEIGHTS),
								randomOpacity = randomItem(OPACITIES);

							html += `<span class='synonym' style='font-family:${randomFont}; font-size: ${randomSize}rem; font-weight: ${randomWeight}; opacity:${randomOpacity}'>${word}</span>`;
							
						}

					for(let wordType in data){
						console.log(data[wordType]);
						
						
						
						/* If adjective */
						if(data[wordType] === "adjective"){
							let relArray = data[wordType]["rel"];
							let simArray = data[wordType]["sim"];
							synArray.map((rel)=>{
								build(rel);
							});
							
							synArray.map((sim)=>{
								build(sim);
							});
						/* Any other word type */
						}else{
							let synArray = data[wordType]["syn"];
							synArray.map((syn)=>{
								build(syn);
							});
						}
						
					};

					container.innerHTML = html;
					document.getElementById('wordContainer').classList.remove('hide');

				}
			}
		})()
	}
})();

NGA.init(NGA.fetch);




