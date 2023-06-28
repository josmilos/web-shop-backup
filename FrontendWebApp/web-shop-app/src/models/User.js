import { Order } from "./Order";

export class User {
    constructor(
        UserId="",
        UserName="",
        Email="",
        Password="",
        FirstName="",
        LastName="",
        Address="",
        DateOfBirth="",
        UserType="",
        Image="",
        Verification="",
        Orders=[]
    ){
        this.userId=UserId;
        this.userName=UserName;
        this.email = Email;
        this.password = Password;
        this.firstName = FirstName;
        this.lastName = LastName;
        this.address = Address;
        this.dateOfBirth = DateOfBirth;
        this.userType = UserType;
        this.image = Image;
        this.verification = Verification;
        this.products = Orders;
    }
}

export default User;