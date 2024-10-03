import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Client, Provider, cacheExchange, fetchExchange, subscriptionExchange } from   "urql";
import { createClient as createWSClient } from 'graphql-ws';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const wsClient = createWSClient({
  url: 'wss://localhost:7177/graphql',
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



export const Route = createRootRoute({
  component: () => (
    <Provider value={client}>
      <div className="p-2 flex gap-2">
      <QueryClientProvider client={queryClient}>
      <Outlet />
      <TanStackRouterDevtools />
      </QueryClientProvider>
    </div>
  </Provider>
  ),
 
})

interface RouterContext{

  link_string: string
}

const RouteContext: RouterContext= {
link_string: "https://localhost:7190/music/get_song/",
}