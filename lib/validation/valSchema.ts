import { object, string } from 'yup';

export let RegisterInputschema = object({
    username: string().min(4).required(),
    email: string().email().required(),
    password: string().min(4).required()
});


export let LoginInputschema = object({
    email: string().email().required(),
    password: string().min(4).required()
});
