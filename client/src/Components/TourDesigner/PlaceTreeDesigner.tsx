import React from "react";
import * as THREE from "three";

export interface PlaceTreeDesigner {
    readonly placeUrl: string;
}

// https://github.com/mrdoob/three.js/blob/master/examples/webgl_panorama_equirectangular.html
export const PlaceTreeDesigner = (props: PlaceTreeDesigner) => {
    const { useRef, useEffect } = React
    const mount = useRef<HTMLDivElement>(null);

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    var isUserInteracting = false,
        onMouseDownMouseX = 0, onMouseDownMouseY = 0,
        lon = 0, onMouseDownLon = 0,
        lat = 0, onMouseDownLat = 0,
        phi = 0, theta = 0;


    function onPointerStart(event) {
        isUserInteracting = true;
        var clientX = event.clientX || event.touches[0].clientX;
        var clientY = event.clientY || event.touches[0].clientY;
        onMouseDownMouseX = clientX;
        onMouseDownMouseY = clientY;
        onMouseDownLon = lon;
        onMouseDownLat = lat;
    }

    function onPointerMove(event) {
        if (isUserInteracting === true) {
            var clientX = event.clientX || event.touches[0].clientX;
            var clientY = event.clientY || event.touches[0].clientY;
            lon = (onMouseDownMouseX - clientX) * 0.1 + onMouseDownLon;
            lat = (clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
        }
    }

    function getContainerSize() {
        return {
            width: mount.current.clientWidth,
            height: mount.current.clientHeight,
        };
    }

    function onPointerUp() {
        isUserInteracting = false;
    }

    function onMouseWheel(event) {
        var fov = camera.fov + event.deltaY * 0.05;
        camera.fov = THREE.Math.clamp(fov, 10, 75);
        camera.updateProjectionMatrix();
    }

    // function onContainerResize() {
    //     const size = getContainerSize();

    //     camera.aspect = size.width / size.height;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(size.width, size.height);
    // }

    useEffect(() => {
        const container = mount.current;

        function init() {
            const size = getContainerSize();
            camera = new THREE.PerspectiveCamera(75, size.width / size.height, 1, 1100);
            camera.lookAt(new THREE.Vector3(0, 0, 0))
            scene = new THREE.Scene();
            const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
            // invert the geometry on the x-axis so that all of the faces point inward
            geometry.scale(- 1, 1, 1);
            const texture = new THREE.TextureLoader().load(props.placeUrl);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(size.width, size.height);
            container.appendChild(renderer.domElement);

            // document.addEventListener('dragover', function (event) {
            //     event.preventDefault();
            //     event.dataTransfer.dropEffect = 'copy';
            // }, false);

            // const ro = new (window as any).ResizeObserver(() => {
            //     onContainerResize();
            // });
            // ro.observe(document);

            // window.addEventListener('resize', () => onContainerResize());
        }

        function animate() {
            requestAnimationFrame(animate);
            update();
        }
        function update() {
            if (isUserInteracting === false) {
                lon += 0.1;
            }
            lat = Math.max(- 85, Math.min(85, lat));
            phi = THREE.Math.degToRad(90 - lat);
            theta = THREE.Math.degToRad(lon);

            const newPosition = new THREE.Vector3(
                500 * Math.sin(phi) * Math.cos(theta),
                500 * Math.cos(phi),
                500 * Math.sin(phi) * Math.sin(theta),
            );

            camera.lookAt(newPosition);
            /*
            // distortion
            camera.position.copy( camera.target ).negate();
            */
            renderer.render(scene, camera);
        }

        init();
        animate();
    }, []);

    useEffect(() => {
        // event.preventDefault();
        //     var reader = new FileReader();
        //     reader.addEventListener('load', function (event) {
        //         material.map.image.src = event.target.result;
        //         material.map.needsUpdate = true;
        //     }, false);
        //     reader.readAsDataURL(event.dataTransfer.files[0]);
        //     // document.body.style.opacity = 1;
    }, [props.placeUrl]);

    return <div style={{
        height: 300,
        width: '100%',
    }} ref={mount}
        onClick={() => { }}
        onMouseDown={onPointerStart}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onWheel={onMouseWheel}
        onTouchStart={onPointerStart}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
    />
}
