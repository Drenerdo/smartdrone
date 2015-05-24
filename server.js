var arDrone = require('ar-drone');
var client = arDrone.createClient();
var Myo = require('myo');
var myMyo = Myo.create();
var isFlying = false;


myMyo.on('fingers_spread', function(edge){
	myMyo.timer(edge, 500, function(){
		if(isFlying == false){
			console.log('Spreading fingers detected');
			client.takeoff();
			isFlying = true;
		}
	})
});

myMyo.on('fist', function(edge){
	myMyo.timer(edge, 5000, function(){
		console.log('fist detected');
		client.land();
		isFlying = false;
	})
});

myMyo.on('wave_out', function(edge) {
	myMyo.timer(edge, 500, function() {
		console.log('wave out detechted');
		client.up(.3)
		client.after(4000, function() {
			client.stop();
		})
	})
});

myMyo.on('wave_in', function(edge){
	myMyo.timer(edge, 500, function(){
		console.log('wave in detected');
		client.down(.3);
		client.after(4000, function(){
			client.stop();
		})
	})
});

// var Cylon = require('cylon');
// var Myo = require('myo');

// Cylon.robot({
// 	connections: {
// 		leapmotion: { adaptor: 'leapmotion'},
// 		ardrone: { adaptor: 'ardrone', port: '192.168.1.1'},
// 		// galileo: { adapter: 'intel-iot' }
// 	},
	
// 	devices: {
// 		leapmotion: { driver: 'leapmotion', connection: 'leapmotion'}, 
// 		drone: { driver: 'ardrone', connection: 'ardrone'},
// 		// led: { driver: 'led', pin: 13 }
// 	},
	
	
// 	work: function(my) {
// 		my.leapmotion.on('frame', function(frame){
// 			if(frame.hands.length > 0){
// 				my.drone.takeoff();
// 			} else {
// 				my.drone.land();
// 			}
			
// 			if(frame.valid && frame.gestures.length > 0) {
// 				frame.gestures.forEach(function(g){
// 					if(g.type === 'swipe') {
// 						var currentPosition = g.position;
// 						var startPosition = g.startPosition;
						
// 						var xDirection = currentPosition[0] - startPosition[0];
// 						var yDirection = currentPosition[1] - startPosition[1];
// 						var zDirection = currentPosition[2] - startPosition[2];
						
// 						var xAxis = Math.abs(xDirection);
// 						var yAxis = Math.abs(yDirection);
// 						var zAxis = Math.abs(zDirection);
						
// 						var superiorPosition = Math.max(xAxis, yAxis, zAxis);
						
// 						if(superiorPosition === xAxis) {
// 							if(xDirection < 0) {
// 								console.log('LEFT');
// 								my.drone.left();
// 							} else {
// 								my.drone.right();
// 								console.log('RIGHT');
// 							}
// 						}
						
// 						if(superiorPosition === zAxis) {
// 							if(zDirection > 0) {
// 								console.log('GOING BACKWARDS');
// 								my.drone.back();
// 							} else {
// 								console.log('GOING FORWARD');
// 								my.drone.forward();
// 							}
// 						}
						
// 						if(superiorPosition === yAxis) {
// 							if(yDirection > 0) {
// 								console.log('UP');
// 								my.drone.up(1);
// 							} else {
// 								console.log('down');
// 								my.drone.down(1);
// 							}
// 						}
// 					} else if(g.type === 'keyTap') {
// 						my.drone.backFlip();
// 						after((5).seconds(), function(){
// 							my.drone.land();
// 						})
// 					}
// 				})
// 			}
// 		})
// 	}
// }).start();