import {
  Input,
  IconButton,
  Breadcrumbs,
  Select,
  Option,
  Textarea,
  Button,
  Spinner,
} from "@material-tailwind/react";
import Link from "next/link";
import { BiChevronLeft, BiCamera } from "react-icons/bi";
import { useNewPost } from "~/hooks/useNewPost";
import { useRef } from "react";
import { api } from "~/utils/api";

const Fourth = () => {
  const { newPostDetails } = useNewPost();

  const { title } = newPostDetails;

  return (
    <>
      <div className="flex min-h-[60vh] w-full flex-col justify-evenly bg-white py-10 text-center font-poppins">
        <div className="text-5xl font-bold">{title}</div>
        <div className="text-5xl font-medium">Is now on the marketplace</div>
        <div className="text-2xl font-medium">
          {newPostDetails.id && (
            <div>
              {`Here is the `}
              <Link
                href={`/items/${newPostDetails.id}`}
                className="text-blue-900 underline"
              >
                link
              </Link>
              {` for your post`}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Fourth;
