import React from 'react';
import ButtonUp from './ButtonUp';



function Footer () {

    return(
        <div>
            <div className='footer-main'>
                <h2>푸터 메인</h2>
                <div className='btn-up'>
                    <ButtonUp/>

                </div>
                <div className='copyrightBox'>
                    <p>&copy; 2023 React WebSite. All rights reserved</p>
                </div>
            </div>
            
        </div>
    )

}

export default Footer;