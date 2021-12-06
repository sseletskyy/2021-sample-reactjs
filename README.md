# 2021-scalio-reactjs

ReactJS Test Assignment - Search + Result components - api.github.com/search/users?q

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
