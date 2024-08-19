import './ReviewDaoInformation.scss';

function ReviewDaoInformation() {
  return (
    <div>
      <h2 className='input-title'>Review Dao Information</h2>
          <div className="review-container">
            
            <div className="review-content">
              <div className="info-row">
                <span className="label">Name:</span>
                <span className="value">Vara Nexus</span>
              </div>
              
              <div className="info-row">
                <span className="label">Description:</span>
                <span className="value">
                  Linda&#39;s flVara Nexus aims to be a critical component of the Vara ecosystem, driving innovation, efficiency, and interoperability in the Web3 space. By providing robust infrastructure and standardized development tools, Vara Nexus paves the way for a more dynamic and scalable blockchain environment.
                </span>
              </div>
              
              <div className="info-row">
                <span className="label">Token Name:</span>
                <span className="value">NexusCoin</span>
              </div>
              
              <div className="info-row">
                <span className="label">Token Symbol:</span>
                <span className="value">VEC</span>
              </div>
              
              <div className="info-row">
                <span className="label">Distribute list:</span>
                <div className="value">
                  <p>5Ct3GP....KBegF4 <span className='token-proportion'>[25%]</span> 25000000 VEC</p>
                  <p>5Ct3GP....KBegF4 <span className='token-proportion'>[25%]</span> 25000000 VEC</p>
                  <p>5Ct3GP....KBegF4 <span className='token-proportion'>[50%]</span> 25000000 VEC</p>
                </div>
              </div>
            </div>
            
            <div className='submit-container'>
            <button className="deploy-dao-button" >Deployed to Vara</button>
            </div>
            
          </div>
    </div>
    
  );
}

export { ReviewDaoInformation };
