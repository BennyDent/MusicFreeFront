import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Client, Provider, cacheExchange, fetchExchange,subscriptionExchange  } from   "urql";
import { createClient as createWSClient } from 'graphql-ws';
import { auth, Auth } from './ts_files/auth';
// Import the generated route tree
import { routeTree } from './routeTree.gen'
// Create a new router instance
const router = createRouter({ routeTree, context: auth})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    context: Auth
    router: typeof router
  }
}

const wsClient = createWSClient({
  url: 'ws://localhost:7177',
});

const client = new Client({
  url: 'https://localhost:7177/graphql',
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || '' };
        return {
          subscribe(sink) {
            const unsubscribe = wsClient.subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    }),
  ],
});


// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Provider value={client}>
      <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  )
}