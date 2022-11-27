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
        await fetch(`${this.apiUrl}/led/on`);
      } else {
        await fetch(`${this.apiUrl}/led/off`);
      }
    } catch (error) {
    } finally {
      this.isLightOn = !this.isLightOn;
    }
  };
};
