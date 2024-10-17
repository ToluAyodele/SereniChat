"""
Learned
- setting optional parameters and that the parameters set in http method calls are considered query parameters that can optionally be set with the end user
- initialize the json object that will be returned and just update it based on conditions and return it in the end
"""

"""
Review
- read about cookies and have a great understanding
    COOKIES
        - cookies are tiny bits of data stored on a web browser
        - the bits of data are used by websites to track a user's journey, enabling them to offer features specific to each individual user
        - example: cookies can be used for shopping carts on e-commerce sites
        - cookies are primarily used for server-side session management and data exchange
        - local storage is used for client-side storage of application data and preferences

    WHAT ARE COOKIES MADE UP OF?
        - when you visit a website, you may be identified as "User-X" by a cookie that's delivered by the website
            - whenever you leave the site and come back, the cookie we were issued initially will represent us as "User-X" again
        - cookies contain two bits of data: an identifier for a unique user and some information about the user
            - which is technically a key-value pair in the form of a string -> { "user": "I am the user" }
            - cookies can also contain extra attributes to inform web browsers what they should do with the cookie
        - another working example:
            - when you log into a site, a cookie may be issued to you that identifies your account, confirming that you're logged in
            - when you interact with the website in the future, this cookue will act as confirmation that you're a user who's logged into the site
    
    TYPES OF COOKIES
        - session cookies are temporary and will only be stored in the memory of your browser while it's open
            - when ot's closed, the cookie will be removed from your browser's history which makes it a lower security risk

            - advantages of session cookies:
                - easy to use:
                    - straightforward mechanism for storing and managing session data
                    - they can be set and retrieved using browser APIs or server-side frameworks (nextJS)
                
                - backend responsibility:
                    - primary responsibility for session management lies with the backend, as it handles
                    tasks such as creating, validating, and storing session data
                    - the frontend only needs to interact w/ cookies to include the session ID in requests

                - no frontend logic:
                    - the frontend does not need to handle the complexities of session management logic, such
                    as session expiration or revocation
                    - this is handled by the backend

            - disadvanteges of session-cookie
                - Reliance on cookies:
                    - session management with cookies relies on the client's support for cookies
                    - if a user disables cookies in their browser, it can disrupt the session functionality
                        - to address this, alternative methods like URL re-writing or storing the session ID
                        in local storage can be used as fallback mechanisms

                - insecure and vulnerable to data theft:
                    - cookies, if not properly secured, can be vulnerable to attacks like cross-site request forgery (CSRF)
                    - it is crucial to implement security measures such as secure cookies, CSRF tokens, and validating requests to mitigate these risks and protect against data theft

                - increased server-side overhead
                    - storing session data on the server-side can impose additional overhead on the server, especially when managing a large number of active sessions
                    - this can impact server performance and scalability
                    - optimizations like efficient session storage mechanisms, caching, and load balancing can help mitigate these concerns

                - not mobile-friendly
                    - while cookies work well on mobile devices, certain mobile platforms or browser settings may habe limitations or different behaviors regarding cookie handling
                    - it's important to ensure compatibility and consider alternative approaches if necessary
                        - such as using device-specific storage mechanisms or adapting the session management strategy for mobile environments
            
            - use cases:
                - medium to large scale websites (not including mobile apps)
                - servers with limited budget
                    - session cookies can be a cost effective option for servers with limited budgets, as they don't require dedicated memory servers

        - persistent cookies are used over a much longer period of time, as an expiration date is tagged to them by the issuer
            - persistent cookies can essentially track what you're doing over more than one site, a greater security risk is posed by them
        - first-party cookies, help a website carry out a number of purposes, such as allowing you to add more than one item to your online order
            - disabling first-party cookies can make it difficult to use a website
        - third-party cookies are used by advertisers to track your movements across the web
            - these cookies are used to build up a profile of your interests and show you relevant ads on other sites
        
        although cookies play an important role there a number of threats posed by these, especially when it comes to the invasion of privacy and 
        the security of websites using them.

    COOKIES VULNERABILITIES ON THE WEB AND WHAT TO LOOK OUT FOR
        - Cookie Fraud
            - cookie fraud will either be a malicious website attacking another website by using legitimate uses as a proxy, or a legitimate user's activity
            being tagged with a false session ID for game tracking systems

            FOUR TYPES OF COOKIE FRAUD
                - cross-site scripting (XSS)
                    - a user will recieve a cookie after they've visited a malicious website
                    - the cookie contains a script payload that targets another website, but the malicious cookie is in disguise and looks as though
                        it's come from the website that's being targeted
                    - this vulnerability may be used by attackers to get past certain access controls like same-origin policy

                - session fixation
                    - a user will be given a malicious cookie that contains the session ID of the cookie's issuer
                    - then the innocent user goes to log into a domain that's being targeted, the user's session ID isn't logged but the cookies issuer's is
                    - this type of vulnerability takes over valid user sessions

                - cross-site request forgery attack (CSRF)
                    - a legitimate cookie is received by a user when they visit a legitimate site, however, they then visit a malicious site
                    - the malicious site will then send a request to the legitimate site, using the user's cookie to make it look like the request is coming from the user

                    - we can generate csrf tokens to handle this vulnerability

                - cookie tossing attack
                    - a user is provided with a cookie by a malicious site, which has been designed to look like it's come from the targeted sites subdomain
                        - when they user goes to the targeted site, all of the cookies are sent, including legitimate ones and the subdomain cookie
                        - where the cookie that's interpreted first is the subdomain, this data will overrule any of the legitimate data contained in the other valid cookeis

    - All of the vulnerability examples demonstrate that, in most cases of cookie fraud, cookies are being used to perform malicious actions using the legitimate user's identity, or to
    falsify a legitimate user's identity

---
    TOKEN AUTHENTICATION
        - session cookie authentication has several drawbacks, including the difficulty of maintaining it on the server-side
            - especially in distributed systems
        - this has led us to seek a more effective alternative that addresses these challenges

        - token authentication is a type of authentication that uses tokens to verify a user's identity
            - tokens are small pieces of data that are generated by the server and sent to the client
            - the client then stores the token and uses it to authenticate with the server when making requests

        WHAT IS A TOKEN?
            - when the client accesses the server, the server will issue a token for it after passing the verification
                - after that, the client can carry the token to access the server, and the server only needs to verify the validity of the token
            - in other words, it is a resource credential required when accessing resource APIs

            - a basic token consists of the following components:
                - unique user identifier -> uid
                - time stamp of the current time -> time
                - signature, fixed-length hexadecimal string using a hashing algorithm -> sign

        ADVANTAGES OF TOKENS:
            - stateless and scalable server:
                - the token mechanism eliminates the need to store session information on the server, as the token itself contains user-related information
                - allows for easy sharing of user status across multiple services

            - support for mobile devices:
                - tokens are compatible with APP mobile devices

            - enhanced security:
                - token effectively mitigate CSRF attacks since they do not rely on cookies

            - cross-program call support:
                - unlike cookies, tokens can be used for cross-domain access without issues
            
        
        DISADVANTAGES OF TOKENS:
            - the coordination requires:
                - token implementation requires coordination between the frontend and backend
            
            - bandwith consumption:
                - tokens typically have a larger size compared to session IDs, resulting in increased traffic and bandwidth usage
            
            - performance impact:
                - while token verification eliminates the need for a database or remote servivce access, it still requires operations such as encryption and decryption, which can impact performance

            - short validity period:
                - to minimize the risk of token theft, tokens are often set with shorter validity periods
                - refresh tokens are commonly used to address this issue

        
         WHAT IS A REFRESH TOKEN?
            - a token used for authorization in business interfaces are called an access token
                - it ensures security by setting a short expiration period for the access token to prevent unauthorized use
                - too-short of an expiration period leads to frequent token expiration

            - the solution to that problem is refresh the access token, which requires the user to log in again to obtain a new token
                - not the best approach

            - another solution is to introduce another token specifically designed for generating Access Tokens, known as a Refresh Token
                - access token:
                    - used to access business interfaces
                
                refresh token:
                    - used to obtain an access token
                    - can have a longer expiration period and is associated with a separate service and strict request requirements to enhance security
 
 ---

    JWT (JSON WEB TOKEN) AUTHENTICATION
        - In the previous section involving token authentication it is apparent that when the server validates the Token sent by the client, it needs to query the database to retrieve user information and verify the token's validity
        - this process of querying the database for each authentication request introduces delays and performances overhead

        WHAT IS JWT?
            - JWT is a solution proposed by Auth0 and other companies for authorization and authentication by encrypting and signing JSON data
            - after a successful login, relevant user information is assembled into a JSON object, which is then encrypted in a specific manner and returned to the client
            - the client subsequently includes this token in the next request
            - the client subsequently includes this Token in the next request

            COMPONENTS OF JWT
                - JWT consists of three parts:
                    - header:
                        - a header is like the top part of a message or document
                        - it contains important information about what the message is about or how it should be handled
                        - think of it as the label or the subject line that tells you what's inside or how to process it

                        - there are 2 parts in the header:
                            - typ: represents the type of Token, here is the JWT type
                            - alg: hash algorithm used, such as HMAC SHA256 or RSA
                                 {
                                    "alg": "HS256",
                                    "typ": "JWT"
                                }

                    - payload:
                        - contains claims, which are descriptions of entities, including user information and other metadata
                        - these claims are used to store the actual data that needs to be transmitted
                        - JWT defines 7 official fields:
                            - iss -> issuer of the token
                            - exp -> the time expiration of the token
                            - sub -> the subject of the token
                            - aud -> the intended audience of the token
                            - nbf -> the time before which the token is not valid
                            - iat -> the time at which the token was misused
                            - jti -> the unique identifier of the token

                            - can also provide private fields in this section

                    - signature
                        - this component is used to sign the previous two components, preventing data tampering
                        - firstly, a secret key needs to be specified
                            - this key is known only to the server and should not be disclosed to users
                        - then the specified signature algorithm from the Header (default is HMAC SHA256) is used to generate the signature according to the following formula

        HOW TO USE JWT?
            - the client recieves the JWT provided by the server, which can be stored in either cookie or the localstorage
            - whenever the client interacts with the server, it must include this JWT
            - while it can be automatically sent through cookies, this approach has limitations when it comes to cross-domain communication
                - it is preferable to include the JWT in the auth field of the HTTP header
                

        ADVANTAGES OF JWT
            - stateless:
                - JWTs adhere to the principles of statlessness in RESTful APIs, eliminating the need to store session information on the server-side
                    - allows for easy scalability and extension of the application, as there is no reliance on server-side session storage

            - efficient information exchange:
                - the payload in JWT can store commonly used information, reducing the need for the server to query the database repeatedly
                - by including necessary data in the JWT payload, the number of database queries can be minmized, resulting in improved performance and efficiency
        