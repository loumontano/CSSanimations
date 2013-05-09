function addAnimLogo(container) {
	var camera, scene, renderer,
		box, plane, light,
		rotRate = 0.01	;

    camera = new THREE.PerspectiveCamera(75, container.width() / container.height(), 0.5, 2000 );
    camera.position.set(6, 70, 35);
    camera.rotation.x = -32 * (Math.PI / 180);
    camera.rotation.y = 10 * (Math.PI / 180);

    scene = new THREE.Scene();

    box = new THREE.Mesh(
    	new THREE.CubeGeometry(30, 30, 30),
    	new THREE.MeshPhongMaterial({color: 0xff0000})
    );
    box.castShadow = true;
    box.position.y = 50;
	scene.add(box);

    plane = new THREE.Mesh(
    	new THREE.PlaneGeometry(15000, 15000, 1, 1),
    	new THREE.MeshBasicMaterial({color: 0xffffff})
    );
    plane.rotation.x = -90 * (Math.PI / 180);
    plane.receiveShadow = true;
    scene.add(plane);

    light = new THREE.SpotLight(0xffffff, 1, 0, true);
    light.position.set(180, 250, 75);
    light.castShadow = true;
    scene.add(light);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMapEnabled = true;
	renderer.setSize(container.width(), container.height());

	container.append(renderer.domElement);

	$(window).bind('resize', function() {
		camera.aspect();
	});
	function animate() {
		requestAnimationFrame(animate);
		render();
	};

	function render() {
		box.rotation.y += rotRate;
		renderer.render(scene, camera);
	};

	animate();
};

$(function() {
	$.deck('.slide');

	$('.footer .logo').each(function() {
		addAnimLogo($(this));
	});

	if (!document.webkitCancelFullScreen && !document.mozCancelFullScreen && !document.exitFullscreen) {
		$('.fs').hide();
	} else {
		var body = document.body;

		$('.fullscreen-trigger').bind('click', function(e) {
			e.preventDefault();
			e.stopPropagation();

			// start of Gronching the Code, lazy ass coding FTW WTF
			body.webkitRequestFullScreen && body.webkitRequestFullScreen();
			body.mozRequestFullScreen && body.mozRequestFullScreen();
			body.requestFullscreen && body.requestFullscreen();
		});
		$('.exit-fullscreen').bind('click', function(e) {
			e.preventDefault();
			e.stopPropagation();

			// start of Gronching the Code, lazy ass coding FTW WTF
			document.webkitCancelFullScreen();
			document.mozCancelFullScreen();
			document.exitFullscreen();
		});
	}

	$('#demo2').bind('click', function(ev) {
		ev.preventDefault();
		window.location = $(this).attr('src');
	});
});