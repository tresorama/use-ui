# Badge ( a Component without API )

This Badge does not provide an API.
We simply spread the **UI** object in the **Box** component.

```javascript

// in ./componetns/Badge.js
import React from "react";
import { Box } from "@useui/react";

const UI = {
  paddingX: 1,
  paddingY: 0.5,
  borderColor: "primary",
  backgroundColor: "secondary", // more on this later ...
};

const Badge = (props) => {
  return <Box as="span" {...UI} {...props} />;
};

export default Badge;











// in screens/HomePage.js
...
...
const HomePage = (props) => {
  return (
    ...
    <Badge>On Sale</Badge>
    ...
  )
};


```
