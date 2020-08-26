import React from 'react';
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton";


const ToolTipBtn = ({children, tip, onClick, btnClassName, tipClassName, placement }) =>  (
    <Tooltip title={tip} className={tipClassName}  placement={placement}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)

export default ToolTipBtn;
