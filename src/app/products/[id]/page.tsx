export const dynamicParams = true;
export const revalidat = 60; //ISR, cached and reused for Next 60s for other values such as 4 ~ 100

type Product = { id: number, title: string};

export async function generateStaticParams() {

    const ids = ['1', '2', '3'];
    return ids.map((id) => ({ id}));
}

async function getProduct(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    console.log("the res : ", res);
    if (!res.ok) throw new Error('Not found');
    return res.json() as Promise<Product>
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } =await params;

    const product = await getProduct(id);
    return (
      <main style={{ padding: 24 }}>
        <h1>Product {product.id}</h1>
        <p>{product.title}</p>
      </main>
    );
  }