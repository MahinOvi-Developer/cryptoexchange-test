export default function CryptocurrencyInfo() {
    return (
        <div className="flex flex-col items-center justify-center p-5">
            <h1 className="text-[40px] text-white w-full text-center mb-3">What is Cryptocurrency and How Does it Work?</h1>

            <h2 className="text-[32px] text-white mb-3">Blockchain Technology</h2>
            <p className="text-[#E5E8EA] text-[18px] text-center my-5 w-full max-w-[987px]">
                At the heart of cryptocurrency is blockchain technology—a distributed ledger that records all transactions across a network of computers. Each transaction is grouped into a "block,"
                which is then linked to the previous block, forming a "chain" of blocks. This structure ensures that once a transaction is recorded, it cannot be altered, providing a high level of
                security and transparency. Every participant in the network has a copy of the blockchain, making it nearly impossible for any single entity to manipulate the data.
            </p>

            <h2 className="text-[32px] text-white mb-3">Decentralization</h2>
            <p className="text-[#E5E8EA] text-[18px] text-center my-5 w-full max-w-[987px]">
                Traditional financial systems rely on centralized authorities like banks to validate and record transactions. In contrast, cryptocurrency operates on a decentralized network of nodes
                (computers) that collectively validate and record transactions. This decentralization reduces the risk of a single point of failure and gives more control to individual users over
                their assets.
            </p>

            <h2 className="text-[32px] text-white mb-3">Cryptography and Security</h2>
            <p className="text-[#E5E8EA] text-[18px] text-center my-5 w-full max-w-[987px]">
                Cryptocurrencies use cryptographic techniques to secure transactions and control the creation of new units. For example, Bitcoin, the first and most well-known cryptocurrency, uses a
                method called "proof of work," where miners (participants who validate transactions) solve complex mathematical problems to add new blocks to the blockchain. This process is secure and
                ensures that transactions are legitimate.
            </p>

            <h2 className="text-[32px] text-white mb-3">Public and Private Keys</h2>
            <p className="text-[#E5E8EA] text-[18px] text-center my-5 w-full max-w-[987px]">
                To use cryptocurrency, you need a digital wallet, which stores your public and private keys. The public key is like your bank account number—it's used to receive funds. The private key
                is like your password—it's used to sign transactions and access your funds. It’s crucial to keep your private key secure because anyone with access to it can control your
                cryptocurrency.
            </p>

            <h2 className="text-[32px] text-white mb-3">Transactions and Mining</h2>
            <p className="text-[#E5E8EA] text-[18px] text-center my-5 w-full max-w-[987px]">
                When you send cryptocurrency to someone, the transaction is broadcast to the entire network, where miners validate it by solving cryptographic puzzles. Once validated, the transaction
                is added to the blockchain, and the recipient receives the funds. This process is known as mining, and miners are rewarded with new cryptocurrency tokens for their efforts.
            </p>

            <h2 className="text-[32px] text-white mb-3">Supply and Demand</h2>
            <p className="text-[#E5E8EA] text-[18px] text-center my-5 w-full max-w-[987px]">
                Most cryptocurrencies have a limited supply, which is controlled by their underlying code. For instance, Bitcoin has a maximum supply of 21 million coins. This scarcity, combined with
                demand from users, influences the value of the cryptocurrency. As more people buy and use cryptocurrency, the demand increases, which can drive up its price.
            </p>

            <h2 className="text-[32px] text-white mb-3">Why Cryptocurrencies Matter</h2>
            <p className="text-[#E5E8EA] text-[18px] text-center my-5 w-full max-w-[987px]">
                Cryptocurrencies offer several advantages over traditional money and payment systems. They enable fast, low-cost transactions across borders, without the need for intermediaries like
                banks. This is particularly useful in regions with unstable financial systems, where access to traditional banking is limited. Additionally, because cryptocurrencies are not tied to
                any government, they are resistant to inflation and political interference.
            </p>

            <h2 className="text-[32px] text-white mb-3">The Advantages and Risks of Investing in Cryptocurrency</h2>
            <h3 className="text-[28px] text-white mb-3">Advantages:</h3>
            <ul className="text-[#E5E8EA] text-[18px] list-disc pl-10 mb-5">
                <li>
                    <strong>High Return Potential:</strong> Cryptocurrencies have demonstrated the potential for substantial returns on investment.
                </li>
                <li>
                    <strong>Diversification:</strong> Cryptocurrencies offer a new asset class for investors looking to diversify their portfolios.
                </li>
                <li>
                    <strong>Accessibility and Inclusion:</strong> Cryptocurrencies are accessible to anyone with an internet connection, promoting financial inclusion.
                </li>
                <li>
                    <strong>Transparency and Security:</strong> The blockchain technology of cryptocurrencies provides transparency and security.
                </li>
                <li>
                    <strong>Innovation and Growth Potential:</strong> The cryptocurrency space is home to ongoing technological advancements and innovative projects.
                </li>
            </ul>

            <h3 className="text-[28px] text-white mb-3">Risks:</h3>
            <ul className="text-[#E5E8EA] text-[18px] list-disc pl-10 mb-5">
                <li>
                    <strong>High Volatility:</strong> Cryptocurrencies are known for their extreme price volatility.
                </li>
                <li>
                    <strong>Regulatory Uncertainty:</strong> The regulatory environment for cryptocurrencies is still evolving.
                </li>
                <li>
                    <strong>Security Risks:</strong> The broader ecosystem of cryptocurrency exchanges, wallets, and platforms can be vulnerable to hacks.
                </li>
                <li>
                    <strong>Lack of Consumer Protections:</strong> Unlike traditional financial systems, cryptocurrencies are often not covered by consumer protection regulations.
                </li>
                <li>
                    <strong>Market Manipulation and Fraud:</strong> The cryptocurrency market can be susceptible to market manipulation and fraudulent schemes.
                </li>
            </ul>

            <h2 className="text-[32px] text-white mb-3">Understanding Blockchain</h2>
            <p className="text-[#E5E8EA] text-[18px] text-center my-5 w-full max-w-[987px]">
                Blockchain is a foundational technology behind many cryptocurrencies and has applications beyond digital currencies. It’s a decentralized and distributed ledger system that records
                transactions across a network of computers in a secure and transparent way.
            </p>

            <h2 className="text-[32px] text-white mb-3">Key Components of Blockchain</h2>
            <ul className="text-[#E5E8EA] text-[18px] list-disc pl-10 mb-5">
                <li>
                    <strong>Blocks:</strong> A blockchain is composed of a series of "blocks," each containing a list of transactions.
                </li>
                <li>
                    <strong>Chain:</strong> The blocks are linked together in a sequential chain.
                </li>
                <li>
                    <strong>Distributed Ledger:</strong> The blockchain is distributed across a network of nodes (computers).
                </li>
                <li>
                    <strong>Consensus Mechanisms:</strong> To validate and add new transactions to the blockchain, the network uses a consensus mechanism.
                </li>
                <li>
                    <strong>Cryptography:</strong> Cryptography plays a crucial role in blockchain technology.
                </li>
            </ul>

            <h2 className="text-[32px] text-white mb-3">How Blockchain Works</h2>
            <ul className="text-[#E5E8EA] text-[18px] list-disc pl-10 mb-5">
                <li>
                    <strong>Transaction Initiation:</strong> A transaction is initiated when a participant requests to add new data to the blockchain.
                </li>
                <li>
                    <strong>Transaction Verification:</strong> The transaction is broadcast to the network, where nodes verify its validity.
                </li>
                <li>
                    <strong>Block Creation:</strong> Once verified, the transaction is combined with other verified transactions into a new block.
                </li>
                <li>
                    <strong>Consensus and Addition:</strong> The nodes use the consensus mechanism to agree on the validity of the new block.
                </li>
                <li>
                    <strong>Immutability and Security:</strong> The newly added block is securely linked to the previous block.
                </li>
            </ul>

            <h2 className="text-[32px] text-white mb-3">Benefits of Blockchain</h2>
            <ul className="text-[#E5E8EA] text-[18px] list-disc pl-10 mb-5">
                <li>
                    <strong>Transparency:</strong> Transactions recorded on the blockchain are visible to all participants in the network.
                </li>
                <li>
                    <strong>Security:</strong> The decentralized and cryptographic nature of blockchain makes it highly secure.
                </li>
                <li>
                    <strong>Decentralization:</strong> Blockchain removes the need for central authorities, reducing points of failure.
                </li>
                <li>
                    <strong>Efficiency:</strong> Blockchain can streamline processes and reduce intermediaries.
                </li>
                <li>
                    <strong>Traceability:</strong> Each transaction is recorded and can be traced back to its origin.
                </li>
            </ul>

            <h2 className="text-[32px] text-white mb-3">Challenges and Future of Blockchain</h2>
            <p className="text-[#E5E8EA] text-[18px] text-center my-5 w-full max-w-[987px]">
                While blockchain technology has significant potential, it also faces challenges such as scalability, energy consumption, and regulatory hurdles. The future of blockchain will likely
                involve advancements in technology and its integration into various sectors beyond cryptocurrency.
            </p>
        </div>
    );
}
