#include "light_service.h"
#include "Arduino.h"
#include "WiFi.h"
#include "ESPAsyncWebServer.h"

static void led_on_handler(AsyncWebServerRequest *request){
  led_on();

  return request->send(200, "application/json", "OK");
}

static void led_off_handler(AsyncWebServerRequest *request){
  led_off();

  return request->send(200, "application/json", "OK");
}

AsyncWebServer lightServer(8001);

void startLightServer(){

  lightServer.on("/led/on", HTTP_GET, led_on_handler);
  lightServer.on("/led/off", HTTP_GET, led_off_handler);

  lightServer.begin();
}
