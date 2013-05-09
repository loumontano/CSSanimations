function createCube(color, size) {
	var color = color || 0xffffff,
		size = size || 50,
		body, physics;

	body = new THREE.Mesh(
		new THREE.CubeGeometry(size, size, size),
		new THREE.MeshPhongMaterial({color: color})
	);
	body.castShadow = true;
	body.matrixAutoUpdate = false;
	physics = new jigLib.JBox(null, size, size, size);
	physics.set_mass(350);
	physics.set_friction(1);
	physics.set_restitution(0.5);

	return {
		b: body,
		p: physics
	}
};

function createWall(boxes, scene, system) {
	var box,
		colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff],
		colorIndex = -1,
		startingX = -350,
		yPos = 5,
		blockSize = 30,
		numBlocks = 6;

	for (var i=0; i<(numBlocks*numBlocks); i++) {
		colorIndex = colorIndex < colors.length -1 ? colorIndex + 1 : 0;
		yPos += i%numBlocks === 0 ? blockSize : 0;
		boxes[i] = createCube(colors[colorIndex], blockSize);
		boxes[i].b.position.set(startingX + (i%numBlocks * blockSize), yPos, -220);
		boxes[i].p.moveTo([startingX + (i%numBlocks * blockSize), yPos, -220]);
		scene.add(boxes[i].b);
		system.addBody(boxes[i].p)
	}
};

$(function() {
	var camera, scene, renderer,
		box, plane, light, text, textGeo,
		rotRate = 0.01,
		wallBoxes = [],
		system, ground, boxPhysics,
		HEIGHT = 650, WIDTH = 800;

	system = jigLib.PhysicsSystem.getInstance();
	system.setGravity([0,-10,0,0]);
	system.setSolverType('NORMAL'); //FAST, NORMAL, ACCUMULATED

	ground = new jigLib.JPlane(null, [0, 1, 0, 0]);
	ground.set_friction(1);
	ground.set_restitution(1);
	system.addBody(ground);
	ground.moveTo([0,0,0,0]);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.5, 2000);
	camera.position.set(6, 180, 560);
	scene.add(camera);

	box = new THREE.Mesh(
		new THREE.CubeGeometry(25, 25, 25),
		new THREE.MeshPhongMaterial({color: 0xff0000})
	);
	box.castShadow = true;
	box.position.x = 125;
	box.position.y = 25;
	box.position.z = 315;

	// setting matrixAutoUpdate to false so I can change the rotation matrix manually
	box.matrixAutoUpdate = false;
	scene.add(box);

	boxPhysics = new jigLib.JBox(null, 25, 25, 25);
	// jigLibJS camelCase / underscore hell
	boxPhysics.set_mass(1500);
	boxPhysics.moveTo([125, 25, 315, 0]);
	boxPhysics.set_friction(1);
	// restitution === "bounce" factor
	boxPhysics.set_restitution(.1);
	boxPhysics.setInactive();

	// linVelocityDamping & rotVelocityDamping
	// rate for how the body loses speed, value of 1 equals constant speed
	boxPhysics.set_rotVelocityDamping([0.95, 0.95, 0.95, 0]);
	system.addBody(boxPhysics);

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

	textGeo = new THREE.TextGeometry('R/GA', {
		font: 'helvetiker',
		height: 2,
		curveSegments: 2,
		size: 20,
		weight: 'bold'
	});
	textGeo.computeBoundingBox();
	text = new THREE.Mesh(
		textGeo,
		new THREE.MeshBasicMaterial({color: 0x000000})
	);
	scene.add(text);
	text.position.x = -0.5 * ( textGeo.boundingBox.x[ 1 ] - textGeo.boundingBox.x[ 0 ] ) + 180;
	text.position.y = -0.5 * (textGeo.boundingBox.y[ 1 ] - textGeo.boundingBox.y[ 0 ] ) + 30;
	text.position.z = 330;

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.shadowMapEnabled = true;
	renderer.setSize(WIDTH, HEIGHT);

	$('body').append(renderer.domElement);

	$('.loadwall').bind('click', function(ev) {
		ev.preventDefault();
		ev.stopPropagation();

		$(this).hide();
		createWall(wallBoxes, scene, system);
		setTimeout(function() {
			launch();
		}, 1500);
	});

	function animate() {
		requestAnimationFrame(animate);
		render();
	};

	function render() {
		var now = new Date().getTime(),
			phPos, phDir, phBox, m4, r4, wallBox;

		system.integrate((now - last) / 500);
		last = now;


		// ugly code to calculate the rotation matrix for each block in the wall and the spinning R/GA block
		for (var i=0, len=wallBoxes.length; i<len; i++) {
			// jigLibJS and Three.js matrixes don't match, so we hinchate the balls and "translate" the jigLib glmatrix into another matrix that ThreeJS can use
			wallBox = wallBoxes[i].b;
			phBox = wallBoxes[i].p;
			phPos = phBox.get_currentState().position;
			phDir = phBox.get_currentState().get_orientation().glmatrix;
			m4 = new THREE.Matrix4();
			// set the rotation matrix, with jigLibJS data
			r4 = new THREE.Matrix4(phDir[0], phDir[1], phDir[2], phDir[3], phDir[4], phDir[5], phDir[6], phDir[7], phDir[8], phDir[9], phDir[10], phDir[11], phDir[12], phDir[13], phDir[14], phDir[15]);
			// translate the rotated matrix to the actual position
	    	m4.setTranslation(phPos[0], phPos[1], phPos[2], 0);
	    	m4.multiplySelf(r4);
	    	// update in three.js and set the flag so that Three updates the view
	    	wallBox.matrix = m4;
	    	wallBox.matrixWorldNeedsUpdate = true;
		}

		phPos = boxPhysics.get_currentState().position;
		phDir = boxPhysics.get_currentState().get_orientation().glmatrix;
		m4 = new THREE.Matrix4();
		r4 = new THREE.Matrix4(phDir[0], phDir[1], phDir[2], phDir[3], phDir[4], phDir[5], phDir[6], phDir[7], phDir[8], phDir[9], phDir[10], phDir[11], phDir[12], phDir[13], phDir[14], phDir[15]);
    	m4.setTranslation(phPos[0], phPos[1], phPos[2], 0);
    	m4.multiplySelf(r4);
    	box.matrix = m4;
    	box.matrixWorldNeedsUpdate = true;

		renderer.render(scene, camera);
	};

	var last = new Date().getTime();
	animate();

	function launch() {
		var rotVel = 4,
			yLinVel = 2;

		var accel = setInterval(function() {
			rotVel = rotVel * 1.25;
			yLinVel = yLinVel * 1.1;
			boxPhysics.setAngVel([0, rotVel, 0]);
			boxPhysics.setVelocity([0, yLinVel, 0, 0]);

			if (rotVel > 500) {
				clearInterval(accel);
				boxPhysics.setVelocity([-180,20,-265,0]);
			}
		}, 100);
	}
});