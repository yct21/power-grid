# frontend/stores

This is stores, which describe the application state.

It can be considered to be the "Model" part of the application.
And since it's a cycle.js program, it's actually in the form of
`BehaviorSubject`, or hot observable with a current value.

We are just emit plain javascript objects in the stream for the simplicity,
and may switch to Immutable.js if it gets too slow to render, in the future.
