import { z } from "zod";

export const AddProductValidator = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
});
