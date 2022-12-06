#include "Arduino.h"

extern int LEFT_BACKWARD_PIN;
extern int LEFT_FORWARD_PIN;
extern int RIGHT_BACKWARD_PIN;
extern int RIGHT_FORWARD_PIN;

static void WheelAction(
  bool IS_LEFT_BACKWARD_WHEEL_ON,
  bool IS_LEFT_FORWARD_WHEEL_ON,
  bool IS_RIGHT_BACKWARD_WHEEL_ON,
  bool IS_RIGHT_FORWARD_WHEEL_ON
);

void forward(){
  WheelAction(true, false, true, false);
  Serial.println("Forward");
}

void backward(){
  WheelAction(false, true, false, true);
  Serial.println("Backward");
}

void left(){
  WheelAction(true, false, false, true);
  Serial.println("Left");
}

void right(){
  WheelAction(false, true, true, false);
  Serial.println("Right");
}

void stop(){
  WheelAction(false, false, false, false);
  Serial.println("Stop");
}

static void WheelAction(
  bool IS_LEFT_BACKWARD_WHEEL_ON,
  bool IS_LEFT_FORWARD_WHEEL_ON,
  bool IS_RIGHT_BACKWARD_WHEEL_ON,
  bool IS_RIGHT_FORWARD_WHEEL_ON
) {
  if (IS_LEFT_BACKWARD_WHEEL_ON) {
    digitalWrite(LEFT_BACKWARD_PIN, 1);
  } else {
    digitalWrite(LEFT_BACKWARD_PIN, 0);
  }

  if (IS_LEFT_FORWARD_WHEEL_ON) {
    digitalWrite(LEFT_FORWARD_PIN, 1);
  } else {
    digitalWrite(LEFT_FORWARD_PIN, 0);
  }

  if (IS_RIGHT_BACKWARD_WHEEL_ON) {
    digitalWrite(RIGHT_FORWARD_PIN, 1);
  } else {
    digitalWrite(RIGHT_FORWARD_PIN, 0);
  }

  if (IS_RIGHT_FORWARD_WHEEL_ON) {
    digitalWrite(RIGHT_BACKWARD_PIN, 1);
  } else {
    digitalWrite(RIGHT_BACKWARD_PIN, 0);
  }
}
