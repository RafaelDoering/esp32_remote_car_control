import type CarLightControl from "../ports/car-light-control.port";

export default class CarLightControlService {
  private carLightControl: CarLightControl;
  private isLoading: boolean = false;

  constructor(carLightControl: CarLightControl) {
    this.carLightControl = carLightControl;
  }

  public async turnSwitch(): Promise<void> {
    if (this.isLoading === false) {
      this.isLoading = true;
      try {
        await this.carLightControl.switch();
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    }
  }
};
