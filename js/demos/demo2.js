// This code is provided "as is" under the DBTB (Don't Break The Balls) license
// This was coded in a shed above an indian graveyard, if you steal it you will die.
// optimization needed, namespacing needed, better doc needed, sound needed

// global variables, oh yeah, gronching the code FTW. As’ sale Nike
var camera, scene, renderer,
	box, plane, light,
	system, ground,
	socket,
	HEIGHT = window.innerHeight, WIDTH = window.innerWidth,
	MAX_BULLETS = 6,
	control, phControl,
	bullets = [];

$(function() {
	system = jigLib.PhysicsSystem.getInstance();
	system.setGravity([0,-40,0,0]);
	system.setSolverType('ACCUMULATED');	//FAST, NORMAL, ACCUMULATED

	ground = new jigLib.JPlane(null, [0, 1, 0, 0]);
	ground.set_friction(1);
	ground.set_restitution(1);
	system.addBody(ground);
	ground.moveTo([0,0,0,0]);

	scene = new THREE.Scene();

	control = new THREE.Mesh(
		new THREE.CubeGeometry(280, 5, 170),
		new THREE.MeshPhongMaterial({color: 0xff0000})
	);
	control.matrixAutoUpdate = false;
	scene.add(control);

	phControl = new jigLib.JBox(null, 280, 180, 5);
	phControl.set_mass(2000);
	phControl.moveTo([0, 500, 0, 0]);
	phControl.set_friction(1);
	phControl.set_restitution(0);
	// set movable to false to prevent gravity acceleration or any other force applied
	phControl.set_movable(false);
	system.addBody(phControl);

	camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.5, 2000 );
	camera.position.set(0, 200, 560);
	scene.add(camera);

	plane = new THREE.Mesh(
		new THREE.PlaneGeometry(15000, 15000, 1, 1),
		new THREE.MeshBasicMaterial({color: 0xcccccc})
	);
	plane.rotation.x = -90 * (Math.PI / 180);
	plane.receiveShadow = true;
	scene.add(plane);

	light = new THREE.SpotLight(0xffffff, 1, 0, true);
	light.position.set(350, 550, 700);
	light.castShadow = true;
	scene.add(light);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.shadowMapEnabled = true;
	renderer.setSize(WIDTH, HEIGHT);

	// in monguito.js
	createMonguito(phControl);

	$('body').append(renderer.domElement);

	function animate() {
		requestAnimationFrame(animate);
		render();
	};

	function render() {
		var now = new Date().getTime(),
			phPos, phDir, phBox, m4, r4;

		system.integrate((now - last) / 400);
		last = now;

		// bullets
		// same as demo1 code
		// should this be optimized? OH YEAH, OH YEAH! But I'm lazy
		if (bullets.length) {
			for (var i=0, len=bullets.length; i<len; ++i) {
				phPos = bullets[i].p.get_currentState().position;
				phDir = bullets[i].p.get_currentState().get_orientation().glmatrix;
				m4 = new THREE.Matrix4();
				r4 = new THREE.Matrix4(phDir[0], phDir[1], phDir[2], phDir[3], phDir[4], phDir[5], phDir[6], phDir[7], phDir[8], phDir[9], phDir[10], phDir[11], phDir[12], phDir[13], phDir[14], phDir[15]);
		    	m4.setTranslation(phPos[0], phPos[1], phPos[2], 0);
		    	m4.multiplySelf(r4);
		    	bullets[i].b.matrix = m4;
		    	bullets[i].b.matrixWorldNeedsUpdate = true;
			}
		}

		// render monguito, same as before
		for (var limb in monguito) {
			phPos = monguito[limb].p.get_currentState().position;
			phDir = monguito[limb].p.get_currentState().get_orientation().glmatrix;
			m4 = new THREE.Matrix4();
			r4 = new THREE.Matrix4(phDir[0], phDir[1], phDir[2], phDir[3], phDir[4], phDir[5], phDir[6], phDir[7], phDir[8], phDir[9], phDir[10], phDir[11], phDir[12], phDir[13], phDir[14], phDir[15]);
	    	m4.setTranslation(phPos[0], phPos[1], phPos[2], 0);
	    	m4.multiplySelf(r4);
	    	monguito[limb].b.matrix = m4;
	    	monguito[limb].b.matrixWorldNeedsUpdate = true;
		}

    	phPos = phControl.get_currentState().position;
		phDir = phControl.get_currentState().get_orientation().glmatrix;
		m4 = new THREE.Matrix4();
		r4 = new THREE.Matrix4(phDir[0], phDir[1], phDir[2], phDir[3], phDir[4], phDir[5], phDir[6], phDir[7], phDir[8], phDir[9], phDir[10], phDir[11], phDir[12], phDir[13], phDir[14], phDir[15]);
    	m4.setTranslation(phPos[0], phPos[1], phPos[2], 0);
    	m4.multiplySelf(r4);
    	control.matrix = m4;
    	control.matrixWorldNeedsUpdate = true;

		renderer.render(scene, camera);
	};

	var last = new Date().getTime();
	animate();

	initComm();
});

function initComm() {
	var loca = window.location,
	socket = io.connect(loca.protocol + '//' + loca.host);

	socket.on('move', function(data) {
		// ROLL - X (Z)
		// PITCH - Y (X)
		// YAW - Z (Y)

		phControl.setRotation([0,0,0]);
		phControl.setRotation([data.b, -data.a, -data.g]);
	});

	socket.on('quilombo', function() {
		startQuilombo();
	});
};

function startQuilombo() {
	var cameraOut = setInterval(function() {
		if (camera.position.z >= 1000) {
			clearInterval(cameraOut);
			startShooting();
		} else {
			camera.position.z += 2;
		}
	}, 25);
};

// start shooting stuff to monguito, this could be replaced with some function to check for other's input
function startShooting() {
	var bullet, phBullet, xDiff = -1,
		excessBullet;

	setInterval(function() {
		xDiff = xDiff * -1;
		phBullet = new jigLib.JSphere(null, 10);
		phBullet.set_mass(6000);
		phBullet.moveTo([0, 100, 1000, 0]);
		phBullet.set_friction(1);
		phBullet.set_restitution(0);
		phBullet.setVelocity([Math.floor(Math.random()*60) * xDiff, 90 + (Math.floor(Math.random()*40) * xDiff), -1000 - (Math.floor(Math.random()*200)), 0]);
		bullet = new THREE.Mesh(
			new THREE.SphereGeometry(10, 36),
			new THREE.MeshLambertMaterial({color: 0x666666})
		);
		bullet.matrixAutoUpdate = false;
		bullet.castShadow = true;

		bullets.push({
			b: bullet,
			p: phBullet
		});
		system.addBody(phBullet);
		scene.add(bullet);

		if (bullets.length > MAX_BULLETS) {
			excessBullet = bullets.shift();
			system.removeBody(excessBullet.p);
			scene.remove(excessBullet.b);
		}
	}, 750);
};