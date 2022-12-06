#include "car_service.h"
#include "Arduino.h"
#include "WiFi.h"
#include "ESPAsyncWebServer.h"

static void forward_handler(AsyncWebServerRequest *request){
  forward();

  return request->send(200, "application/json", "OK");
}

static void backward_handler(AsyncWebServerRequest *request){
  backward();

  return request->send(200, "application/json", "OK");
}

static void left_handler(AsyncWebServerRequest *request){
  left();

  return request->send(200, "application/json", "OK");
}

static void right_handler(AsyncWebServerRequest *request){
  right();

  return request->send(200, "application/json", "OK");
}

static void stop_handler(AsyncWebServerRequest *request){
  stop();

  return request->send(200, "application/json", "OK");
}

AsyncWebServer carServer(8000);

void startCarServer(){

  carServer.on("/forward", HTTP_GET, forward_handler);
  carServer.on("/backward", HTTP_GET, backward_handler);
  carServer.on("/left", HTTP_GET, left_handler);
  carServer.on("/right", HTTP_GET, right_handler);
  carServer.on("/stop", HTTP_GET, stop_handler);

  carServer.begin();
}
