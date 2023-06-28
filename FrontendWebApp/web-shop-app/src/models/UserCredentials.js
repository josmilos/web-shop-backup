export class UserCredentials{
    constructor(
        UserId="",
        Email="",
        Password="",
        UserType=""
    ){
        this.userId=UserId;
        this.email = Email;
        this.password = Password;
        this.userType = UserType;
    }
}

export default UserCredentials;