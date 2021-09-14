import React from 'react';

interface Props {
    children: any
}

const Blog = (props: Props) => {
    const { children } = props;
    return (
        <>
            {children}
        </>
    );
};

export default Blog;
