1. The difference between Component and PureComponent is that Component will always re-render its children when its prop or state changes, even if its children's prop or state did not change. While PureComponent will do a shallow comparison of the props and state, and if there is no difference between previous states and props, it will NOT re-render the Component at all. Using Pure component can break the application in a situation where the props and states have nested objects. The PureComponent at this scenario, would not be able to detect changes in the nested objects of the state or props and therefore would fail to re-render the component.

2. Context + shouldComponentUpdate might be dangerous because of the way context API works. Context API re-renders the component that consumes it once the state changes in the context API, so implementing shouldComponentUpdate lifecycle method to return false, in the same component can cause a bug because it might not allow context API to re-render the component even if the state changes.

3. Three ways to pass information from child to parent in React are:
   (a) Using Redux: An action which is dispatched in the child component can be used to upate the parent component with the help of Redux.
   (b) Context API: A parent component can use context API to create a provider which the child component subscribes to, and the child component can then pass information to the parent.
   (c) callback function: A parent component can provide a callback function as prop to its child component, and the child component can call this call the function and pass information to it.

4. Two ways to prevent a component from re-rendering are:
   (a) by memoizing the component using React.memo and (b)by implementing shouldComponentUpdate(this is only used in class-based component).

5. React.Fragment is like a virtual div because it does not reflect in the DOM. We need it when we want to return multiple JSX element from a component without adding unnecessary markup in the DOM. It might break the app if one tries to pass a className attribute on it.

6. HOC patterns can be used in (a)Authenticating users(withAuth) (b) Logging (withLogging) (c) Loading spinner(withSpinner)

7. Handling errors in callback, promise and async/await:
   In callbacks, the first argument of the callback function is always an error object, so it is handled by checking if it occured and then handle it. In promises, error is handled by chaining a catch block and then it is handled inside the catch block.
   In async/await, errors are handled using try and catch block. the argument of the catch block is always the error and it is checked and handled in the catch block.

8. setState takes two arguments(state and an optional callback). It is asynchronous because updating the state can be an expensive operation.

9. Steps needed to migrate class component to function componet:
   i. create a function component with the same name as the class-based component(This can be achieved by refactoring the class component by removing the class keyword and not extending the component class).
   ii. Identify all the state variables used in the Class component.
   iii. Replace the state variables with useState hooks in the Function component. Initialize the state variables using the useState hook and remove the constructor.
   iv. import useEffect or useLayout as the case maybe, and replace the actions of componentDidMount and other lifecycle methods with useEffect or useLayout as the case maybe.
   v. Adjust the class methods(event handlers) by adding function keyword to show that it is a function and no more a class method.
   vi. remove the render method of the class-based component and adjust the event handlers in the JSX to point to the event handlers.
   vii. Replace any references to 'this' with the appropriate variables or functions in the Function component.

10. Few ways style can be used with component are:
    i. inline styling
    ii. css module(this helps to scope the styles locally to each component)
    iii. CSS-in-JS libraries(example is styled-component)
    iv. CSS Frameworks (Bootstrap,tailwind,material ui, etc).

11. Few ways to render html from the server are:
    (a) By injecting the html into the DOM using vanill javascript or Javascript frameworks like React.
    (b) By using template engines(handlebar,ejs etc)
