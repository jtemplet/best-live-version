/// <reference path='../../../typings/tsd.d.ts' />

export class User {
  userName : string;
  email : string;

  constructor(userName: string, email: string) {
      this.userName = userName;
      this.email = email
  }
}
