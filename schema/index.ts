import {z} from 'zod';
export const ColorSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  value: z.string().min(4).max(9).regex(/^#/, {
    message: 'Value must be a valid hex code starting with "#"',
  }).min(1, 'Value field is required'),
});

export const SizeSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  value: z.string().min(1, 'Value must have at least 2 characters').min(1, 'Value field is required'),
});

export const CategorySchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters').min(1, 'Name field is required'),
});

export const TeamSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters').min(1, 'Name field is required'),
  imageUrl: z.string().min(1, 'Must not be empty! ').min(1, 'Image URL field is required'),
});

export const SurveySchema = z.object({
  title: z.string().min(1, 'Title must have at least 1 character').min(1, 'Title field is required'),
  option1: z.string().min(1, 'Option 1 must have at least 1 character').min(1, 'Option 1 field is required'),
  vote1: z.coerce.number().min(0, 'Vote 1 must be a non-negative number'),
  option2: z.string().min(1, 'Option 2 must have at least 1 character').min(1, 'Option 2 field is required'),
  vote2: z.coerce.number().min(0, 'Vote 2 must be a non-negative number'),
});

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character').min(1, 'Name field is required'),
  description: z.string().min(1, 'Description must have at least 1 character').min(1, 'Description field is required'),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number(),
  cantidad: z.coerce.number().min(1, 'Cantidad must be at least 1').min(1, 'Cantidad field is required'),
  categoryId: z.string().min(1, 'Category ID must have at least 1 character').min(1, 'Category ID field is required'),
  colorId: z.string().min(1, 'Color ID must have at least 1 character').min(1, 'Color ID field is required'),
  sizeId: z.string().min(1, 'Size ID must have at least 1 character').min(1, 'Size ID field is required'),
});

export const NewSchema = z.object({
  title: z.string().min(1, 'Title must have at least 1 character').min(1, 'Title field is required'),
  description: z.string().min(1, 'Description must have at least 1 character').min(1, 'Description field is required'),
  body: z.string().min(1, 'Body must have at least 1 character').min(1, 'Body field is required'),
  imageUrl: z.string().min(1, 'Image URL must have at least 1 character').min(1, 'Image URL field is required'),
});

export const CommentSchema = z.object({
  body: z.string().min(1, 'Body must have at least 1 character').min(1, 'Body field is required'),
});

export const TicketSchema = z.object({
  matchId: z.string().min(1, 'Match ID field is required'),
});

export const ThreadSchema = z.object({
  title: z.string().min(1, 'Title must have at least 1 character').min(1, 'Title field is required'),
  description: z.string().min(1, 'Description must have at least 1 character').min(1, 'Description field is required'),
  body: z.string().min(1, 'Body must have at least 1 character').min(1, 'Body field is required'),
  categoryId: z.string().min(1, 'Category ID must have at least 1 character').min(1, 'Category ID field is required'),
});

export const ThreadUpdateSchema = z.object({
  title: z.string().min(1, 'Title must have at least 1 character').min(1, 'Title field is required'),
  description: z.string().min(1, 'Description must have at least 1 character').min(1, 'Description field is required'),
  body: z.string().min(1, 'Body must have at least 1 character').min(1, 'Body field is required'),
  categoryThreadsId: z.string().min(1, 'Category Threads ID must have at least 1 character').min(1, 'Category Threads ID field is required'),
});

export const SignInSchema = z.object({
  email: z.string().email().min(1, 'Email must have at least 1 character').min(1, 'Email field is required'),
  password: z.string().min(1, 'Password must have at least 1 character').min(1, 'Password field is required'),
});

export const SignUpSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character').min(1, 'Name field is required'),
  email: z.string().email().min(1, 'Email must have at least 1 character').min(1, 'Email field is required'),
  password: z.string().min(1, 'Password must have at least 1 character').min(1, 'Password field is required'),
  description: z.string().min(1),
});

export const UserSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character').min(1, 'Name field is required'),
  email: z.string().email().min(1, 'Email must have at least 1 character').min(1, 'Email field is required'),
  password: z.string().min(1, 'Password must have at least 1 character').min(1, 'Password field is required'),
  description: z.string().min(1, 'Description must have at least 1 character').min(1, 'Description field is required'),
  imageUrl: z.string().min(1, 'Image URL must have at least 1 character').min(1, 'Image URL field is required'),
  role: z.string().min(1, 'Role must have at least 1 character').min(1, 'Role field is required'),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
  email: z.string().email().min(1, 'Email must have at least 1 character'),
  description: z.string().min(1, 'Description must have at least 1 character'),
});

export const AdviseSchema = z.object({
  body: z.string().min(1, 'Body must have at least 1 character'),
});

export const MatchSchema = z.object({
  league: z.string().min(1, 'League must have at least 1 character'),
  date: z.string(),
  stadium: z.string().min(1, 'Stadium must have at least 1 character'),
  visitingGoals: z.coerce.number().min(0, 'Visiting goals must be a non-negative number'),
  localGoals: z.coerce.number().min(0, 'Local goals must be a non-negative number'),
  visitingTeamId: z.string().min(1, 'Visiting Team ID must have at least 1 character'),
  localTeamId: z.string().min(1, 'Local Team ID must have at least 1 character'),
  isFinish: z.boolean(),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
});

export const PlayerSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
  lastname: z.string().min(1, 'Lastname must have at least 1 character'),
  age: z.coerce.number(),
  description: z.string().min(1, 'Description must have at least 1 character'),
  imageUrl: z.string().min(1, 'Image URL must have at least 1 character'),
  height: z.coerce.number().min(0, 'Height must be a non-negative number'),
  weight: z.coerce.number().min(0, 'Weight must be a non-negative number'),
  dorsal: z.coerce.number().min(0, 'Dorsal must be a non-negative number'),
  goals: z.coerce.number().min(0, 'Goals must be a non-negative number'),
  assists: z.coerce.number().min(0, 'Assists must be a non-negative number'),
  saves: z.coerce.number().min(0, 'Saves must be a non-negative number'),
  position: z.string().min(1, 'Position must have at least 1 character'),
  country: z.string().min(1, 'Country must have at least 1 character'),
  teamId: z.string().min(1, 'Team ID must have at least 1 character'),
});