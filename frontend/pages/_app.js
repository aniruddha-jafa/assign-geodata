import Head from 'next/head'
import ErrorBoundary from '../components/ErrorBoundary'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet='UTF-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
            </Head>
            <ChakraProvider>
                <ErrorBoundary>
                    <Component {...pageProps} />
                </ErrorBoundary>
            </ChakraProvider>
        </>
    )
}

export default MyApp