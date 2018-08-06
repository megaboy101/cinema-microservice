export class Notification {
  public static serve(options: any): Promise<any> {
    return new Promise((resolve) => {
      resolve(options);
    });
  }
}
