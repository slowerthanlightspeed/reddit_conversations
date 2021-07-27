// WEB-WORKER TO GRAB DATA AND PARSE IT

// Data storage
let downloadedData 	= {};
let downloadedMenus = {};

// Country Name Map
let iso3166toCountry = {
	"4":["AFG","Afghanistan"],"248":["ALA","Aland Islands"],"8":["ALB","Albania"],"12":["DZA","Algeria"],"16":["ASM","American Samoa"],"20":["AND","Andorra"],"24":["AGO","Angola"],"660":["AIA","Anguilla"],"10":["ATA","Antarctica"],"28":["ATG","Antigua and Barbuda"],"32":["ARG","Argentina"],"51":["ARM","Armenia"],"533":["ABW","Aruba"],"36":["AUS","Australia"],"40":["AUT","Austria"],"31":["AZE","Azerbaijan"],"44":["BHS","Bahamas"],"48":["BHR","Bahrain"],"50":["BGD","Bangladesh"],"52":["BRB","Barbados"],"112":["BLR","Belarus"],"56":["BEL","Belgium"],"84":["BLZ","Belize"],"204":["BEN","Benin"],"60":["BMU","Bermuda"],"64":["BTN","Bhutan"],"68":["BOL","Bolivia"],"535":["BES","Bonaire Sint Eustatius and Saba"],"70":["BIH","Bosnia and Herzegovina"],"72":["BWA","Botswana"],"74":["BVT","Bouvet Island"],"76":["BRA","Brazil"],"86":["IOT","British Indian Ocean Territory"],"92":["VGB","British Virgin Islands"],"96":["BRN","Brunei"],"100":["BGR","Bulgaria"],"854":["BFA","Burkina Faso"],"108":["BDI","Burundi"],"116":["KHM","Cambodia"],"120":["CMR","Cameroon"],"124":["CAN","Canada"],"132":["CPV","Cape Verde"],"136":["CYM","Cayman Islands"],"140":["CAF","Central African Republic"],"148":["TCD","Chad"],"830":["OWID_CIS","Channel Islands"],"152":["CHL","Chile"],"156":["CHN","China"],"162":["CXR","Christmas Island"],"166":["CCK","Cocos Islands"],"170":["COL","Colombia"],"174":["COM","Comoros"],"178":["COG","Congo"],"184":["COK","Cook Islands"],"188":["CRI","Costa Rica"],"384":["CIV","Cote dIvoire"],"191":["HRV","Croatia"],"192":["CUB","Cuba"],"531":["CUW","Curacao"],"196":["CYP","Cyprus"],"203":["CZE","Czech Republic"],"180":["COD","Democratic Republic of Congo"],"208":["DNK","Denmark"],"262":["DJI","Djibouti"],"212":["DMA","Dominica"],"214":["DOM","Dominican Republic"],"218":["ECU","Ecuador"],"818":["EGY","Egypt"],"222":["SLV","El Salvador"],"226":["GNQ","Equatorial Guinea"],"232":["ERI","Eritrea"],"233":["EST","Estonia"],"231":["ETH","Ethiopia"],"234":["FRO","Faeroe Islands"],"238":["FLK","Falkland Islands"],"242":["FJI","Fiji"],"246":["FIN","Finland"],"250":["FRA","France"],"254":["GUF","French Guiana"],"258":["PYF","French Polynesia"],"260":["ATF","French Southern Territories"],"266":["GAB","Gabon"],"270":["GMB","Gambia"],"268":["GEO","Georgia"],"276":["DEU","Germany"],"288":["GHA","Ghana"],"292":["GIB","Gibraltar"],"300":["GRC","Greece"],"304":["GRL","Greenland"],"308":["GRD","Grenada"],"312":["GLP","Guadeloupe"],"316":["GUM","Guam"],"320":["GTM","Guatemala"],"831":["GGY","Guernsey"],"324":["GIN","Guinea"],"624":["GNB","Guinea-Bissau"],"328":["GUY","Guyana"],"332":["HTI","Haiti"],"334":["HMD","Heard Island and McDonald Islands"],"340":["HND","Honduras"],"344":["HKG","Hong Kong"],"348":["HUN","Hungary"],"352":["ISL","Iceland"],"356":["IND","India"],"360":["IDN","Indonesia"],"364":["IRN","Iran"],"368":["IRQ","Iraq"],"372":["IRL","Ireland"],"833":["IMN","Isle of Man"],"376":["ISR","Israel"],"380":["ITA","Italy"],"388":["JAM","Jamaica"],"392":["JPN","Japan"],"832":["JEY","Jersey"],"400":["JOR","Jordan"],"398":["KAZ","Kazakhstan"],"404":["KEN","Kenya"],"296":["KIR","Kiribati"],"414":["KWT","Kuwait"],"417":["KGZ","Kyrgyzstan"],"418":["LAO","Laos"],"428":["LVA","Latvia"],"422":["LBN","Lebanon"],"426":["LSO","Lesotho"],"430":["LBR","Liberia"],"434":["LBY","Libya"],"438":["LIE","Liechtenstein"],"440":["LTU","Lithuania"],"442":["LUX","Luxembourg"],"446":["MAC","Macao"],"807":["MKD","Macedonia"],"450":["MDG","Madagascar"],"454":["MWI","Malawi"],"458":["MYS","Malaysia"],"462":["MDV","Maldives"],"466":["MLI","Mali"],"470":["MLT","Malta"],"584":["MHL","Marshall Islands"],"474":["MTQ","Martinique"],"478":["MRT","Mauritania"],"480":["MUS","Mauritius"],"175":["MYT","Mayotte"],"484":["MEX","Mexico"],"583":["FSM","Micronesia (country)"],"498":["MDA","Moldova"],"492":["MCO","Monaco"],"496":["MNG","Mongolia"],"499":["MNE","Montenegro"],"500":["MSR","Montserrat"],"504":["MAR","Morocco"],"508":["MOZ","Mozambique"],"104":["MMR","Myanmar"],"516":["NAM","Namibia"],"520":["NRU","Nauru"],"524":["NPL","Nepal"],"528":["NLD","Netherlands"],"540":["NCL","New Caledonia"],"554":["NZL","New Zealand"],"558":["NIC","Nicaragua"],"562":["NER","Niger"],"566":["NGA","Nigeria"],"570":["NIU","Niue"],"574":["NFK","Norfolk Island"],"408":["PRK","North Korea"],"580":["MNP","Northern Mariana Islands"],"578":["NOR","Norway"],"512":["OMN","Oman"],"586":["PAK","Pakistan"],"585":["PLW","Palau"],"275":["PSE","Palestine"],"591":["PAN","Panama"],"598":["PNG","Papua New Guinea"],"600":["PRY","Paraguay"],"604":["PER","Peru"],"608":["PHL","Philippines"],"612":["PCN","Pitcairn"],"616":["POL","Poland"],"620":["PRT","Portugal"],"630":["PRI","Puerto Rico"],"634":["QAT","Qatar"],"638":["REU","Reunion"],"642":["ROU","Romania"],"643":["RUS","Russia"],"646":["RWA","Rwanda"],"652":["BLM","Saint Barth?lemy"],"654":["SHN","Saint Helena"],"659":["KNA","Saint Kitts and Nevis"],"662":["LCA","Saint Lucia"],"663":["MAF","Saint Martin (French part)"],"666":["SPM","Saint Pierre and Miquelon"],"670":["VCT","Saint Vincent and the Grenadines"],"882":["WSM","Samoa"],"674":["SMR","San Marino"],"678":["STP","Sao Tome and Principe"],"682":["SAU","Saudi Arabia"],"686":["SEN","Senegal"],"688":["SRB","Serbia"],"690":["SYC","Seychelles"],"694":["SLE","Sierra Leone"],"702":["SGP","Singapore"],"534":["SXM","Sint Maarten (Dutch part)"],"703":["SVK","Slovakia"],"705":["SVN","Slovenia"],"90":["SLB","Solomon Islands"],"706":["SOM","Somalia"],"710":["ZAF","South Africa"],"239":["SGS","South Georgia and the South Sandwich Islands"],"410":["KOR","South Korea"],"728":["SSD","South Sudan"],"724":["ESP","Spain"],"144":["LKA","Sri Lanka"],"729":["SDN","Sudan"],"740":["SUR","Suriname"],"744":["SJM","Svalbard and Jan Mayen"],"748":["SWZ","Swaziland"],"752":["SWE","Sweden"],"756":["CHE","Switzerland"],"760":["SYR","Syria"],"158":["TWN","Taiwan"],"762":["TJK","Tajikistan"],"834":["TZA","Tanzania"],"764":["THA","Thailand"],"626":["TLS","Timor"],"768":["TGO","Togo"],"772":["TKL","Tokelau"],"776":["TON","Tonga"],"780":["TTO","Trinidad and Tobago"],"788":["TUN","Tunisia"],"792":["TUR","Turkey"],"795":["TKM","Turkmenistan"],"796":["TCA","Turks and Caicos Islands"],"798":["TUV","Tuvalu"],"800":["UGA","Uganda"],"804":["UKR","Ukraine"],"784":["ARE","United Arab Emirates"],"826":["GBR","United Kingdom"],"840":["USA","United States"],"581":["UMI","United States Minor Outlying Islands"],"850":["VIR","United States Virgin Islands"],"858":["URY","Uruguay"],"860":["UZB","Uzbekistan"],"548":["VUT","Vanuatu"],"336":["VAT","Vatican"],"862":["VEN","Venezuela"],"704":["VNM","Vietnam"],"876":["WLF","Wallis and Futuna"],"732":["ESH","Western Sahara"],"887":["YEM","Yemen"],"894":["ZMB","Zambia"],"716":["ZWE","Zimbabwe"],"10000":["Africa","Africa"],"10100":["Central Africa","Central Africa"],"10200":["Eastern Africa","Eastern Africa"],"10300":["Northern Africa","Northern Africa"],"10400":["Southern Africa","Southern Africa"],"10500":["Western Africa","Western Africa"],"11000":["Americas","Americas"],"11100":["Caribbean","Caribbean"],"11200":["Central America","Central America"],"11300":["Northern America","Northern America"],"11400":["South America","South America"],"12000":["Asia","Asia"],"12100":["Central Asia","Central Asia"],"12200":["Eastern Asia","Eastern Asia"],"12300":["Southeastern Asia","Southeastern Asia"],"12400":["Southern Asia","Southern Asia"],"12500":["Western Asia","Western Asia"],"13000":["Europe","Europe"],"13100":["Eastern Europe","Eastern Europe"],"13200":["Northern Europe","Northern Europe"],"13300":["Southern Europe","Southern Europe"],"13400":["Western Europe","Western Europe"],"14000":["Oceania","Oceania"],"14100":["Antarctica","Antarctica"],"14200":["Australia & NewZealand","Australia & NewZealand"],"14300":["Micronesia","Micronesia"],"14400":["Melanesia","Melanesia"],"14500":["Polynesia","Polynesia"]

};

