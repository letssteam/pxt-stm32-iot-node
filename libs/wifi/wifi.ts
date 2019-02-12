enum MessageType {
    UDP,
    TCP
}

/**
 * Support for additional wifi services.
 */
//%weight=96 icon="\uf1eb" color=#1174EE 
namespace wifi {
    let ERROR = false;

    /**
     * Connect to the wifi network.
     */
    //% weight=209
    //% blockId=wifi_attach block="connect to the wifi network|SSID %ssid|password %password"
    //% blockExternalInputs=1
    export function attach(ssid: string, password: string): void {

    }

    /**
     * Check if we are attached to the wifi network.
     */
    //% weight=209
    //% blockId=wifi_isattached block="network attached?"
    export function isAttached(ssid: string = null): boolean {
        return false;
    }

    /**
     * Disconnect from the wifi network.
     */
    //% weight=209
    //% blockId=wifi_detach block="disconnect from wifi network"
    export function detach(): void {
    }

    /**
     * Send a message via wifi.
     * @param {string} type send as TCP or UDP, eg: MessageType.TCP
     * @param {string} address the server address
     * @param {number} port the server port to send to, eg: 8080
     * @param {string} message the actual data to send
     */
    //% weight=70
    //% blockId=wifi_send block="send raw message|type %type|server %address|port %port|message %message"
    //% blockExternalInputs=1
    export function send(type: MessageType, address: string, port: number, message: string): void {
    }

    /**
     * Check if the last send operation was successful.
     * Also reset the status.
     */
    //% weight=70
    //% blockId=wifi_sendOk block="send success?"
    export function sendOk(): boolean {
        return false;
    }
}