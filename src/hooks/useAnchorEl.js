import { useState, useCallback } from 'react';

const useAnchorEl = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    return {
        anchorEl,
        handleClick,
        handleClose,
    };
};

export default useAnchorEl;
