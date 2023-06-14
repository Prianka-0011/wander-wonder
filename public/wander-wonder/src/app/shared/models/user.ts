export class User {
  private _name!:string;
  private _username!:string;
  private _passworrd!:string;

  get name()
  {
    return this._name
  }
  get username()
  {
    return this._username
  }
  get password()
  {
    return this._passworrd
  }

  set name(name)
  {
     this._name = name
  }
  set username(username)
  {
     this._username = username
  }
  set password(password)
  {
     this._passworrd = this.password
  }

  toJson():{}{
    return {
      name:this.name,
      password:this.password,
      username:this.username
    }

  }

}
