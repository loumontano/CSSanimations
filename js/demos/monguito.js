// This code is provided "as is" under the DBTB (Don't Break The Balls) license
// This was coded in a shed above an indian graveyard, if you steal it you will die
// optimization needed, namespacing needed, better doc needed, sound needed
// would be cool to add a bat or sword or a machine gun... or just make it look like Chuck Norris
var monguito = {};

// global functions, sooooorry
function createHead() {
	var phHead = new jigLib.JSphere(null, 20);
	phHead.set_mass(2000);
	phHead.moveTo([0, 217, 0, 0]);
	phHead.set_friction(1);
	phHead.set_restitution(0);
	phHead.set_rotVelocityDamping([0, 0, 0, 0]);

	var bHead = new THREE.Mesh(
		new THREE.SphereGeometry(20, 36),
		new THREE.MeshLambertMaterial({color: 0xff0000})
	);
	bHead.matrixAutoUpdate = false;
	bHead.castShadow = true;
	monguito.head = {
		b: bHead,
		p: phHead
	};
	system.addBody(phHead);
	scene.add(bHead);
};

function createBody() {
	var phBody = new jigLib.JBox(null, 50, 30, 80);
	phBody.set_mass(2000);
	phBody.moveTo([0, 175, 0, 0]);
	phBody.set_friction(1);
	phBody.set_restitution(0);
	phBody.setInactive();
	phBody.set_rotVelocityDamping([0.2, 0.4, 0.4, 0]);

	var bBody = new THREE.Mesh(
		new THREE.CubeGeometry(50, 80, 30),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bBody.matrixAutoUpdate = false;
	bBody.castShadow = true;
	monguito.trunk = {
		b: bBody,
		p: phBody
	};
	system.addBody(phBody);
	scene.add(bBody);
};

function createArms() {
	var phRightJoint = new jigLib.JSphere(null, 6);
	phRightJoint.set_mass(2000);
	phRightJoint.moveTo([-31, 208, 0, 0]);
	phRightJoint.set_friction(0);
	phRightJoint.set_restitution(0);
	phRightJoint.set_rotVelocityDamping([0, 0, 0, 0]);
//	phRightJoint.setInactive();

	var bRightJoint =  new THREE.Mesh(
		new THREE.SphereGeometry(6, 16),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bRightJoint.matrixAutoUpdate = false;
	bRightJoint.castShadow = true;
	monguito.rightJoint = {
		b: bRightJoint,
		p: phRightJoint
	};
	system.addBody(phRightJoint);
	scene.add(bRightJoint);
//	phRightJoint.set_movable(false);

	var phRightArm1 = new jigLib.JBox(null, 12, 12, 34);
	phRightArm1.set_mass(2000);
	phRightArm1.moveTo([-32, 185, 0, 0]);
	phRightArm1.set_friction(0);
	phRightArm1.set_restitution(0);
	phRightArm1.set_rotVelocityDamping([0.4, 0.4, 0.4, 0]);

	var bRightArm1 = new THREE.Mesh(
		new THREE.CubeGeometry(12, 34, 12),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bRightArm1.matrixAutoUpdate = false;
	bRightArm1.castShadow = true;
	monguito.rightArm1 = {
		b: bRightArm1,
		p: phRightArm1
	};
	system.addBody(phRightArm1);
	scene.add(bRightArm1);

	var phRightElbow = new jigLib.JSphere(null, 5);
	phRightElbow.set_mass(2000);
	phRightElbow.moveTo([-30.5, 165, 0, 0]);
	phRightElbow.set_friction(0);
	phRightElbow.set_restitution(0);
	phRightElbow.set_rotVelocityDamping([0, 0, 0, 0]);

	var bRightElbow =  new THREE.Mesh(
		new THREE.SphereGeometry(5, 16),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bRightElbow.matrixAutoUpdate = false;
	bRightElbow.castShadow = true;
	monguito.rightElbow = {
		b: bRightElbow,
		p: phRightElbow
	};
	system.addBody(phRightElbow);
	scene.add(bRightElbow);

	var phRightArm2 = new jigLib.JBox(null, 12, 12, 34);
	phRightArm2.set_mass(2000);
	phRightArm2.moveTo([-32, 145, 0, 0]);
	phRightArm2.set_friction(0);
	phRightArm2.set_restitution(0);
	phRightArm2.set_rotVelocityDamping([0.4, 0.4, 0.4, 0]);

	var bRightArm2 = new THREE.Mesh(
		new THREE.CubeGeometry(12, 34, 12),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bRightArm2.matrixAutoUpdate = false;
	bRightArm2.castShadow = true;
	monguito.rightArm2 = {
		b: bRightArm2,
		p: phRightArm2
	};
	system.addBody(phRightArm2);
	scene.add(bRightArm2);


	// LEFT
	var phLeftJoint = new jigLib.JSphere(null, 6);
	phLeftJoint.set_mass(2000);
	phLeftJoint.moveTo([31, 208, 0, 0]);
	phLeftJoint.set_friction(1);
	phLeftJoint.set_restitution(0);
	phLeftJoint.set_rotVelocityDamping([0, 0, 0, 0]);

	var bLeftJoint =  new THREE.Mesh(
		new THREE.SphereGeometry(6, 16),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bLeftJoint.matrixAutoUpdate = false;
	bLeftJoint.castShadow = true;
	monguito.leftJoint = {
		b: bLeftJoint,
		p: phLeftJoint
	};
	system.addBody(phLeftJoint);
	scene.add(bLeftJoint);

	var phLeftArm1 = new jigLib.JBox(null, 12, 12, 34);
	phLeftArm1.set_mass(2000);
	phLeftArm1.moveTo([32, 185, 0, 0]);
	phLeftArm1.set_friction(1);
	phLeftArm1.set_restitution(0);
	phLeftArm1.set_rotVelocityDamping([0.4, 0.4, 0.4, 0]);

	var bLeftArm1 = new THREE.Mesh(
		new THREE.CubeGeometry(12, 34, 12),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bLeftArm1.matrixAutoUpdate = false;
	bLeftArm1.castShadow = true;
	monguito.leftArm1 = {
		b: bLeftArm1,
		p: phLeftArm1
	};
	system.addBody(phLeftArm1);
	scene.add(bLeftArm1);

	var phLeftElbow = new jigLib.JSphere(null, 5);
	phLeftElbow.set_mass(2000);
	phLeftElbow.moveTo([30.5, 165, 0, 0]);
	phLeftElbow.set_friction(1);
	phLeftElbow.set_restitution(0);
	phLeftElbow.set_rotVelocityDamping([0, 0, 0, 0]);

	var bLeftElbow =  new THREE.Mesh(
		new THREE.SphereGeometry(5, 16),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bLeftElbow.matrixAutoUpdate = false;
	bLeftElbow.castShadow = true;
	monguito.leftElbow = {
		b: bLeftElbow,
		p: phLeftElbow
	};
	system.addBody(phLeftElbow);
	scene.add(bLeftElbow);

	var phLeftArm2 = new jigLib.JBox(null, 12, 12, 34);
	phLeftArm2.set_mass(2000);
	phLeftArm2.moveTo([32, 145, 0, 0]);
	phLeftArm2.set_friction(1);
	phLeftArm2.set_restitution(0);
	phLeftArm2.set_rotVelocityDamping([0.4, 0.4, 0.4, 0]);

	var bLeftArm2 = new THREE.Mesh(
		new THREE.CubeGeometry(12, 34, 12),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bLeftArm2.matrixAutoUpdate = false;
	bLeftArm2.castShadow = true;
	monguito.leftArm2 = {
		b: bLeftArm2,
		p: phLeftArm2
	};
	system.addBody(phLeftArm2);
	scene.add(bLeftArm2);
};

function createLegs() {
	var phRightLeg1 = new jigLib.JBox(null, 20, 20, 40);
	phRightLeg1.set_mass(2000);
	phRightLeg1.moveTo([-12, 110, 0, 0]);
	phRightLeg1.set_friction(0);
	phRightLeg1.set_restitution(0);
	phRightLeg1.set_rotVelocityDamping([0.5, 0.1, 0.2, 0]);

	var bRightLeg1 = new THREE.Mesh(
		new THREE.CubeGeometry(20, 40, 20),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bRightLeg1.matrixAutoUpdate = false;
	bRightLeg1.castShadow = true;
	monguito.rightLeg1 = {
		b: bRightLeg1,
		p: phRightLeg1
	};
	system.addBody(phRightLeg1);
	scene.add(bRightLeg1);

	var phRightKnee = new jigLib.JSphere(null, 8);
	phRightKnee.set_mass(2000);
	phRightKnee.moveTo([-12, 82, 0, 0]);
	phRightKnee.set_friction(0);
	phRightKnee.set_restitution(0);
	phRightKnee.set_rotVelocityDamping([0, 0, 0, 0]);

	var bRightKnee =  new THREE.Mesh(
		new THREE.SphereGeometry(8, 16),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bRightKnee.matrixAutoUpdate = false;
	bRightKnee.castShadow = true;
	monguito.rightKnee = {
		b: bRightKnee,
		p: phRightKnee
	};
	system.addBody(phRightKnee);
	scene.add(bRightKnee);

	var phRightLeg2 = new jigLib.JBox(null, 20, 20, 40);
	phRightLeg2.set_mass(2000);
	phRightLeg2.moveTo([-12, 54, 0, 0]);
	phRightLeg2.set_friction(0);
	phRightLeg2.set_restitution(0);
	phRightLeg2.set_rotVelocityDamping([0.5, 0.1, 0.2, 0]);

	var bRightLeg2 = new THREE.Mesh(
		new THREE.CubeGeometry(20, 40, 20),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bRightLeg2.matrixAutoUpdate = false;
	bRightLeg2.castShadow = true;
	monguito.rightLeg2 = {
		b: bRightLeg2,
		p: phRightLeg2
	};
	system.addBody(phRightLeg2);
	scene.add(bRightLeg2);

	// LEFT
	var phLeftLeg1 = new jigLib.JBox(null, 20, 20, 40);
	phLeftLeg1.set_mass(2000);
	phLeftLeg1.moveTo([12, 110, 0, 0]);
	phLeftLeg1.set_friction(0);
	phLeftLeg1.set_restitution(0);
	phLeftLeg1.set_rotVelocityDamping([0.5, 0.1, 0.2, 0]);

	var bLeftLeg1 = new THREE.Mesh(
		new THREE.CubeGeometry(20, 40, 20),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bLeftLeg1.matrixAutoUpdate = false;
	bLeftLeg1.castShadow = true;
	monguito.leftLeg1 = {
		b: bLeftLeg1,
		p: phLeftLeg1
	};
	system.addBody(phLeftLeg1);
	scene.add(bLeftLeg1);

	var phLeftKnee = new jigLib.JSphere(null, 8);
	phLeftKnee.set_mass(2000);
	phLeftKnee.moveTo([12, 82, 0, 0]);
	phLeftKnee.set_friction(0);
	phLeftKnee.set_restitution(0);
	phLeftKnee.set_rotVelocityDamping([0, 0, 0, 0]);

	var bLeftKnee =  new THREE.Mesh(
		new THREE.SphereGeometry(8, 16),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bLeftKnee.matrixAutoUpdate = false;
	bLeftKnee.castShadow = true;
	monguito.leftKnee = {
		b: bLeftKnee,
		p: phLeftKnee
	};
	system.addBody(phLeftKnee);
	scene.add(bLeftKnee);

	var phLeftLeg2 = new jigLib.JBox(null, 20, 20, 40);
	phLeftLeg2.set_mass(2000);
	phLeftLeg2.moveTo([12, 54, 0, 0]);
	phLeftLeg2.set_friction(0);
	phLeftLeg2.set_restitution(0);
	phLeftLeg2.set_rotVelocityDamping([0.5, 0.1, 0.2, 0]);

	var bLeftLeg2 = new THREE.Mesh(
		new THREE.CubeGeometry(20, 40, 20),
		new THREE.MeshPhongMaterial({color: 0x00ff00})
	);
	bLeftLeg2.matrixAutoUpdate = false;
	bLeftLeg2.castShadow = true;
	monguito.leftLeg2 = {
		b: bLeftLeg2,
		p: phLeftLeg2
	};
	system.addBody(phLeftLeg2);
	scene.add(bLeftLeg2);
};

function createConstraints(control) {
	var minDist = 250;

	var cons = [
	    // attach head to body
	    new jigLib.JConstraintMaxDistance(monguito.head.p, [0, -20, 0, 0], monguito.trunk.p, [0, 40, 0, 0], 1),

	    // right arm
		new jigLib.JConstraintMaxDistance(monguito.trunk.p, [-25,34,0,0], monguito.rightJoint.p, [6,0,0,0], 1),
		new jigLib.JConstraintMaxDistance(monguito.rightJoint.p, [0,0,0,0], monguito.rightArm1.p, [0,17,0,0], 6),
		new jigLib.JConstraintMaxDistance(monguito.rightArm1.p, [0,-17,0,0], monguito.rightElbow.p, [0,0,0,0], 5),
		new jigLib.JConstraintMaxDistance(monguito.rightElbow.p, [0,0,0,0], monguito.rightArm2.p, [0,17,0,0], 5),

		// left arm
		new jigLib.JConstraintMaxDistance(monguito.trunk.p, [25,34,0,0], monguito.leftJoint.p, [-6,0,0,0], 1),
		new jigLib.JConstraintMaxDistance(monguito.leftJoint.p, [0,0,0,0], monguito.leftArm1.p, [0,17,0,0], 6),
		new jigLib.JConstraintMaxDistance(monguito.leftArm1.p, [0,-17,0,0], monguito.leftElbow.p, [0,0,0,0], 5),
		new jigLib.JConstraintMaxDistance(monguito.leftElbow.p, [0,0,0,0], monguito.leftArm2.p, [0,17,0,0], 5),

		// right leg
		new jigLib.JConstraintMaxDistance(monguito.trunk.p, [-12,-40,0,0], monguito.rightLeg1.p, [0,20,0,0], 6),
		new jigLib.JConstraintMaxDistance(monguito.rightLeg1.p, [0,-20,0,0], monguito.rightKnee.p, [0,0,0,0], 8),
		new jigLib.JConstraintMaxDistance(monguito.rightKnee.p, [0,0,0,0], monguito.rightLeg2.p, [0,20,0,0], 8),

		// left leg
		new jigLib.JConstraintMaxDistance(monguito.trunk.p, [12,-40,0,0], monguito.leftLeg1.p, [0,20,0,0], 6),
		new jigLib.JConstraintMaxDistance(monguito.leftLeg1.p, [0,-20,0,0], monguito.leftKnee.p, [0,0,0,0], 8),
		new jigLib.JConstraintMaxDistance(monguito.leftKnee.p, [0,0,0,0], monguito.leftLeg2.p, [0,20,0,0], 8),

		// control pad to head
		new jigLib.JConstraintMaxDistance(control, [0, 0, -40, 0], monguito.head.p, [0, 20, 0, 0], minDist),
		// control pad to ass
		new jigLib.JConstraintMaxDistance(control, [0, 0, -110, 0], monguito.trunk.p, [0, -40, -15, 0], minDist + 130),
		// control pad to arms
		new jigLib.JConstraintMaxDistance(control, [-190, 0, 50, 0], monguito.rightArm2.p, [0,-7,0,0], minDist + 55),
		new jigLib.JConstraintMaxDistance(control, [190, 0, 50, 0], monguito.leftArm2.p, [0,-7,0,0], minDist + 55),

		// control to legs
		new jigLib.JConstraintMaxDistance(control, [-60, 0, 150, 0], monguito.rightKnee.p, [0,-10,0,0], minDist + 190),
		new jigLib.JConstraintMaxDistance(control, [60, 0, 150, 0], monguito.leftKnee.p, [0,-10,0,0], minDist + 190)
	];
	for (var i=0, len=cons.length; i<len; i++) {
		system.addConstraint(cons[i]);
	}
};

function createMonguito(control) {
	createHead();
	createBody();
	createArms();
	createLegs();
	createConstraints(control);
};