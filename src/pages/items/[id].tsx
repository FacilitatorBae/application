import { fakeProducts } from "../index";
import Item from "../../components/Item";

export default function Post({ postData }) {
  return <Item products={postData} />;
}

const paths = [
  { params: { id: "aaabbbccc1" } },
  { params: { id: "aaabbbccc2" } },
  { params: { id: "aaabbbccc3" } },
  { params: { id: "aaabbbccc5" } },
  { params: { id: "aaabbbccc6" } },
  { params: { id: "aaabbbccc7" } },
  { params: { id: "aaabbbccc8" } },
];

export async function getStaticPaths() {
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const getPostData = (id) => fakeProducts.find((item) => item.id === id);
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