let stateCodes = {
	"1":[,"Alabama"],"2":[,"Alaska"],"4":[,"Arizona"],"5":[,"Arkansas"],"6":[,"California"],"8":[,"Colorado"],"9":[,"Connecticut"],"10":[,"Delaware"],"11":[,"District of Columbia"],"12":[,"Florida"],"13":[,"Georgia"],"15":[,"Hawaii"],"16":[,"Idaho"],"17":[,"Illinois"],"18":[,"Indiana"],"19":[,"Iowa"],"20":[,"Kansas"],"21":[,"Kentucky"],"22":[,"Louisiana"],"23":[,"Maine"],"24":[,"Maryland"],"25":[,"Massachusetts"],"26":[,"Michigan"],"27":[,"Minnesota"],"28":[,"Mississippi"],"29":[,"Missouri"],"30":[,"Montana"],"31":[,"Nebraska"],"32":[,"Nevada"],"33":[,"New Hampshire"],"34":[,"New Jersey"],"35":[,"New Mexico"],"36":[,"New York"],"37":[,"North Carolina"],"38":[,"North Dakota"],"39":[,"Ohio"],"40":[,"Oklahoma"],"41":[,"Oregon"],"42":[,"Pennsylvania"],"44":[,"Rhode Island"],"45":[,"South Carolina"],"46":[,"South Dakota"],"47":[,"Tennessee"],"48":[,"Texas"],"49":[,"Utah"],"50":[,"Vermont"],"51":[,"Virginia"],"53":[,"Washington"],"54":[,"West Virginia"],"55":[,"Wisconsin"],"56":[,"Wyoming"]
};

