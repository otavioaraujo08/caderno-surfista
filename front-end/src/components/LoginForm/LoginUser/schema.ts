import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('O campo necessita de um email válido')
        .required('O campo email é obrigatório'),
    password: yup.string().required('O campo senha é obrigatório'),
});
