export const fetchData = async () => {
  try {
    const [questionsResponse, productsResponse] = await Promise.all([
      fetch("src/data/questions.json"),
      fetch("src/data/products.json"),
    ]);

    const questions = await questionsResponse.json();
    const products = await productsResponse.json();

    return { questions, products };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { questions: [], products: [] };
  }
};