// ChartScript dependent object builders
// Receive fileNames and choices
// Return tailored subsets of fileName content
let buildResponse = {
	billboard: function billboard(requestObj){
		// grab the json content from the downloadedData[fileName] object
		// parse it -- based on the provided choices -- for this chartScript
		// postMessage the outcome back to the main thread
	},
	chartist_js: function chartist_js(requestObj){
		// grab the json content from the downloadedData[fileName] object
		// parse it -- based on the provided choices -- for this chartScript
		// postMessage the outcome back to the main thread
	},
	chartjs: function chartjs(requestObj){
		
		let dataFile 	= makeDataFile(requestObj);
		let meta 		= downloadedData[requestObj.dataFile].meta;
		
		if(!requestObj.options.lockedAxes){
			
			meta = getMeta(dataFile);
		}
		
		
		let datasets 		= [];
		let extraInfo 		= [];
		let whichDataIndex 	= 0;
		let rowLen 			= 0;
		let colorArr 		= ['0','1','2','3','4','5','6','7','8','9','a','b','c','d'];
		let tempColor		= "";
		
		let whichSet;
		if(requestObj.options.whichSet==="state"){
			whichSet = stateCodes;
		}
		else if(requestObj.options.whichSet==="nations"){
			whichSet = iso3166toCountry;
		}
		
		for(let key in dataFile){
			
			datasets.push({});
			extraInfo.push([]);
			
			tempColor = "#" + colorArr[Math.round(Math.random()*13)] + colorArr[Math.round(Math.random()*13)] + colorArr[Math.round(Math.random()*13)];
				
			
			whichDataIndex = datasets.length - 1;
			
			datasets[whichDataIndex].label 		= whichSet[key][1];
			datasets[whichDataIndex].fill 		= false;
			datasets[whichDataIndex].lineTension = 0;
			
			datasets[whichDataIndex].borderColor 		= tempColor; 
			datasets[whichDataIndex].backgroundColor 	= tempColor; 
			
			
			datasets[whichDataIndex].data = [];
			
			let cVal = null;

			rowLen 	= dataFile[key].days_since_last.length;
			
			for(i=0; i<rowLen; i++){
				
				datasets[whichDataIndex].data.push(
					dataFile[key].days_since_last[i]
				);
				
				cVal = !dataFile[key].country_count ?
						"" :
						" (" + dataFile[key].country_count[i] + (dataFile[key].country_count[i] === 1 ? " country)" : " countries)");
						
				extraInfo[whichDataIndex].push(
					dataFile[key].onDate[i] + cVal
				);
			}
		}
		
		
		let xAxisVal 	= 0;
		let labels = [];

		for(let rowI = 0; rowI<meta.maxRows; rowI++){
			
			xAxisVal = Math.max(0.5,rowI);
			
			labels.push(xAxisVal+'%');
			
		}
		
		
		let options = {
			responsive: true,
			title: {
				display: true,
				text: 'Days between percentage-wise steps towards a country\'s worst-case-normalized death rates'
			},
			tooltips: {
				mode: 'index',
				callbacks: {},
				footerFontStyle: 'normal'
			},
			hover: {
				mode: 'index',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						show: true,
						labelString: 'Percentage of Worst Case Deaths Suffered Thus Far',
						display:true,
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						show: true,
						labelString: 'Days between steps',
						display:true
					},
					ticks: {
					  suggestedMax: meta.maxY,
					  suggestedMin: 0
					}
				}]
			}
		};
		
		let data = {
			labels: 	labels,
			datasets: 	datasets
		};
		
		let config = {
			type:		'line',
			data:		data,
			options: 	options
		};
		
		let responseObj = {
			config: 	config,
			extraInfo: 	extraInfo,
			routeTo:	'chartjs'
		};
		
		postMessage(responseObj);
	},
	fusioncharts: function fusioncharts(requestObj){
		
		let dataFile 	= makeDataFile(requestObj);
		let meta 		= downloadedData[requestObj.dataFile].meta;
		
		if(!requestObj.options.lockedAxes){
			
			meta = getMeta(dataFile);
		}

		let dataset 		= [];
		let whichDataIndex 	= 0;
		let rowLen 			= 0;
		let cVal 			= null;
		
		let whichSet;
		if(requestObj.options.whichSet==="state"){
			whichSet = stateCodes;
		}
		else if(requestObj.options.whichSet==="nations"){
			whichSet = iso3166toCountry;
		}
		
		for(let key in dataFile){
			
			dataset.push({});
			
			whichDataIndex = dataset.length - 1;
			
			dataset[whichDataIndex].seriesname 	= whichSet[key][1];
			
			dataset[whichDataIndex].data 		= [];
			
			rowLen 	= dataFile[key].days_since_last.length;
			
			for(i=0; i<rowLen; i++){
				
				cVal = !dataFile[key].country_count ?
							""	:
							" (" + dataFile[key].country_count[i] + (dataFile[key].country_count[i] === 1 ? " country)" : " countries)");
					
				dataset[whichDataIndex].data.push({
					value:dataFile[key].days_since_last[i],
					displayValue:dataFile[key].onDate[i] + cVal,
					showValue:0
				});
			}
		}



		let xAxisVal 	= 0;
		let categories = [{category:[]}];

		for(let rowI = 0; rowI<meta.maxRows; rowI++){
			
			xAxisVal = Math.max(0.5,rowI);
			
			categories[0].category.push({
				label:xAxisVal+'%'
			});
			
		};

		let chart = {
			caption: "Days between percentage-wise steps towards a country\'s worst-case-normalized death rates",
			yaxisname: "Days Between Steps",
			xaxisname: "Percentage of Worst Case Deaths Suffered Thus Far",
			subcaption: "where worst-case-normalization is based on population age-distributions informed by age to IFR (infection fatality rate) relationships",
			showhovereffect: "0",
			// showToolTip: true,
			// seriesNameInToolTip: true,
			// numbersuffix: "%",
			drawcrossline: "1",
			plottooltext: "$label <b>$seriesName</b> $dataValue days; on $displayValue",
			yAxisMaxValue: meta.maxY//,
			//theme: "fusion"
		};


		let outputObject = {
			chart:chart,
			categories:categories,
			dataset:dataset			
		};
		
		let responseObj = {
			'routeTo':requestObj.routeTo,
			'dataTable':outputObject
		}



		postMessage(responseObj);
	},
	google: function google(requestObj){
		
		let dataFile 	= makeDataFile(requestObj);
		let meta 		= downloadedData[requestObj.dataFile].meta;
		
		if(!requestObj.options.lockedAxes){
			
			meta = getMeta(dataFile);
		}

		let dataset 		= [];
		let whichDataIndex 	= 0;
		let rowLen 			= 0;
		
		let outputObject = {
			cols:[],
			rows:[]
		};
		// Place column names in outputObject.cols
		// push the default column to outputObject.cols
		outputObject.cols.push(
			{
				"label":"Percentage of Worst Case Deaths Suffered Thus Far",
				"type":"number"
			}
		);

		let whichSet;
		if(requestObj.options.whichSet==="state"){
			whichSet = stateCodes;
		}
		else if(requestObj.options.whichSet==="nations"){
			whichSet = iso3166toCountry;
		}
		for(let key in dataFile){
			
			// push the remaining columns to outputObject.cols
			outputObject.cols.push(
				{
					"label":whichSet[key][1],
					"type":"number"
				}
			);
		}

		// fill the rows
		let xAxisVal 	= 0;
		let cellObj 	= {};
		let vVal		= null;
		let fVal		= null;
		let dataFileCell = {};
		let cVal 		= null;

		for(let rowI = 0; rowI<meta.maxRows; rowI++){
			
			xAxisVal = Math.max(0.5,rowI);
			
			outputObject.rows[rowI] = {
				"c":[
					{
						"v":xAxisVal,
						"f":Math.max(0.5,rowI) + "%"
					}
				]
			};
			
			for(key in dataFile){
				
				cellObj = dataFile[key];

				vVal = null;
				fVal = null;

				if(cellObj.days_since_last[rowI]){
					
					vVal = cellObj.days_since_last[rowI];
					
					cVal = !cellObj.country_count ? 
												"" : 
												" (" + cellObj.country_count[rowI] + (cellObj.country_count[rowI] === 1 ? " country)" : " countries)");
												
					fVal = !cellObj.days_since_last[rowI] ? 
												null : 
												cellObj.days_since_last[rowI] + " days; on " + cellObj.onDate[rowI] + cVal;
				}
				
				outputObject.rows[rowI].c.push(
					{
						"v":vVal,
						"f":fVal
					}
				);
			}
		}
		
		
		
		let options = {
			chart: {
				title: 'Days between percentage-wise steps towards a country\'s worst-case-normalized death rates',
				subtitle: 'where worst-case-normalization is based on population age-distributions informed by age to IFR (infection fatality rate) relationships'
			},
			hAxis:{
				textStyle:{fontSize:24},
				viewWindow:{max:meta.maxX, min:0}
			},
			vAxis:{
				viewWindow:{max:meta.maxY, min:0},
				title:"Days between steps",
				textStyle:{fontSize:24}
			},
			width: '100%',
			height: '100%',
			focusTarget:'category'
		};
		
		let responseObj = {
			'routeTo':requestObj.routeTo,
			'options':options,
			'dataTable':outputObject
		}
		
		
		postMessage(responseObj);
	},
	pluscharts: function pluscharts(requestObj){
		// grab the json content from the downloadedData[fileName] object
		// parse it -- based on the provided choices -- for this chartScript
		// postMessage the outcome back to the main thread
	},
	rgraph: function rgraph(requestObj){
		// grab the json content from the downloadedData[fileName] object
		// parse it -- based on the provided choices -- for this chartScript
		// postMessage the outcome back to the main thread
	},
	loadMenus: function loadMenus(requestObj){
		// grab the json content from the downloadedData[fileName] object
		// parse it -- based on the provided choices -- for this chartScript
		// postMessage the outcome back to the main thread
	}
	
};


