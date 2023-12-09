import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './loggedout-styles.css';

export default function AboutUsPage() {
  const [currentMember, setCurrentMember] = useState(1);

  const handleNextClick = () => {
    setCurrentMember((prevMember) => Math.min(prevMember + 1, 4));
  };

  const handlePrevClick = () => {
    setCurrentMember((prevMember) => Math.max(prevMember - 1, 1));
  };

  const geluMotto = `while (alive) {
    eat();
    sleep();
    code();
  }
`;

  return (
    <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'space-between' }}>
      <div className={`Member1 ${currentMember === 1 ? 'active' : 'inactive'}`} style={{ display: currentMember === 1 ? 'flex' : 'none', justifyContent: 'space-between' }}>
        <div className='lp-left'>
          <div className='au-logo' />
          <br/>
          <h3>ABOUT US</h3>
          <h1>Dawn Marie Gumagay</h1>

          <div style={{display:'flex'}}>
            <div className='about-div'>
              <div className='circle-icon'>
                <Icon icon="ri:user-settings-line" className='about-icon'/>
              </div>
              <div>
                <h3>Role</h3>
                <p>Team Leader, <br />UI/UX Designer, Developer</p>
              </div>
            </div>

            <div className='about-div'>
            <div className='circle-icon'>
            <Icon icon="ph:fire-bold" className='about-icon'/>
            </div>
            <div>
              <h3>Hobbies</h3>
              <p>Playing lawn and table tennis,<br/>
                painting, cooking, coding,<br/>
                sleeping, and reading books.
              </p>
            </div>
          </div>

          </div>

          <div className='about-div'>
            <div className='circle-icon'>
            <Icon icon="ion:chatbubble-ellipses-outline" className='about-icon'/>
            </div>
            <div>
              <h3>Motto</h3>
              <p>"Code with precision, innovate<br />with passion."</p>
            </div>
          </div>

          
        </div>
        <div className='lp-right' style={{textAlign:'center'}}>
          <p style={{ textAlign: 'right' }}>
            <Link to="/">WELCOME</Link>
            &nbsp;|&nbsp;
            <Link to="/ContactUsPage">CONTACT US</Link>
          </p>
          <br /><br /><br /><br />
          
          <div style={{ textAlign: 'center', width: '222px' }}>
            <div className='img-mem1' />
            <br />
            <div>
              <button onClick={handlePrevClick} disabled={currentMember === 1}>
                <Icon icon="bxs:left-arrow" className='about-arrow' />
              </button>
              <button onClick={handleNextClick} disabled={currentMember === 4}>
                <Icon icon="bxs:right-arrow" className='about-arrow' />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`Member2 ${currentMember === 2 ? 'active' : 'inactive'}`} style={{ display: currentMember === 2 ? 'flex' : 'none', justifyContent: 'space-between' }}>
        <div className='lp-left'>
          <div className='au-logo' />
          <br/>
          <h3>ABOUT US</h3>
          <h1>Gelu Marie Ursal</h1>

          <div style={{display:'flex'}}>
            <div className='about-div'>
              <div className='circle-icon'>
                <Icon icon="ri:user-settings-line" className='about-icon'/>
              </div>
              <div>
                <h3>Role</h3>
                <p>UI/UX Designer, Developer</p>
              </div>
            </div>
            <div className='about-div'>
              <div className='circle-icon'>
              <Icon icon="ph:fire-bold" className='about-icon'/>
              </div>
              <div>
                <h3>Hobbies</h3>
                <p>
                  Badminton, drawing,<br/> coding, cooking,<br/> watching movies, jogging.
                </p>
              </div>
            </div>
          </div>
          <div className='about-div'>
            <div className='circle-icon'>
            <Icon icon="ion:chatbubble-ellipses-outline" className='about-icon'/>
            </div>
            <div>
              <h3>Motto</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{geluMotto}</p>
            </div>
          </div>
        </div>
        <div className='lp-right' style={{ textAlign: 'center' }}>
          <p style={{ textAlign: 'right' }}>
            <Link to="/">WELCOME</Link>
            &nbsp;|&nbsp;
            <Link to="/ContactUsPage">CONTACT US</Link>
          </p>
          <br /><br /><br /><br />

          <div style={{ textAlign: 'center', width: '222px' }}>
            <div className='img-mem2' />
            <br />
            <div>
              <button onClick={handlePrevClick} disabled={currentMember === 1}>
                <Icon icon="bxs:left-arrow" className='about-arrow' />
              </button>
              <button onClick={handleNextClick} disabled={currentMember === 4}>
                <Icon icon="bxs:right-arrow" className='about-arrow' />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`Member3 ${currentMember === 3 ? 'active' : 'inactive'}`} style={{ display: currentMember === 3 ? 'flex' : 'none', justifyContent: 'space-between' }}>
        <div className='lp-left'>
          <div className='au-logo' />
          <br/>
          <h3>ABOUT US</h3>
          <h1>Marie Antoinette Paez</h1>

          <div style={{display:'flex'}}>
            <div className='about-div'>
              <div className='circle-icon'>
                <Icon icon="ri:user-settings-line" className='about-icon'/>
              </div>
              <div>
                <h3>Role</h3>
                <p>UI/UX Designer, Developer</p>
              </div>
            </div>
            <div className='about-div'>
              <div className='circle-icon'>
              <Icon icon="ph:fire-bold" className='about-icon'/>
              </div>
              <div>
                <h3>Hobbies</h3>
                <p>
                  Coding, drawing, graphic <br/>design,
                  video gaming, <br/>artistic merchandising.
                </p>
              </div>
            </div>
          </div>
          <div className='about-div'>
            <div className='circle-icon'>
            <Icon icon="ion:chatbubble-ellipses-outline" className='about-icon'/>
            </div>
            <div>
              <h3>Motto</h3>
              <p>"Code, Create, and Coffee"</p>
            </div>
          </div>
        </div>
        <div className='lp-right' style={{ textAlign: 'center' }}>
          <p style={{ textAlign: 'right' }}>
            <Link to="/">WELCOME</Link>
            &nbsp;|&nbsp;
            <Link to="/ContactUsPage">CONTACT US</Link>
          </p>
          <br /><br /><br /><br />

          <div style={{ textAlign: 'center', width: '222px' }}>
            <div className='img-mem3' />
            <br />
            <div>
              <button onClick={handlePrevClick} disabled={currentMember === 1}>
                <Icon icon="bxs:left-arrow" className='about-arrow' />
              </button>
              <button onClick={handleNextClick} disabled={currentMember === 4}>
                <Icon icon="bxs:right-arrow" className='about-arrow' />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`Member4 ${currentMember === 4 ? 'active' : 'inactive'}`} style={{ display: currentMember === 4 ? 'flex' : 'none', justifyContent: 'space-between' }}>
        <div className='lp-left'>
          <div className='au-logo' />
          <br/>
          <h3>ABOUT US</h3>
          <h1>Nathaniel Salvoro</h1>

          <div style={{display:'flex'}}>
            <div className='about-div'>
              <div className='circle-icon'>
                <Icon icon="ri:user-settings-line" className='about-icon'/>
              </div>
              <div>
                <h3>Role</h3>
                <p>UI/UX Designer, Developer</p>
              </div>
            </div>
            <div className='about-div'>
              <div className='circle-icon'>
              <Icon icon="ph:fire-bold" className='about-icon'/>
              </div>
              <div>
                <h3>Hobbies</h3>
                <p>
                  Watching movies, playing <br/>guitar
                  coding, video games<br/>
                </p>
              </div>
            </div>
          </div>
          <div className='about-div'>
            <div className='circle-icon'>
            <Icon icon="ion:chatbubble-ellipses-outline" className='about-icon'/>
            </div>
            <div>
              <h3>Motto</h3>
              <p>
                "Program with passion, <br/>debug with 
                determination, <br/>and always let your
                code <br/>tell a compelling story."
              </p>
            </div>
          </div>
        </div>
        <div className='lp-right' style={{ textAlign: 'center' }}>
          <p style={{ textAlign: 'right' }}>
            <Link to="/">WELCOME</Link>
            &nbsp;|&nbsp;
            <Link to="/ContactUsPage">CONTACT US</Link>
          </p>
          <br /><br /><br /><br />

          <div style={{ textAlign: 'center', width: '222px' }}>
            <div className='img-mem4' />
            <br />
            <div>
              <button onClick={handlePrevClick} disabled={currentMember === 1}>
                <Icon icon="bxs:left-arrow" className='about-arrow' />
              </button>
              <button onClick={handleNextClick} disabled={currentMember === 4}>
                <Icon icon="bxs:right-arrow" className='about-arrow' />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
