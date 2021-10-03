import React from 'react';
import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import styled from 'styled-components';
// import action from '../../configs/redux/action';
import BottomSheet from '../BottomSheet';
import { Text } from '../Styled';

const SizeChartWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 0;
`;

const SizeChartHeader = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 1.5rem;
    border-bottom: 1px dashed #eee;

    p {
        width: 100%;
        flex-basis: 33%;
    }
`;

const SizeChartItem = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 5px 1.5rem;
    justify-content: space-between;

    p {
        width: 100%;
        flex-basis: 33%;
    }
`;

interface Props {
    sizes: any,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const SizeChartSheet = (props: Props) => {
    const { sizes, handler } = props;
    console.log(sizes);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     s
    // }, []);

    // const onCopyClick = () => {
    //     setTimeout(() => {
    //         handler(false);
    //     }, 250);
    // };

    return (
        <BottomSheet title="Informasi Ukuran" fullHeight handler={handler}>
            <SizeChartWrapper>
                <SizeChartHeader>
                    <Text alignCenter>Ukuran</Text>
                    <Text alignCenter>Panjang</Text>
                    <Text alignCenter>Lebar</Text>
                </SizeChartHeader>
                {sizes.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SizeChartItem key={idx}>
                        <Text extraSmall alignCenter>{i.name}</Text>
                        <Text extraSmall alignCenter>{i.chart.length}</Text>
                        <Text extraSmall alignCenter>{i.chart.width}</Text>
                    </SizeChartItem>
                ))}
            </SizeChartWrapper>
        </BottomSheet>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.productReducer.items
    };
};

export default connect(mapStateToProps)(SizeChartSheet);
