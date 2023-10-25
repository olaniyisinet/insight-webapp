import React from 'react'
import logoFull from '../../assets/logo_full.png'
import logoShrinked from '../../assets/logo_shrinked.png'
import './MenuLogo.css'

const MenuLogo = ({collapsed}) => {

    return (
     <>
        { !collapsed &&
          <div className='MenuLogo'>
             <img src={logoFull}  height="36" alt="logo" className='MenuLogo_Icon'/>
              <div style={{color: "white", paddingTop: 6, paddingLeft: 7, fontSize: 18, fontWeight: "bolder"}}>Insights</div>
           </div>
        }
        { collapsed &&
          <div className='MenuLogo'>
             <img src={logoShrinked}  height="36" alt="logo" className='MenuLogo_Icon'/>
           </div>
        }
     </>
    );
};

export default MenuLogo;