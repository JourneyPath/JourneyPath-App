
const Contact = () => {
  return (
    <div className="contact-parent-wrapper">
      <div className="contact-about-section">
        <h1>About</h1>
        <p>hyperDrive is a project that two friends worked on to grow and demonstrate their skills.  Rob and Adam met at a coding boot camp in 2023 and quickly became friends, recognizing that they shared common interests (and common hates *cough* algos *cough*).  In July of 2023, they decided to partner together on a project through buildspace's Night & Weekends program (https://buildspace.so/) and build a tool that would help users be able to break through barriers when it came to making a plan to achieve a goal they set.  That's where hyperDrive came to life.  Using their backgrounds across various industries, Rob and Adam built a tool that leverages Artificial Intelligence and other web development technologies to enable users to have a smooth experience. </p>
      </div>
      <div className="contact-techstack-section">
        <h1>Technologies used for hyperDrive</h1>
        <div className="tech-stack-wrapper">
          <ul className="frontEnd-about">
              <h4>Front-end</h4>
              <div>
                <li>React</li>
                <li>Vite</li>
                <li>Firebase (Auth)</li>
                <li>CSS</li>
                <li>HTML</li>
              </div>
          </ul>
          <ul className="backEnd-about">
              <h4>Back-end</h4>
              <li>Node.js</li>
              <li>Vite</li>
              <li>Firebase (NoSQL Database)</li>
              <li>OpenAI APIs (Moderation API & GPT API)</li>
          </ul>
        </div>
      </div>
      <div className="contact-getintouch-section">
        <h1>Contact</h1>
        <p>Adam Green, Co-Builder</p>
        <p>Rob Hess, Co-Builder</p>
      </div>

    </div>
  )
}

export default Contact