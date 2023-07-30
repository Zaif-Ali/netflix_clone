import { object, string } from 'yup';

export let Inputschema = object({
    username: string().min(4).required(),
    email: string().email().required(),
    password: string().min(4).required()
});
