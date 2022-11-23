export default interface CarLightControl {
  switch: () => Promise<void>;
};
