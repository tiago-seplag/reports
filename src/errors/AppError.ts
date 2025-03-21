export class AppError {
  readonly statusCode: number;
  readonly message:
    | string
    | {
        errors: [{ message: string }];
      };
  constructor(message: string | any, statusCode = 400) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
