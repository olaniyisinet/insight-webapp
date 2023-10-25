import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './HeaderTenant.css';

const HeaderTenant = ({tenantUser}) => {

    let iconStyles = {
        backgroundColor: tenantUser?.tenantIconBgColor,
        color: tenantUser?.tenantIconTextColor
    }

    const isNotMobile = useMediaQuery({ query: '(min-width: 768px)' });

    return (
        <div className="HeaderTenant">
          { tenantUser &&
            <>
              <div className='HeaderTenant_CompanyIcon' style={iconStyles}>
                { tenantUser.tenantNameShort }
              </div>
              { isNotMobile && 
                <div className='HeaderTenant_CompanyName'>
                  {tenantUser.tenantNameFull}
                </div>
              }
            </>
          }
        </div>
    );
};

export default HeaderTenant;