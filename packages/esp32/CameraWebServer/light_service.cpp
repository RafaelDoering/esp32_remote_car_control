#include "Arduino.h"

extern int LED_PIN;

void led_on(){
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ON");
}

void led_off(){
  digitalWrite(LED_PIN, LOW);
  Serial.println("LED OFF");
}
