
export async function getReviewsByProduct(prisma, productId, limit) {
  return prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
   ...(limit ? { take: limit } : {}),
  });
}

export async function getReviewSummary(prisma, productId) {
  const summary = await prisma.summary.findFirst({
    where: {
      productId: productId,
      expiresAt: { gt: new Date() }, // only get non-expired summaries    
    },
  });

 console.log("SUMMARY:", summary);
 return summary ? summary : null;
}