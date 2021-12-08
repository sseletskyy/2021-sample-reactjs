# reactjs With CustomEvents as alternative of state management

ReactJS Test Assignment - Search + Result components - api.github.com/search/users?q

# Deployed to Netlify
[![Netlify Status](https://api.netlify.com/api/v1/badges/f10c5eee-56f0-4100-8689-28065dc780a7/deploy-status)](https://app.netlify.com/sites/lucid-easley-77b528/deploys)

https://lucid-easley-77b528.netlify.app/

## Development log

Install basic dependencies

- `npm i --save react react-dom bootstrap react-bootstrap`
- `npm i --save-dev vite @vitejs/plugin-react prettier typescript @types/react @types/react-dom`

Configure project based on template

- `npm init vite@latest`

Cleanup template and create a basic structure

- notifications, search, results, paginator

Configure test env (jest, testing-library)

- `npm i -D jest ts-jest @types/jest`
- `npx ts-jest config:init`
- `npm i -D @testing-library/react @testing-library/jest-dom`

Install fp-ts (library for functional programming)
- `npm i --save fp-ts`

# Architecture

Interaction among the components is organized with Publish-Subscribe design pattern. 
Custom Events are used for publishing changes and subscribing to those changes.

[src/PubSub/index.ts](src/PubSub/index.ts) contains 
- enum CustomEvents - the list of all custom events
- `broadcastFrom` and `subscribeTo` - generic methods for pub/sub
- pub/sub methods for each custom event

[src/PubSub/Flows/index.ts](src/PubSub/Flows/index.ts) contains specific flows
- `fetchUsersOnSearchSubmit` 
  - sends api request with the search string
  - parses result: list of users and list of pagination links
  - publishes results
  - publishes error if occurred
- `fetchUsersOnPageClick`
  - sends api request with the selected pagination link
  - parses result: list of users and list of pagination links
  - publishes results
  - publishes error if occurred

[src/api/users/index.ts](src/api/users/index.ts) contains fetch related logic and helper methods for parsing response

## Components

All components are loosely coupled.
They interact with each other by subscribing to custom events or broadcasting custom events

If component is expecting some data then it should define a function prop `subscribeToX`
Example
```ts
export interface ResultsProps {
    subscribeToUsers(callback: SubscribeToCallback<UsersResponse>): UnsubscribeFn;
}
```

It expects a callback function, which should be called when specific event occurs.
Callback function should return a cleanup function to unsubscribe from the custom event,
so it can be used in `useEffect` hook.

All the components a covered with specs.
Specs were written using TDD.
So they can be read as requirements.


# A remark regarding column sorting
Unfortunately Github's API does not support sorting for `avatar_url`, `login`, and `type` arguments.
Thus sorting is applied over the returned result.
