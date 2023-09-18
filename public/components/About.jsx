import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons';

const About = () => {

  return (
    <div className="contact-parent-wrapper">
      <div className="contact-about-section">
        <h1>About</h1>
        <p>hyperDrive is a project that two friends worked on to grow and demonstrate their skills.  Rob and Adam met at a coding boot camp in 2023 and quickly became friends, recognizing that they shared common interests (and common hates *cough* algos *cough*).  In July of 2023, they decided to partner together on a project through <a href="https://buildspace.so/" target="_blank" rel="noopener noreferrer">buildspace's</a>  Night & Weekends program and build a tool that would help users be able to break through barriers when it came to making a plan to achieve a goal they set.  That's where hyperDrive came to life.  Using their backgrounds across various industries, Rob and Adam built a tool that leverages Artificial Intelligence and other web development technologies to enable users to have a smooth experience making an action plan for the goals they set. 
        </p>
      </div>
      <div className="contact-techstack-section">
        <h1 className="techstack-title">Technologies used for hyperDrive</h1>
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
        
        <div className='contact-wrapper'>
          <div className='ag-contact'>
            <p>Adam Green <span className='contact-role'>Co-Builder</span></p>
            <div className='ag-contact-links'>
              <Link to='https://www.linkedin.com/in/agreen01/' className="bioLink-LI"><FontAwesomeIcon icon={faLinkedin} /></Link>
              <Link to='https://github.com/agreen8911' className="bioLink-GH"><FontAwesomeIcon icon={faGithub} /></Link>
            </div>
          </div>

          <div className='rh-contact'>
            <p>Rob Hess <span className='contact-role'>Co-Builder</span></p>
            <div className='rh-contact-links'>
              <Link to='https://www.linkedin.com/in/r-hess/' className="bioLink-LI"><FontAwesomeIcon icon={faLinkedin} /></Link>
              <Link to='https://github.com/HRM0' className="bioLink-GH"><FontAwesomeIcon icon={faGithub} /></Link>
            </div>        
          </div>
        </div>
      </div>

    </div>
  )
}

export default About