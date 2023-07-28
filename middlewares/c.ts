import { object, string, number, date, InferType } from 'yup';

export let Inputschema = object({
    username: string().min(5).required(),
    email: string().email().required(),
    password: string().min(4).required(),
});
