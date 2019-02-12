#include "pxt.h"

using namespace pxt;

/**
 * Support for additional wifi services.
 */
//%weight=96 icon="\uf1eb" color=#1174EE 
namespace wifi {


    void init(Pin tx  , Pin rx, int rate) {
    }


    void attach(String ssid, String password) {

    }

 
    bool isAttached(String ssid) {
        return false;
    }

    void detach(){
    }

    void send(String type, String address, int port, String message) {

    }

    bool sendOk() {
        return true;
    }

}