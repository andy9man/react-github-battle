import React from 'react';
import {CustomNav} from './helper'

export const Navigation = props => {
    return (
        <nav style={props.style}>
            <ul className="tabs padding-bottom-medium">
                <CustomNav to='/' label='Battle' generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to='/rankings' label='Rankings' generalClassName="tab-title" activeOnlyWhenExact={true} />
            </ul>
        </nav>
    )
}
