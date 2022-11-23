import { useEffect } from "react";
import CarControlAPI from "../adapters/car-control-api";
import CarLightControlAPI from "../adapters/car-light-control-api";
import CarControlService, { Action } from "../services/car-control.service";
import CarLightControlService from "../services/car-light-control.service";

enum ActionKey {
  ARROW_UP = "ArrowUp",
  ARROW_LEFT = "ArrowLeft",
  ARROW_RIGHT = "ArrowRight",
  ARROW_DOWN = "ArrowDown",
  S = "s",
};

enum LightActionKey {
  L = "l",
};

function mapActionKeyToAction(actionKey: ActionKey): Action {
  if (actionKey === ActionKey.ARROW_UP) {
    return Action.ACCELERATE;
  }
  if (actionKey === ActionKey.ARROW_LEFT) {
    return Action.TURN_LEFT;
  }
  if (actionKey === ActionKey.ARROW_RIGHT) {
    return Action.TURN_RIGHT;
  }
  if (actionKey === ActionKey.ARROW_DOWN) {
    return Action.REVERSE;
  }
  return Action.STOP;
};


enum XboxControllerGamepadControlIndex {
  A = 0,
  B = 1,
  X = 2,
  Y = 3,
  LB = 4,
  RB = 5,
  LT = 6,
  RT = 7,
  VIEW = 8,
  MENU = 9,
  LEFT_ANALOG_CLICK = 10,
  RIGHT_ANALOG_CLICK = 11,
  DIGITAL_PAD_UP = 12,
  DIGITAL_PAD_DOWN = 13,
  DIGITAL_PAD_LEFT = 14,
  DIGITAL_PAD_RIGHT = 15,
  HOME = 16,
};

const XboxControllerActionKeys = [
  XboxControllerGamepadControlIndex.DIGITAL_PAD_DOWN,
  XboxControllerGamepadControlIndex.DIGITAL_PAD_LEFT,
  XboxControllerGamepadControlIndex.DIGITAL_PAD_RIGHT,
  XboxControllerGamepadControlIndex.DIGITAL_PAD_UP,
  XboxControllerGamepadControlIndex.B,
];

function mapXboxControllerGamepadControlIndexToAction(
  xboxControllerGamepadControlIndex: XboxControllerGamepadControlIndex
): Action {
  if (xboxControllerGamepadControlIndex === XboxControllerGamepadControlIndex.DIGITAL_PAD_UP) {
    return Action.ACCELERATE;
  }
  if (xboxControllerGamepadControlIndex === XboxControllerGamepadControlIndex.DIGITAL_PAD_LEFT) {
    return Action.TURN_LEFT;
  }
  if (xboxControllerGamepadControlIndex === XboxControllerGamepadControlIndex.DIGITAL_PAD_RIGHT) {
    return Action.TURN_RIGHT;
  }
  if (xboxControllerGamepadControlIndex === XboxControllerGamepadControlIndex.DIGITAL_PAD_DOWN) {
    return Action.REVERSE;
  }
  return Action.STOP;
};

const BACKEND_URL = 'http://192.168.0.184';
const GAMEPAD_CONTROL_POLLING_MILLISECONDS = 50;

function Control() {
  const carControlApi = new CarControlAPI(BACKEND_URL);
  const carControlService = new CarControlService(carControlApi);

  const carLightControlApi = new CarLightControlAPI(BACKEND_URL);
  const carLightControlService = new CarLightControlService(carLightControlApi);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const key: string = event.key;
      console.log(key);

      const pressedActionKey: ActionKey = key as ActionKey;
      if (Object.values(ActionKey).includes(pressedActionKey)) {
        carControlService.executeAction(mapActionKeyToAction(pressedActionKey));
      }

      const pressedLightKey: LightActionKey = key as LightActionKey;
      if (Object.values(LightActionKey).includes(pressedLightKey)) {
        carLightControlService.turnSwitch();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  useEffect(() => {
    const gamepad_polling = setInterval(() =>  {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0]

      if (gamepad) {
        for (const gamepadButtonIndex of XboxControllerActionKeys as number[]) {
          const button = gamepad.buttons[gamepadButtonIndex];

          if (button?.pressed) {
            carControlService.executeAction(mapXboxControllerGamepadControlIndexToAction(gamepadButtonIndex));
          }
        }
      }
    }, GAMEPAD_CONTROL_POLLING_MILLISECONDS);

    return () => {
      clearInterval(gamepad_polling);
    };
  }, []);

  return <img
    src={`${BACKEND_URL}:81/stream`}
    style={{width: "300px", transform: "transform:rotate(180deg)"}}
  />;
}

export default Control;
