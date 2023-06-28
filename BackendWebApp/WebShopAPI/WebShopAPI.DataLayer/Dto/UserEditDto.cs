namespace WebShopAPI.Dto
{
    public class UserEditDto
    {
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Image { get; set; }
    }
}
