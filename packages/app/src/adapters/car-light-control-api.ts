import type CarLightControl from "../ports/car-light-control.port";

export default class CarLightControlAPI implements CarLightControl {
  private apiUrl: string;
  private isLightOn: boolean = false;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public async switch(): Promise<void> {
    try {
      if (!this.isLightOn) {
        await fetch(`${this.apiUrl}/ledon`);
      } else {
        await fetch(`${this.apiUrl}/ledoff`);
      }
    } catch (error) {
    } finally {
      this.isLightOn = !this.isLightOn;
    }
  };
};
