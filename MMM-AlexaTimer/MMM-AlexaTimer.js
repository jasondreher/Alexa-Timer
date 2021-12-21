Module.register("MMM-AlexaTimer",{
	// Default module config.
	defaults: {
		//event: "New Millenium:",
		//date: "3000-01-01",
		showHours: true,
		showMinutes: true,
		showSeconds: true,
		customInterval: 1000,
		daysLabel: 'd',
		hoursLabel: 'h',
		minutesLabel: 'm',
		secondsLabel: 's',	
        timercount: '',		
	},

	// Set translations
	getTranslations: function() {
		return {
				en: "translations/en.json",
				nl: "translations/nl.json",
				sv: "translations/sv.json"
		}
	},

	// set update interval
	start: function() {
		var self = this;
		this.event = "NEWTimer";
		//this.date: "3/4/2019 11:15:33";
		setInterval(function() {
			self.updateDom(); // no speed defined, so it updates instantly.
		}, this.config.customInterval); 
	},

	// Update function
	getDom: function() {
		var wrapper = document.createElement("div");

		var timeWrapper = document.createElement("div");
		var textWrapper = document.createElement("div");
		//Color: #00FFAA;

		
		//timeWrapper.className = "time bright xlarge light";
		textWrapper.innerHTML=this.config.event;
        
		var today = new Date(Date.now());
		var target = new Date(this.config.date);
		var timeDiff = target - today;

		// Set days, hours, minutes and seconds
		var diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		var diffHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        	var diffMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
		var diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
		
		// Build the output

		var hrs = '';
		var mins = '';
		var secs = '';
		var days = '';
		//Countdown
		if(diffHours>0) hrs = diffHours + ':';

		mins = diffMinutes + ':';
		if(diffMinutes<10) mins = '0' + diffMinutes + ':';

		secs = diffSeconds;
		if(diffSeconds<10) secs = '0' + diffSeconds;

		//Countup
		if(diffMinutes<0) mins = '0' + Math.floor(Math.floor(diffMinutes * -1) - 1) + ':';


		if(diffSeconds<0) secs = '0' + Math.floor(diffSeconds * -1);
		if(diffSeconds<-9) secs = Math.floor(diffSeconds * -1);
		

		//if(this.config.showHours == true) hrs = diffHours + this.config.hoursLabel;
		//if(this.config.showMinutes == true) mins = diffMinutes + this.config.minutesLabel;
		//if(this.config.showSeconds == true) secs = diffSeconds + this.config.secondsLabel;

		timeWrapper.innerHTML = hrs + mins + secs;

		if (timeDiff>0) {
			textWrapper.className = "countdowntext";
			timeWrapper.className = "countdowntime";
		} else {
			textWrapper.className = "countuptext"
			timeWrapper.className = "countuptime";
		}
        //textWrapper.innerHTML=this.config.timercount;
		wrapper.appendChild(textWrapper);
		wrapper.appendChild(timeWrapper);
		
		if (this.config.timercount > 1) {
		wrapper.append(this.config.timercount  + "TimersSet");
	    }
		
        //textWrapper.innerHTML=this.config.timercount;
		return wrapper;
	},

	notificationReceived: function(notification, payload, sender) {
			{
						
 
				syslognotification=notification.split(".");
 				if (syslognotification[0] === 'TimeChange') {
				this.config.event = syslognotification[1];
				this.config.date = syslognotification[2] + ' ' + syslognotification[3];
				//this.config.settime = syslognotification[3];
                //if (syslognotification[4] === '1') (
				this.config.timercount = syslognotification[4] ;
				//) 
        			this.updateDom();
    				}
				//this.updateDom(3000);
				


 				
			}

        },

});
