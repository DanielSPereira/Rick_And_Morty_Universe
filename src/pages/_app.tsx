import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { setupStore } from '@/app/store'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo'
import GlobalStyle from '@/styles/globalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={setupStore()}>
        <GlobalStyle />
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  )
}

export default MyApp
