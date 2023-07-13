import Account from "~/components/Account/Account";
import { withAuthentication } from "~/hocs/withAuthentication";

const MyAccount = () => {
  return <Account />;
};

export default withAuthentication(MyAccount);
