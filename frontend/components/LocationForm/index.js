import { useState, useCallback } from 'react'
import { Formik, Field } from 'formik'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
} from '@chakra-ui/react'

import * as Yup from 'yup'

const formSchema = Yup.object({
    email: Yup.string().email().min(2).max(200).required('Email is required'),
    location: Yup.string().min(2).max(200).required('Location is required'),
})

const initialValues = {
    email: '',
    locationText: '',
    location: '',
}

const SUBMIT_URL = '/api/location-lookup'

const SelectItems = ({ items }) => {
    if (!items || items.length == 0) {
        return <></>
    }
    return (
        <FormControl>
            <FormLabel htmlFor='location'>
                Please select the best match
            </FormLabel>
            <Field as={Select} name='location' type='select'>
                {items.map((item) => (
                    <option key={item.geonameId} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </Field>
        </FormControl>
    )
}

const LocationForm = () => {
    const [loading, setLoading] = useState(false)
    const [locations, setLocations] = useState(null)

    const onSearch = useCallback(async (values) => {
        try {
            setLoading(true)
            const body = JSON.stringify(values)
            const res = await fetch(SUBMIT_URL, { method: 'POST', body })
            const data = await res.json()
            console.log('Received location data:', data.locations)
            console.log('Locations are: ', data.locations)
            setLocations(data.locations)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [])

    const onSubmit = (values) => alert(JSON.stringify(values))
    return (
        <Flex bg='gray.100' align='center' justify='center' h='100vh'>
            <Box bg='white' p={6} rounded='md' w='sm'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit, values, errors, touched }) => (
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
                                        placeholder='eg. nick@dimagi.com'
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
                                        touched.locationText &&
                                        errors.locationText
                                    }
                                >
                                    <FormLabel htmlForm='locationText'>
                                        Location text
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        name='locationText'
                                        type='text'
                                        required={true}
                                        variant='filled'
                                    />
                                    <Button
                                        mt={4}
                                        isLoading={loading}
                                        onClick={() => onSearch(values)}
                                    >
                                        Search
                                    </Button>
                                    <FormErrorMessage>
                                        {errors.locationText}
                                    </FormErrorMessage>
                                </FormControl>
                                {locations && (
                                    <FormControl>
                                        <FormLabel htmlFor='location'>
                                            Please select the best match
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            name='location'
                                            type='select'
                                        >
                                            {locations.map((item) => (
                                                <option
                                                    key={item.geonameId}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Field>
                                    </FormControl>
                                )}

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
            {/* <p>likely locations: {likelyLocations}</p> */}
        </Flex>
    )
}

export default LocationForm
