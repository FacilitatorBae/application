import { withAuthentication } from "~/hocs/withAuthentication";
import NewPostComponent from "~/components/NewPost/NewPost";
import SignIn from "~/components/SignIn";

const NewPost = () => {
  return <NewPostComponent />;
};

const AuthFallback = () => {
  return <SignIn message="To sell your products you need to be logged in" />;
};

export default withAuthentication(NewPost, AuthFallback);
