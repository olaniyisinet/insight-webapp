import React, {useContext} from 'react';
import { AuthedContext } from "../../../context/AuthedContext";
import tree from '../../../assets/tree.png'
import './GreetingBox.css';

const GreetingBox = ({statsSummary}) => {

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
            <div className='GreetingBox_Tenant'>
                Statistics for last day, {dateString}
            </div>
            <div className='GreetingBox_Greeting'>Wola , last day is</div>
            <div className='GreetingBox_TreeLine'>
                <div className='GreetingBox_Greeting'>another green day</div>
                <div className='GreetingBox_Tree'>
                    <img src={tree}  height="30" alt="tree"/>
                </div>
            </div>
            <div className='GreetingBox_Tagline'>You are consuming green energy as planned ...</div>
        </div>
    );
};

export default GreetingBox;