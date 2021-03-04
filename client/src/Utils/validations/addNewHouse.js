import { object, string, number } from 'yup';

const validationSchema = object({
  title: string().min(8, 'Title must be at least 8 char.').required(),
  description: string()
    .min(50, 'Description must be at least 50 char.')
    .required(),
  locationId: number().integer().required(),
  room_num: number().required().positive().integer().min(1),
  bathroom_num: number().required().positive().integer().min(1),
  category: string().required(),
  price: number().required(),
  area: number().required().min(10),
  image: string().required().url(),
});

export default validationSchema;
