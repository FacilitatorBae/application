import Item from "../../components/Item";
import { prisma } from "../../server/db";

export default function Post({ postData }) {
  return <Item product={postData} />;
}

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  const paths = products.map((prod) => ({
    params: { id: prod.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const getPostData = async (id) => {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (product && product.id) {
      return product;
    }
  };

  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
