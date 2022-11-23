import type CarControl from "../ports/car-control.port";
import { Action } from "../services/car-control.service";

export default class CarLightControlAPI implements CarControl {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public async executeAction(action: Action): Promise<void> {
    if (action === Action.ACCELERATE) {
      await fetch(`${this.apiUrl}/go`);
    }
    if (action === Action.REVERSE) {
      await fetch(`${this.apiUrl}/back`);
    }
    if (action === Action.TURN_LEFT) {
      await fetch(`${this.apiUrl}/left`);
    }
    if (action === Action.TURN_RIGHT) {
      await fetch(`${this.apiUrl}/right`);
    }
    if (action === Action.STOP) {
      await fetch(`${this.apiUrl}/stop`);
    }
  };
};
