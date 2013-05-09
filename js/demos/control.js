var SK = {};

SK.init = function() {
	var initLink = document.getElementById('init'),
		quilomboLink = document.getElementById('quilombo'),
		that = this;

	initLink.addEventListener('click', function(ev) {
		ev.preventDefault();

		initLink.style.display = 'none';
		that.initListeners();
	}, false);

	quilomboLink.addEventListener('click', function(ev) {
		ev.preventDefault();

		quilomboLink.style.display = 'none';
		that.socket.emit('quilombo');
	}, false);
};

SK.initComm = function() {
	var loca = window.location;
	this.socket = io.connect(loca.protocol + '//' + loca.host);
};

SK.initListeners = function() {
	var socket = this.socket,
		vrAlpha, vrBeta, vrGamma,	// vrAlpha = sum of acceleration in X degrees/sec
		lvrAlpha, lvrBeta, lvrGamma,
		aX = 0, aY = 0, aZ = 0,
		vX, vY, vZ,
		lvX = 0,
		lvY = 0,
		lvZ = 0,
		last = (new Date()).getTime();

	var alpha, beta, gamma;

//	window.addEventListener('devicemotion', function(ev) {
//		var rotationRate = ev.rotationRate,
//			accel = ev.acceleration;
//
//		vrAlpha += rotationRate.alpha;
//		vrBeta += rotationRate.beta;
//		vrGamma += rotationRate.gamma;
//
//		aX = accel.x;
//		aY = accel.y;
//		aZ = accel.z;
//
////		aX = Math.abs(aX) < 0.5 ? 0 : aX;
////		aY = Math.abs(aY) < 0.7 ? 0 : aY;
////		aZ = Math.abs(aZ) < 0.5 ? 0 : aZ;
////
////		vX += aX;
////		vY += aY;
////		vZ += aZ;
////		socket.emit('move', {
////			vrAlpha: vrAlpha,
////			vrBeta: vrBeta,
////			vrGamma: vrGamma,
////			vX: vX,
////			vY: vY,
////			vZ: vZ
////		});
//
////		aX = accel.x;
////		aY = accel.y;
////		aZ = accel.z;
////		if (Math.abs(aY) > .6)
////		console.log(aY);
//	});

	window.addEventListener('deviceorientation', function(ev) {
		var oGamma = ev.gamma;

		alpha = ev.alpha;
		beta = ev.beta;
		gamma = ev.gamma;
	});

	window.addEventListener('touchmove', function(ev) {
		ev.preventDefault();
	});

	setInterval(function() {
//		var now = (new Date()).getTime(),
//			delta = (now - last) / 1000;
//
//		last = now;
//
//		vrAlpha = Math.abs(vrAlpha) > 2 ? vrAlpha : 0;
//		vrBeta = Math.abs(vrBeta) > 2 ? vrBeta : 0;
//		vrGamma = Math.abs(vrGamma) > 2 ? vrGamma : 0;
//
//		aX = Math.abs(aX) > 0.6 ? aX : 0;
//		aY = Math.abs(aY) > 0.6 ? aY : 0;
//		aZ = Math.abs(aZ) > 0.6 ? aZ : 0;
//
//		vX = 0 + (aX * Math.sqrt(delta));
//		vY = 0 + (aY * Math.sqrt(delta));
//		vZ = 0 + (aZ * Math.sqrt(delta));
////		console.log(aZ);//, delta, Math.sqrt(delta));
////		vX = Math.abs(vX) > 10 ? vX : 0;
////		vY = Math.abs(vY) > 10 ? vY : 0;
////		vZ = Math.abs(vZ) > 10 ? vZ : 0;
////console.log(vX);
////		if ( vrAlpha != lvrAlpha || vrBeta != lvrBeta || vrGamma != lvrGamma ||
//		if ( Math.abs(vX) != lvX || Math.abs(vY) != lvY || Math.abs(vZ) != lvZ ) {
////			console.log(vX);
//			socket.emit('move', {
//
//				vX: vX,
//				vY: vY,
//				vZ: vZ
//			});
//			lvrAlpha = vrAlpha;
//			lvrBeta = vrBeta;
//			lvrGamma = vrGamma;
//			lvX = vX;
//			lvY = vY;
//			lvZ = vZ;
//		}
//
//		vrAlpha = 0;
//		vrBeta = 0;
//		vrGamma = 0;
//		vX = 0;
//		vY = 0;
//		vZ = 0;
		socket.emit('move', {
			a: alpha,
			b: beta,
			g: gamma
		});
	}, 50);
};

window.addEventListener('DOMContentLoaded', function() {
	SK.initComm();
	SK.init();
}, false);