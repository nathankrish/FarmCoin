## Inspiration
The COVID-19 pandemic caused millions of farmers and small businesses in India to default on their loans. The lending industry in emerging countries like India is very predatory, which means that low-income people suffer the most during economic downturns when they cannot pay back loans. We hope to utilize technology to connect lenders and borrowers around the world and increase access to small loans.

## What it does
FarmCoin is a decentralized platform for small loans. Using our web application, Lenders can sign up for the platform and contribute money to lending pools. Borrowers can borrow from these pools and pay back their loans with interest. Borrowers build up their 'social credit' over time by gradually taking out larger loans and repaying them on time.

## How we built it
We developed our backend using Node.js and our frontend using React. Our backend server processes requests from the frontend and leverages APIs including Square Payments for repaying loans and Circle for converting bank ACH payments into USDC. We used the Square Customer API to keep track of individual borrowers and their payment information. We also deploy smart contracts using Solidity which manage the lending pools and loan contracts on the Ethereum blockchain.

## Challenges we ran into
We had difficulty with learning how to process payments in a secure manner using Square's Payment API. However, we were able to resolve this by utilizing Square's API documentation and working with existing examples.

## Accomplishments that we're proud of
We are proud of the progress that we made with converting digital payments into stablecoins such as USDC. We believe that decentralized finance is a huge opportunity to reduce wealth inequality. We hope to leverage technology in our lending platform to improve access to loans in emerging countries. In addition, we made great progress learning about smart contracts and developing contracts to manage our lending platform.

## What we learned
We learned a great deal about digital payments, blockchain, and smart contracts through this project. In specific, we learned how to securely interact with Square's payment APIs. We had a lot of fun learning how to deploy smart contracts written in Solidity onto a blockchain. We hope to continue learning about these technology areas, as they hold great potential for decentralized finance. Finally, we also learned a lot about the economics of small loans in emerging countries. 

## What's next for FarmCoin
We hope to continue developing our platform to connect lenders and borrowers across the world in a decentralized and seamless fashion.