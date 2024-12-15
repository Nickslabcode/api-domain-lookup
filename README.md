# Domain Lookup API  

A lightweight and serverless Express API designed for AWS Lambda with API Gateway, for the project [Domain Lookup](https://github.com/Nickslabcode/domain-info-lookup). It provides essential tools for domain and website diagnostics, including WHOIS data retrieval, CDN detection, and WordPress installation checks.  

## Features  

- **WHOIS Lookup**: Fetches domain WHOIS information using the `whois` Node.js library.  
- **CDN Check**: Inspects a website's response headers to detect the presence of a Content Delivery Network (CDN).  
- **WordPress Check**: Verifies if a WordPress installation is present on the specified domain.  

## Tech Stack  

- **JavaScript**  
- **Express**  
- **Fetch API**  
- **AWS Lambda with API Gateway**  
