import {z} from 'zod';

export const ColorSchema = z.object({
  name: z.string().min(2),
  value: z.string().min(4).max(9).regex(/^#/, {
    message: 'String must be a valid hex code',
  }),
});
export const SizeSchema = z.object({
  name: z.string().min(2),
  value: z.string().min(2),
});
export const CategorySchema = z.object({
  name: z.string().min(2),
});

export const TeamSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().min(1, {
    message: 'Must not be empty! ',
  }),
});
export const SurveySchema = z.object({
  title: z.string().min(1),
  option1: z.string().min(1),
  vote1: z.coerce.number().min(0),
  option2: z.string().min(1),
  vote2: z.coerce.number().min(0),
});

export const ProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  images: z.object({url: z.string()}).array(),
  price: z.coerce.number(),
  cantidad: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
});
export const NewSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  body: z.string().min(1),
  imageUrl: z.string().min(1),
});
export const CommentSchema = z.object({
  body: z.string().min(1),
});
export const TicketSchema = z.object({
  matchId: z.string(),
});
export const ThreadSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  body: z.string().min(1),
});
export const SignInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});
export const SignUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
});
export const AdviseSchema = z.object({
  body: z.string().min(1),
});

export const MatchSchema = z.object({
  league: z.string().min(1),
  date: z.string(),
  stadium: z.string().min(1),
  visitingGoals: z.coerce.number().min(0),
  localGoals: z.coerce.number().min(0),
  visitingTeamId: z.string().min(1),
  localTeamId: z.string().min(1),
  isFinish: z.boolean(),
  capacity: z.coerce.number().min(1),
});
export const PlayerSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number(),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
  height: z.coerce.number().min(0),
  weight: z.coerce.number().min(0),
  dorsal: z.coerce.number().min(0),
  goals: z.coerce.number().min(0),
  assists: z.coerce.number().min(0),
  saves: z.coerce.number().min(0),
  position: z.string().min(1),
  country: z.string().min(1),
  teamId: z.string().min(1),
});
