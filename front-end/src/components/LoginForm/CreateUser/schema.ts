import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
    name: yup.string().required('O campo nome é obrigatório'),
    email: yup
        .string()
        .email('O campo necessita de um email válido')
        .required('O campo email é obrigatório'),
    password: yup.string().required('O campo senha é obrigatório'),
});
