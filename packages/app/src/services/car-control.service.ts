import type CarControl from "../ports/car-control.port";

export enum Action {
  ACCELERATE = 'accelerate',
  REVERSE = 'reverse',
  TURN_LEFT = 'turn-left',
  TURN_RIGHT = 'turn-right',
  STOP = 'stop',
}

export default class CarControlService {
  private carControl: CarControl;
  private isLoading: boolean = false;

  constructor(carControl: CarControl) {
    this.carControl = carControl;
  }

  public async executeAction(action: Action): Promise<void> {
    if (this.isLoading === false) {
      this.isLoading = true;
      try {
        await this.carControl.executeAction(action);
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    }
  }
};
