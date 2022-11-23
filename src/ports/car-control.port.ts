import type { Action } from "../services/car-control.service";

export default interface CarControl {
  executeAction: (action: Action) => Promise<void>;
};
