import { Formik, Field } from 'formik'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
} from '@chakra-ui/react'

import * as Yup from 'yup'

const formSchema = Yup.object({
    email: Yup.string().email().min(2).max(200).required('Email is required'),
    location: Yup.string().min(2).max(200).required('Location is required'),
})

const initialValues = {
    email: '',
    location: '',
}

const LocationForm = () => {
    const onSubmit = async (values, { resetForm }) => {
        const body = JSON.stringify(values, null, 2)
        alert(body)
        resetForm()
    }
    return (
        <Flex bg='gray.100' align='center' justify='center' h='100vh'>
            <Box bg='white' p={6} rounded='md' w='sm'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <form noValidate={true} onSubmit={handleSubmit}>
                            <Flex
                                flexDirection={'column'}
                                gap={4}
                                align='flex-start'
                            >
                                <FormControl
                                    isInvalid={touched.email && errors.email}
                                >
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                    <Field
                                        as={Input}
                                        id='email'
                                        placeholder='nick@dimagi.com'
                                        name='email'
                                        type='email'
                                        variant='filled'
                                    />
                                    <FormErrorMessage>
                                        {errors.email}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        touched.location && errors.location
                                    }
                                >
                                    <FormLabel htmlFor='location'>
                                        Location
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        name='location'
                                        type='text'
                                        required={true}
                                        variant='filled'
                                    />
                                    <FormErrorMessage>
                                        {errors.location}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button
                                    mt={16}
                                    type='submit'
                                    colorScheme='teal'
                                    width='full'
                                >
                                    Submit
                                </Button>
                            </Flex>
                        </form>
                    )}
                </Formik>
            </Box>
        </Flex>
    )
}

export default LocationForm
