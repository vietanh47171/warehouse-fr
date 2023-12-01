import React from 'react';
import classNames from 'classnames/bind';
import styles from '@/app/styles/export.module.scss';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Scale from '../utilsComponents/Scale';
import { productApiDataContext } from '@/app/store/myProduct';

const cx = classNames.bind(styles);

const Export = () => {
    const [weight, setWeight] = useState(0);
    const [product, setProduct] = useState('rice');
    const { productApiData, setProductApiData } = useContext(productApiDataContext);
    const [apiData, setApiData] = useState<any | null>(null);
    const [apiIdData, setApiIdData] = useState({
        _id: 'loading',
        name: 'loading',
        vietnameseName: 'loading',
        quantity: NaN,
        price: NaN,
        __v: 0,
    });
    const handleWeightChange = (newWeight: any) => {
        setWeight(newWeight);
    };

    const handleSelectChange = (e: any) => {
        setProduct(e.target.value);

        const nameToFind = e.target.value;

        const foundItem = apiData.find((item: any) => item.name === nameToFind);

        fetchDataId(foundItem._id);
    };

    const handleButtonClick = (e: any) => {
        const currentDate = new Date();
        const currentDay = currentDate.getDate(); // Lấy ngày hiện tại (1-31)
        const currentMonth = currentDate.getMonth() + 1; // Lấy tháng hiện tại (0-11, nên cộng thêm 1)
        const currentYear = currentDate.getFullYear(); // Lấy năm hiện tại (đầy đủ 4 chữ số)
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        const updatedData = {
            quantity: apiIdData.quantity - weight,
        };
        const historyData = {
            name: apiIdData.vietnameseName,
            status: 'Export',
            quantity: weight,
            price: apiIdData.price,
            date: `${hours}:${minutes} ngày ${currentDay}/${currentMonth}/${currentYear}`,
        };

        async function patchData() {
            try {
                const response = await fetch(`http://localhost:8000/warehouse/product/${apiIdData._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });

                if (!response.ok) {
                    throw new Error(`Gửi yêu cầu thất bại với mã lỗi ${response.status}`);
                }

                const data = await response.json();
                // Xử lý dữ liệu trả về từ máy chủ sau khi cập nhật
                console.log('Dữ liệu đã được cập nhật:', data);
            } catch (error) {
                console.error('Lỗi khi gửi yêu cầu PATCH:', error);
            }
        }

        async function postHistoryData() {
            try {
                const response = await fetch(`http://localhost:8000/warehouse/history`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(historyData),
                });

                if (!response.ok) {
                    throw new Error(`Gửi yêu cầu thất bại với mã lỗi ${response.status}`);
                }

                const data = await response.json();
                // Xử lý dữ liệu trả về từ máy chủ sau khi cập nhật
                console.log('Dữ liệu đã được cập nhật:', data);
            } catch (error) {
                console.error('Lỗi khi gửi yêu cầu PATCH:', error);
            }
        }

        if (weight > 0.5) {
            toast.success('🦄 Đã cập nhật giao dịch thành công và lưu lại trong lịch sử !', {
                position: 'top-center',
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            patchData();
            fetchDataId(apiIdData._id);
            postHistoryData();
        } else {
            toast.error('🦄 Cân nặng không hợp lệ theo yêu cầu ( weight > 0.5kg) !', {
                position: 'top-center',
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
        e.preventDefault();
        console.log(historyData);
    };

    //Lấy data theo id
    async function fetchDataId(id: any) {
        try {
            const response = await fetch(`http://localhost:8000/warehouse/product/${id}`, {
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
            setProductApiData(jsonData);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

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
                setApiData(jsonData);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }

        fetchData();
    }, []); // [] để đảm bảo chỉ gọi API một lần khi component được tải

    useEffect(() => {
        fetchDataId('65425ec7c36ee8f46692ef7d');
    }, []);

    return (
        <div className={cx('export')}>
            <div className={cx('main-content')}>
                <form action="" className={cx('form-container')}>
                    <div className={cx('input-container')}>
                        <label htmlFor="products" className={cx('input-choose')}>
                            Choose a product : &ensp;
                        </label>
                        <select onChange={handleSelectChange} className={cx('input-product')}>
                            <optgroup label="Foods">
                                {apiData
                                    ? apiData.map((item: any) => {
                                          return <option value={item.name}>{item.name.toUpperCase()}</option>;
                                      })
                                    : undefined}
                            </optgroup>
                        </select>
                    </div>
                    <div className={cx('product-container')}>
                        <div className={cx('product-info')}>
                            <div className={cx('title')}>
                                <h1>{product}</h1>
                            </div>
                            <table className={cx('table')}>
                                <tbody>
                                    <tr>
                                        <th>Remaining Goods(kg)</th>
                                        <td>{Number(apiIdData.quantity).toFixed(2)} kg</td>
                                    </tr>
                                    <tr>
                                        <th>Price (vnd/kg)</th>
                                        <td>{apiIdData.price.toLocaleString('vi-VN')} vnd/kg</td>
                                    </tr>
                                    <tr>
                                        <th>Value (vnd)</th>
                                        <td>{(apiIdData.quantity * apiIdData.price).toLocaleString('vi-VN')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Scale onWeightChange={handleWeightChange} />
                    </div>
                    <div className={cx('export-btn-container')}>
                        <button className={cx('export-btn')} onClick={handleButtonClick}>
                            Export
                        </button>
                        <ToastContainer />
                    </div>
                </form>
            </div>
            <div className={cx('main-img')}>
                {product === 'rice' ||
                product === 'potato' ||
                product === 'cassava' ||
                product === 'sweetpotato' ||
                product === 'wheat' ||
                product === 'oat' ? (
                    <img src={`assets/productImg/${product}.jpg`} alt="" />
                ) : (
                    <img src={productApiData.img} alt="" />
                )}
            </div>
        </div>
    );
};

export default Export;