// BuildResponse support functions
function getMeta(rawObj){
	
	let rowLen = 0;
	let maxRows = 0;
	let valX = 0;
	let maxX = 0;
	let valY = 0;
	let maxY = 0;

	for(let key in rawObj){
		
		// Determine max row counts
		// and max axis values
		rowLen 	= rawObj[key].days_since_last.length;
		
		maxRows = Math.max(maxRows, rowLen);	
		
		for(i=0; i<rowLen; i++){
		
			valX = rawObj[key].percentOfWorstCaseMet[i];
			
			maxX = Math.max(maxX, valX);
			
			valY = rawObj[key].days_since_last[i];
			
			maxY = Math.max(maxY, valY);
		}
	}
	
	return {
		outcomes:{},
		geoPolitical:{},
		maxY:maxY,
		maxX:maxX,
		maxRows:maxRows
	}
}

function makeDataFile(requestObj){
	
	let dataFile = {};
	
	if(requestObj.options.choiceArr){
		
		for(let i=0, imax=requestObj.options.choiceArr.length; i<imax; i++){
			
			if(downloadedData[requestObj.dataFile].raw[requestObj.options.choiceArr[i]]){
				dataFile[requestObj.options.choiceArr[i]] = downloadedData[requestObj.dataFile].raw[requestObj.options.choiceArr[i]];
			}
		}
		
		// also handle averages, or tops and bottoms
	}
	else{
		
		dataFile 	= downloadedData[requestObj.dataFile].raw;
	}
	
	return dataFile;
}


