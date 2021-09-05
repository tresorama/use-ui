## useUI 2

How it works :

When useUI is called , it pass "props" to **sheet.customAPI**, that search in props for API properties and parse them into an object.
This object is later passed to **sheet.runner** that build the UI object.
