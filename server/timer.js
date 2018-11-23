var exports = module.exports = {};

class Timer {
	constructor(){
		this.started = false;
		this.startTime = undefined;
		this.endTime = undefined;
	}

	start(){
		this.started = true;
		this.startTime = process.hrtime();
	}

	stop(){
		if(this.started) this.endTime = process.hrtime();
		else throw Error("Tried to stop the timer when it wasn't started");
		this.started = false;
	}

	time(){
		if(this.started) throw Error("Cannot get the timer's time when it is running");
		return this.endTime[0] - this.startTime[0] +
			((this.endTime[1] - this.startTime[1]) / Timer.nano);
	}

	toString(){
		return String(this.time()) + " seconds";
	}
}

Timer.nano = 1000000000;

exports.Timer = Timer;
