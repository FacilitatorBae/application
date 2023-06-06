export default function Post({ postData }) {
  return <h1>{postData.title}</h1>;
}

const paths = [{ params: { id: "0" } }, { params: { id: "1" } }];

export async function getStaticPaths() {
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const mockData = [
    { id: "0", title: "test0" },
    { id: "1", title: "test1" },
  ];

  const getPostData = (id) => mockData.find((item) => item.id === id);
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
