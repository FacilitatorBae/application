import { Dialog } from "@material-tailwind/react";
import SignIn from "./SignIn";

interface AuthDialog {
  open: boolean;
  handleOpen: () => void;
}

const AuthDialog: React.FC<AuthDialog> = ({ open, handleOpen }) => {
  return (
    <Dialog
      handler={handleOpen}
      open={open}
      className="bg-transparent shadow-none"
    >
      <SignIn message="To sell your products you need to be logged in" />
    </Dialog>
  );
};

export default AuthDialog;
