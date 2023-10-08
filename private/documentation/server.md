# BACKEND

#### Dependencies 
- Node.js , Required for express and NodeMailer
- Express.js , Handles Routing and Server listening
- Path , Parses file paths for routing
- NodeMailer , Middle man for code and Google IMAP api
- DotEnv , Parses Environment files which store sensitive information


## Routing
### Public files
All public files are accessiable to the User, allowing html pages to foward the user without calling the server.

All pages have access to all other pages

Javascript, Json, and CSS are fowarded by the induvisual HTML pages for simplicity

### Get requests
- /index or / -> Home page
- /about -> About page
- /portfolio -> Portfolio page
- /projects -> Project page
- /contacts -> Contacts page
- /personal -> Personal page

##### Get Syntax

A typical URI/URL follows this format
`https://www.domainname.toplevel.location/directory`

My get requests follow this syntax
 - The directory is the file name
 - The filepath is stored in a variable to shorten each request
 - The server is named `backend`
    
```javascript
serverName.get("/dir.html", (req, res) => {    
    res.sendFile(`filepath/filename.html`);
})
```

### Post requests
Post requests are passed through the URI with no nesting, allows for easier parsing

Post requests are scrubbed before being accessed by code, removing special characters that cant be used by email.

- /contacts/post -> Sends email information to google api (or fails) to forward contact request to my inbox 
    - mailOptions are stored in a class, which allows for details to be formatted via a method.

##### String scrubbing
The characters removed from my input fields are listed below
 - pattern = `[*+=?^\$\{\}()|[\]\\](\r|\n|\r\n)`
Some characters are crucial to emails like `@` and `.` so arent removed
The rest of the string is untouched, simply removing those special characters using `string.replace(pattern, "\\$&")`

- special characters like `\n` and `\r` can be spammed to caused overflows and crashes
- `$` is the javascript string escape character, along with `{}`
- other characters are used for a variety of attacks
