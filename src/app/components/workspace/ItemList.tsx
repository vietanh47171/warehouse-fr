import styles from '@/app/styles/itemList.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { sortByContext } from '@/app/store/mySortBy';
import { X, Pencil } from 'lucide-react';
import { log } from 'console';

const cx = classNames.bind(styles);

const ItemList = () => {
    const { sortByData, setSortByData } = useContext(sortByContext);
    const [on, setOn] = useState(false);

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
    const [apiIdData, setApiIdData] = useState({
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
    });
    const [inputValue, setInputValue] = useState('');
    let renderApiData;

    async function fetchIdData(_id: any) {
        try {
            const response = await fetch(`http://localhost:8000/warehouse/product/${_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Thay đổi kiểu dữ liệu nếu cần
                },
            });
            if (!response.ok) {
                throw new Error(`Gọi API thất bại với mã lỗi ${response.status}`);
            }
            const jsonData = await response.json();
            setApiIdData(jsonData);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }
    async function patchPriceData(_id: any, updatedData: any) {
        try {
            const response = await fetch(`http://localhost:8000/warehouse/product/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', // Thay đổi kiểu dữ liệu nếu cần
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error(`Gọi API thất bại với mã lỗi ${response.status}`);
            }
            const data = await response.json();
            // Xử lý dữ liệu trả về từ máy chủ sau khi cập nhật
            console.log('Dữ liệu đã được cập nhật:', data);
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu PATCH:', error);
        }
    }

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

    useEffect(() => {
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

    const handleClose = () => {
        setOn(false);
    };

    const handlePrice = (event: any) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };

    const handleSubmit = (e: any) => {
        const updatedData = {
            price: inputValue,
        };
        patchPriceData(apiIdData._id, updatedData);
        setOn(false);
        fetchData();
        e.preventDefault();
    };

    useEffect(() => {}, [renderApiData]);
    useEffect(() => {}, [sortByData]);
    useEffect(() => {}, [apiData]);
    useEffect(() => {}, [apiDataRender]);
    console.log('re-rendered');

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
                        <th>price adjustment</th>
                    </tr>
                </thead>
                <tbody>
                    {renderApiData && Array.isArray(renderApiData)
                        ? renderApiData.map((item: any, index: number) => {
                              const handlePencilClick = () => {
                                  fetchIdData(item._id);
                                  setOn(true);
                              };
                              return (
                                  <tr key={item._id}>
                                      <td>{index + 1}</td>
                                      <td>{item.vietnameseName}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.price.toLocaleString('vi-VN')}</td>
                                      <td>{(item.quantity * item.price).toLocaleString('vi-VN')}</td>
                                      <td>
                                          <div>
                                              <Pencil strokeWidth={2} onClick={handlePencilClick} />
                                          </div>
                                      </td>
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </table>
            {on ? (
                <div className={cx('change-price')}>
                    <div onClick={handleClose}>
                        <X />
                    </div>
                    <h1>Price Adjustment</h1>
                    <h2>Product : {apiIdData.name.toUpperCase()}</h2>
                    <h2>
                        Price : <input type="number" onChange={handlePrice} />
                    </h2>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            ) : undefined}
        </div>
    );
};

export default dynamic(() => Promise.resolve(ItemList), { ssr: false });
