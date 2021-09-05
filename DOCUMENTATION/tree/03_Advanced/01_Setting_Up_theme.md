# Setting Up Theme

in App.js (or your equivalent Component that will never be unmounted ) do :

```javascript
// in App.js
import { ThemeProvider } from "@emotion/react";
import { defaultTheme } from "@useui/react";

...
...
...

const App = () => {
  return (
    <div className="App">
        <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
              <Switch>
                <Route ... />
                <Route ... />
                <Route ... />
              </Switch>
          </BrowserRouter>
        </ThemeProvider>
    </div>
  );
};
```

To see how to customize theme , [go here]().
