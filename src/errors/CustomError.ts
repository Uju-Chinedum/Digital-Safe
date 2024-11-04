class CustomError extends Error {
  public code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
