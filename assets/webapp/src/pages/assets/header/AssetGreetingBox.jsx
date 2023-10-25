import React, {useContext} from 'react';
import { AuthedContext } from "../../../context/AuthedContext";
import tree from '../../../assets/star.png'
import './AssetGreetingBox.css';

const AssetGreetingBox = ({statsSummary}) => {

    const { authedState } = useContext(AuthedContext);

    let iconStyles = {
        backgroundColor: authedState.tenantUser?.tenantIconBgColor,
        color: authedState.tenantUser?.tenantIconTextColor
    }
    
    let dateString = '';
    if(statsSummary.graphEndTime) {
        let date = new Date(statsSummary.graphStartTime);
        let dayStr = date.toLocaleString( 'default', { weekday: 'long'});
        let dateStr = date.toLocaleDateString();
        dateString = `${dateStr} ${dayStr}`
    }

    return (
        <div className='GreetingBox'>
            <div className='GreetingBox_Greeting'>Holla, today is</div>
            <div className='GreetingBox_TreeLine'>
                <div className='GreetingBox_Greeting'>another positive day</div>
                <div className='GreetingBox_Tree'>
                    <img src={tree}  height="30" alt="tree"/>
                </div>
            </div>
            <div className='GreetingBox_Tagline'>You assets are producing energy as planned... </div>
            <div className='GreetingBox_Tagline'>
                Last update on, {dateString}
            </div>
        </div>
    );
};

export default AssetGreetingBox;