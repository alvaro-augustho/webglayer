function DataLoader() {
	
	var that = this;

	/**
	 * Load text file
	 */
	 $("#speed_chart").text("Please wait... data are being loaded. This may take a while.");
	
	this.loadPosData = function(file) {

			var pts = [];
			var dayes = [];
			var hours = [];
			var date = [];
			var sev = [];
			var road_surf = [];
		
			var j = 0;		
		/**
		 * load data
		 */
		d3.csv(file, function(error, data) {
		
		var dateminmax ;

			data.forEach(function(val, i) {
							
					pts[j++] = parseFloat(val.x);
					pts[j++] = parseFloat(val.y);
									
					var d =  (new Date(val.timestamp*1000));																				
					//index[i] = rasterer.calc(i);	
					dayes[i] = d.getDay();
					
					hours[i] = d.getHours() + d.getMinutes()/60;		
					date[i] = Math.round(d.getTime()/(1000*60*60));						
					dateminmax = getMinMax(date[i], dateminmax)
					
					sev[i] = val.accident_severity;
					road_surf[i] = val.road_surface_conditions;
				
			});
			
			visualize({pts: pts, dayes: dayes, hours :hours, sev : sev, road_surf: road_surf, date:date, dmm :dateminmax , num : data.length});
			});
	}
	
	
	function getMinMax(val, minmax){
		if (typeof(minmax)=='undefined'){
			minmax = [];
			minmax.min = Number.MAX_VALUE;
			minmax.max = Number.MIN_VALUE;
		}
		if (val < minmax.min) {minmax.min = val};
		if (val > minmax.max) {minmax.max = val};
		return minmax;
		
	}
	
}
