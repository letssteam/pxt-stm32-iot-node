# Servo

Control the angle of a servo using a light sensor.

```blocks
forever(function() {
    let brightness = pins.A1.analogRead();
    let angle = Math.map(brightness, 0, 1023, 0, 180);
    pins.D2.servoWrite(angle)
})
```

```package
stm32-iot-node
```