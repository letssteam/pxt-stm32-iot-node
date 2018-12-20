namespace pxsim.bluetooth {
    /**
     *  Starts the Bluetooth temperature service
     */
    //% help=bluetooth/start-temperature-service
    //% blockId=bluetooth_start_temperature_service block="bluetooth temperature service" blockGap=8
    //% parts="bluetooth" weight=86 shim=bluetooth::startTemperatureService
    export function startTemperatureService(): void {

    }

    /**
     * Register code to run when the micro:bit is connected to over Bluetooth
     * @param body Code to run when a Bluetooth connection is established
     */
    //% help=bluetooth/on-bluetooth-connected weight=20
    //% blockId=bluetooth_on_connected block="on bluetooth connected" blockGap=8
    //% parts="bluetooth" shim=bluetooth::onBluetoothConnected
    export function onBluetoothConnected(body: RefAction): void{

    }

    /**
     * Register code to run when a bluetooth connection to the micro:bit is lost
     * @param body Code to run when a Bluetooth connection is lost
     */
    //% help=bluetooth/on-bluetooth-disconnected weight=19
    //% blockId=bluetooth_on_disconnected block="on bluetooth disconnected"
    //% parts="bluetooth" shim=bluetooth::onBluetoothDisconnected
    export function onBluetoothDisconnected(body: RefAction): void{

    }

    /**
     * Sets the bluetooth transmit power between 0 (minimal) and 7 (maximum).
     * @param power power level between 0 (minimal) and 7 (maximum), eg: 7.
     */
    //% parts=bluetooth weight=5 help=bluetooth/set-transmit-power advanced=true
    //% blockId=bluetooth_settransmitpower block="bluetooth set transmit power %power" shim=bluetooth::setTransmitPower
    export function setTransmitPower(power: number): void{

    }
}