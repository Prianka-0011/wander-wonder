export class User {
  private name!:string;
  private username!:string;
  private passworrd!:string;

  get _name()
  {
    return this.name
  }
  get _username()
  {
    return this.username
  }
  get _password()
  {
    return this.passworrd
  }

  set _name(name)
  {
     this.name = name
  }
  set _username(username)
  {
     this.username = username
  }
  set _password(password)
  {
     this.passworrd = password
  }

  toJson():{}{
    return {
      name:this._name,
      password:this._password,
      username:this._username
    }

  }

}
