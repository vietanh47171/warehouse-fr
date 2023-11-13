import styles from '@/app/styles/history.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import { sortByContext } from '@/app/store/mySortBy';

const cx = classNames.bind(styles);

const History = () => {
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
                const response = await fetch('http://localhost:8000/warehouse/history', {
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
            renderApiData = apiData.slice().reverse();
            break;
        default:
    }

    useEffect(() => {}, [renderApiData]);

    return (
        <div>
            <table className={cx('table')}>
                <thead>
                    <tr className={cx('first-row')}>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Quantity(kg)</th>
                        <th>Price (vnd/kg) </th>
                        <th>Value (vnd/kg) </th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {renderApiData && Array.isArray(renderApiData)
                        ? renderApiData.map((item: any, index: number) => {
                              if (item.status === 'Import') {
                                  return (
                                      <tr key={item._id} className={cx('import')}>
                                          <td>{item.date}</td>
                                          <td>{item.name}</td>
                                          <td>{item.status}</td>
                                          <td>{item.quantity}</td>
                                          <td>{item.price.toLocaleString('vi-VN')}</td>
                                          <td>{(item.quantity * item.price).toLocaleString('vi-VN')}</td>
                                          <td>sửa</td>
                                      </tr>
                                  );
                              } else {
                                  return (
                                      <tr key={item._id} className={cx('export')}>
                                          <td>{item.date}</td>
                                          <td>{item.name}</td>
                                          <td>{item.status}</td>
                                          <td>{item.quantity}</td>
                                          <td>{item.price.toLocaleString('vi-VN')}</td>
                                          <td>{(item.quantity * item.price).toLocaleString('vi-VN')}</td>
                                          <td>sửa</td>
                                      </tr>
                                  );
                              }
                          })
                        : null}
                </tbody>
            </table>
        </div>
    );
};

export default History;