// file request handler
function getFile(requestObj){
	
	let fileName = requestObj.dataFile + ".txt";
	
	let callback = requestObj.routeTo;
	
	
	let xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open('GET', fileName, true);
	
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			
			// Store a local copy of the json file response
			downloadedData[requestObj.dataFile] = {'raw':JSON.parse(xmlhttp.responseText),'meta':{}};
			// Update its meta values
			downloadedData[requestObj.dataFile].meta = getMeta(downloadedData[requestObj.dataFile].raw);
			
			// Call the callback function on the stored json
			buildResponse[callback](requestObj);
		}
		else if(xmlhttp.readyState == 4){
			
			let capturedMessage = "while attempting to submit, the readyState equaled 4 and the status equaled: " + xmlhttp.status;
			
			console.log(capturedMessage);
			/*
			postMessage(
				{
					'requestObj'		:requestObj,
					'capturedMessage'	:capturedMessage,
					'routeTo'			:'errorHandler'
				}
			);
			*/
		}
	}
	
	xmlhttp.send();
	
	
	
	
	let menuFile = requestObj.dataFile + "_menu.txt";
	let xmlhttp2 = new XMLHttpRequest();
	xmlhttp2.open('GET', menuFile, true);
	xmlhttp2.onreadystatechange = function(){
		if (xmlhttp2.readyState == 4 && xmlhttp.status == 200){
			
			// Store a local copy of the json file response
			downloadedMenus[requestObj.dataFile + "_menu.txt"] = xmlhttp2.responseText;
			
			postMessage({
				routeTo:"placeChartMenuHTML",
				chartMenuHTML:downloadedMenus[requestObj.dataFile + "_menu.txt"]
			});
			
		}
		else if(xmlhttp2.readyState == 4){
			
			let capturedMessage = "while attempting to submit, the readyState equaled 4 and the status equaled: " + xmlhttp2.status;
			
			console.log(capturedMessage);
			/*
			postMessage(
				{
					'requestObj'		:requestObj,
					'capturedMessage'	:capturedMessage,
					'routeTo'			:'errorHandler'
				}
			);
			*/
		}
	}
	xmlhttp2.send();
}


// React to incoming requests from the main thread
onmessage = function(e) {
	
	
	let requestObj 	= e.data;
	
	let dataFile 	= requestObj.dataFile;
	
	let routeTo 	= requestObj.routeTo;
	
	
	if(!downloadedData[dataFile]){
		
		getFile(requestObj);
	}
	else{
		
		buildResponse[routeTo](requestObj);
	}
	
	// e.data is the following object:
	// {
	// 	'dataFile'	:'dhub_nations_wc', // // nyt_states_wc this is the dataFile we should load (just once per file)
	//	'options'	:{'choiceArr':["10000","11000","12000","13000"],'whichSet':"nations",'lockedAxes':true}, //  // default is the list of "continents" that have hit 0.5% in at least one country
	// 	'routeTo'	:'google' // this is the main thread function that will handle our postMessage
	// }
}