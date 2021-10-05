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
    border-bottom: 1px solid #eee;

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
    border-bottom: 1px dashed #eee;
    &:nth-child(even){
        background: #f7f7f7;
    }

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
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     s
    // }, []);

    // const onCopyClick = () => {
    //     setTimeout(() => {
    //         handler(false);
    //     }, 250);
    // };

    const sizeXS = sizes.filter((i: any) => i.name.toUpperCase() === 'XS');
    const sizeS = sizes.filter((i: any) => i.name.toUpperCase() === 'S');
    const sizeM = sizes.filter((i: any) => i.name.toUpperCase() === 'M');
    const sizeL = sizes.filter((i: any) => i.name.toUpperCase() === 'L');
    const sizeXL = sizes.filter((i: any) => i.name.toUpperCase() === 'XL');
    const sizeXXL = sizes.filter((i: any) => i.name.toUpperCase() === 'sizeXXL');

    return (
        <BottomSheet title="Informasi Ukuran" fullHeight handler={handler}>
            <SizeChartWrapper>
                <SizeChartHeader>
                    <Text alignCenter>Ukuran</Text>
                    <Text alignCenter>Panjang (cm)</Text>
                    <Text alignCenter>Lebar (cm)</Text>
                </SizeChartHeader>
                {sizeXS.length > 0 && sizeXS.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SizeChartItem key={idx}>
                        <Text bold extraSmall alignCenter>{i.name}</Text>
                        <Text extraSmall alignCenter>{i.chart.length}</Text>
                        <Text extraSmall alignCenter>{i.chart.width}</Text>
                    </SizeChartItem>
                ))}
                {sizeS.length > 0 && sizeS.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SizeChartItem key={idx}>
                        <Text bold extraSmall alignCenter>{i.name}</Text>
                        <Text extraSmall alignCenter>{i.chart.length}</Text>
                        <Text extraSmall alignCenter>{i.chart.width}</Text>
                    </SizeChartItem>
                ))}
                {sizeM.length > 0 && sizeM.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SizeChartItem key={idx}>
                        <Text bold extraSmall alignCenter>{i.name}</Text>
                        <Text extraSmall alignCenter>{i.chart.length}</Text>
                        <Text extraSmall alignCenter>{i.chart.width}</Text>
                    </SizeChartItem>
                ))}
                {sizeL.length > 0 && sizeL.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SizeChartItem key={idx}>
                        <Text bold extraSmall alignCenter>{i.name}</Text>
                        <Text extraSmall alignCenter>{i.chart.length}</Text>
                        <Text extraSmall alignCenter>{i.chart.width}</Text>
                    </SizeChartItem>
                ))}
                {sizeXL.length > 0 && sizeXL.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SizeChartItem key={idx}>
                        <Text bold extraSmall alignCenter>{i.name}</Text>
                        <Text extraSmall alignCenter>{i.chart.length}</Text>
                        <Text extraSmall alignCenter>{i.chart.width}</Text>
                    </SizeChartItem>
                ))}
                {sizeXXL.length > 0 && sizeXXL.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SizeChartItem key={idx}>
                        <Text bold extraSmall alignCenter>{i.name}</Text>
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
