import styles from '@/app/styles/itemList.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { sortByContext } from '@/app/store/mySortBy';

const cx = classNames.bind(styles);

const ItemList = () => {
    const { sortByData, setSortByData } = useContext(sortByContext);
    const [apiData, setApiData] = useState([
        {
            _id: 'loaidng',
            name: 'loading',
            vietnameseName: 'loading',
            quantity: 0,
            price: 0,
            __v: 0,
            desc: 'loading',
            from: 'loading',
            supplier: 'unknown',
            img: '',
        },
    ]);
    const [apiDataRender, setApiDataRender] = useState([
        {
            _id: 'loaidng',
            name: 'loading',
            vietnameseName: 'loading',
            quantity: 0,
            price: 0,
            __v: 0,
            desc: 'loading',
            from: 'loading',
            supplier: 'unknown',
            img: '',
        },
    ]);
    let renderApiData;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8000/warehouse/product', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // Thay đổi kiểu dữ liệu nếu cần
                    },
                });
                if (!response.ok) {
                    throw new Error(`Gọi API thất bại với mã lỗi ${response.status}`);
                }
                const jsonData = await response.json();
                setApiData(jsonData.slice());
                setApiDataRender(jsonData);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }

        fetchData();
    }, []); // [] để đảm bảo chỉ gọi API một lần khi component được tải

    switch (sortByData) {
        case 'price':
            renderApiData = apiDataRender.sort((a: any, b: any) => b.price - a.price);
            break;
        case 'value':
            renderApiData = apiDataRender.sort((a: any, b: any) => b.quantity * b.price - a.quantity * a.price);
            break;
        case 'quantity':
            renderApiData = apiDataRender.sort((a: any, b: any) => b.quantity - a.quantity);
            break;
        case '':
            renderApiData = apiData.slice();
            break;
        default:
    }

    useEffect(() => {}, [renderApiData]);
    useEffect(() => {}, [sortByData]);

    return (
        <div>
            <table className={cx('table')}>
                <thead>
                    <tr className={cx('first-row')}>
                        <th>ItemList Number</th>
                        <th>Name</th>
                        <th>Quantity(kg)</th>
                        <th>Price(vnd/kg)</th>
                        <th>Total Value (vnd/kg) </th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {renderApiData && Array.isArray(renderApiData)
                        ? renderApiData.map((item: any, index: number) => {
                              return (
                                  <tr key={item._id}>
                                      <td>{index + 1}</td>
                                      <td>{item.vietnameseName}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.price.toLocaleString('vi-VN')}</td>
                                      <td>{(item.quantity * item.price).toLocaleString('vi-VN')}</td>
                                      <td>sửa</td>
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </table>
        </div>
    );
};

export default dynamic(() => Promise.resolve(ItemList), { ssr: false });
