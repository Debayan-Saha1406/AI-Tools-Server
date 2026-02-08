export async function getProduct(prisma, productId) {
  return prisma.product.findUnique({
    where: { id: productId }
  });
}

export async function getAllProducts(prisma) {
  return prisma.product.findMany();
}