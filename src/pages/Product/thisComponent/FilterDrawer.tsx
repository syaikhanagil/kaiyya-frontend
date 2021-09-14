import React from 'react';
import Drawer from '../../../components/Drawer';

interface Props {
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const FilterDrawer = (props: Props) => {
    const { handler } = props;

    return (
        <Drawer handler={handler}>
            Hay
        </Drawer>
    );
};

export default FilterDrawer;
