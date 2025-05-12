import type { Metadata } from "next";

async function getData(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: {
      revalidate: 60
    }
  });
  return response.json();
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const {
    id
  } = params;

  const post = await getData(id);
  return {
    title: post.title
  };
}

export default async function Post(props: Props) {
  const params = await props.params;

  const {
    id
  } = params;

  const post = await getData(id);
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}
