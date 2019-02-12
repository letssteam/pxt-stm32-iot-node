enum MessageType {
    UDP,
    TCP
}

class PacketMqtt {
    /**
     * receives commands.
     */
    public topicMqtt: string;
    
    /**
     * receives the message content.
     */
    public messageContent: string;
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
     * Check if we are connected to the wifi network.
     */
    //% weight=209
    //% blockId=wifi_is_connected block="network connected?"
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

    /**
     * The HTTP get request.url(string):URL:time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //%subcategory=HTTP
    //% weight=79
    //% blockId=wifi_http_get
    //% block="HTTP GET|url %url|timeout(ms) %time"
    //% advanced=false
    export function sendHttpGet(url: string, time: number): void {
    }

    /**
     * The HTTP post request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //%subcategory=HTTP
    //% weight=78
    //% blockId=wifi_http_post
    //% block="HTTP POST|url %url|content %content|timeout(ms) %time"
    export function sendHttpPost(url: string, content: string, time: number): void { 
    }

    /**
     * The HTTP put request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //%subcategory=HTTP
    //% weight=78
    //% blockId=wifi_http_put
    //% block="HTTP PUT|url %url|content %content|timeout(ms) %time"
    export function sendHttpPut(url: string, content: string, time: number): void { 
    }

    /**
     * The HTTP delete request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //%subcategory=HTTP
    //% weight=78
    //% blockId=wifi_http_delete
    //% block="HTTP DELETE|url %url|content %content|timeout(ms) %time"
    export function sendHttpDelete(url: string, content: string, time: number): void { 
    }

    //% subcategory=HTTP
    //% blockId=wifi_http_on_received_response block="on HTTP-Response received" 
    //% blockGap = 16
    //% weight=39	
    export function onReceivedHttpResponse(cb: (code: number, message: string) => void): void {
        
    }


    //%subcategory="IoT Services"
    //% blockId=wifi_set_thingspeak
	//% block="Send ThingSpeak|key %key|field1 %field1|field2 %field2"
	//% weight=70	
	//% blockGap=7	
    export function sendThingspeak(key: string, field1: number, field2: number): void {
    }
    
    //%subcategory="IoT Services"
    //% blockId=wifi_set_ifttt
	//% block="Send IFTTT|key %key|event_name %event|value1 %value1|value2 %value2"
	//% weight=60	
    export function sendIFTTT(key: string, eventname: string, value1: number, value2: number): void {
    }

	//%subcategory=MQTT
	//% blockId=wifi_general_mqtt
	//% block="MQTT connect|server %host|port %port|client id %clientId|username %username|password %pwd"
	//% weight=43
	//% blockGap=16	
    export function connectMQTT(host: string, port: string, clientId: string, username: string, pwd: string): void {
    }
	
	//%subcategory=MQTT
    //%blockId=wifi_mqtt_publish
    //% block="MQTT publish|topic %topic|payload %payload"
	//% weight=42	
	//% blockGap=16	
    export function mqttPublish(topic: string, payload: string): void {
    }	
	
	//%subcategory=MQTT
    //%blockId=wifi_mqtt_subscribe block="MQTT subscribe|topic %topic"
    //% blockGap = 16
	//% weight=41	
    export function mqttSubscribe(topic: string): void {
    }

    //% subcategory=MQTT
    //% blockId=wifi_mqtt_on_received_message block="on MQTT received" 
    //% blockGap = 16
    //% weight=39	
    export function onReceivedMqttMessage(cb: (topic: string, payload: string) => void): void {
        
    }
}