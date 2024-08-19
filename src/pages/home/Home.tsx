import { Wallet } from '@/features/wallet';
import './Home.scss';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const handleBuildDaoClick = () => {
    navigate('/build-dao');
  };

  return (
    <div className="home-container">
      {/* <header className="header">
      <div className="logo">Nexus</div>
      <nav>
        <a href="/create">Create your DAO</a>
        <a href="/explore">Explore DAOs</a>
      </nav>
      <Wallet />
    </header> */}

      <main>
        <section className="intro">
          <h1>Nexus DAO</h1>
          <p>
            is a decentralized autonomous organization designed to operate independently within the Vara ecosystem, 
            offering a robust and secure governance structure tailored to meet the needs of decentralized projects and communities.
          </p>
          <button className="build-dao-button" onClick={handleBuildDaoClick}>▲ Build your DAO ▲</button>
        </section>

        <section className="features">
          <div className="feature-box">
            <h3>Getting Started</h3>
            <p>How to get started with essential steps to begin using the product or service.</p>
            <a href="https://outgoing-kiss-988.notion.site/Getting-Started-b007f8c3e48b402384312f254af75e5b">Learn more ➤</a>
          </div>
          <div className="feature-box">
            <h3>Participating in Governance</h3>
            <p>How to participate in governance by creating proposals and casting votes within the DAO.</p>
            <a href="https://outgoing-kiss-988.notion.site/Participating-in-Governance-b29431817702404190634cb4300d5354">Learn more ➤</a>
          </div>
          <div className="feature-box">
            <h3>Managing Assets</h3>
            <p>How to manage assets by overseeing the DAO’s treasury, allocating funds, and tracking financial transactions.</p>
            <a href="https://outgoing-kiss-988.notion.site/Managing-Assets-19f65ab834344c7ca8f6e17b90f0a64e">Learn more ➤</a>
          </div>
        </section>

        <section className="nexus-kit">
          <h2>Nexus Kit</h2>
          <p>
            The entire project is developed using the Sails framework, with an abstracted interface and implementation library called NexusKit. NexusKit provides standardized resources and tools for developers, making it easier to build and integrate NexusDAO applications within the Vara ecosystem.
          </p>
          <button disabled className="coming-soon">Come soon</button>
        </section>

        <section className="nexus-netlink">
          <h2>Nexus NetLink</h2>
          <p>
            In addition to its core functionalities, Vara Nexus offers the NexusNetLinks solution, which facilitates external interaction with Vara Nexus. Through NexusNetLinks, ecosystem participants can quickly deploy or invoke services on the Vara network, ensuring seamless integration and enhancing the overall flexibility of the system.
          </p>
          <button disabled className="coming-soon">Come soon</button>
        </section>
      </main>

      {/* <footer>
        <div className="footer-links">
          <a href="/vara-network">Vara Network</a>
          <a href="/dao-wiki">Dao Wiki</a>
          <a href="/nexus-tokenomics">Nexus Tokenomics</a>
          <a href="/nexus-whitepaper">Nexus Whitepaper</a>
        </div>
      </footer> */}
    </div>
  );
}

export { Home };
