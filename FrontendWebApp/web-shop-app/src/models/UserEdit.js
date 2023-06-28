export class UserEdit{
    constructor(
        Password="",
        FirstName="",
        LastName="",
        Address="",
        DateOfBirth="",
        Image=""
    )
    {
        this.password = Password;
        this.firstName = FirstName;
        this.lastName = LastName;
        this.address = Address;
        this.dateOfBirth = DateOfBirth;

        this.image = Image;

    }
}

export default UserEdit;