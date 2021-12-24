using WebAPIDemo.ViewModels;
using WebAPIDemoDataAcess.EntityModels;

namespace WebAPIDemo.Mappers
{
    public class CustomerMapper
    {
        

        public ViewCustomer CustomerToViewCustomer(Customer c)
        {
            //get a customer from the repo
            //match all the properties 1 to 1 with a view 
            //make a new vm

            ViewCustomer vc = new ViewCustomer();
            //vc.CardNumber = c.CardNumber;
            vc.Email = c.Email;
            vc.FirstName = c.FirstName;
            vc.LastName = c.LastName;
            vc.PWord = c.PWord;
            vc.CustomerId = c.CustomerId;

            return vc;

        }

        public Customer ViewCustomerToCustomer(ViewCustomer c)
        {
            //get a customer from the repo
            //match all the properties 1 to 1 with a view 
            //make a new vm

            Customer c1 = new Customer();
            c1.LastName = c.LastName;
            c1.FirstName = c.FirstName;
            c1.Email = c.Email;
            c1.CustomerId = (int) c.CustomerId;
            c1.PWord = c.PWord;

            return c1;

        }


    }
}
