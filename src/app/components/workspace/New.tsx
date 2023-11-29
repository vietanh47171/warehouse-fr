import classNames from 'classnames/bind';
import styles from '@/app/styles/new.module.scss';
import { useState, useEffect, useContext } from 'react';
import Scale from '../utilsComponents/Scale';
import { ToastContainer, toast } from 'react-toastify';
import React, { useRef } from 'react';
import { productApiDataContext } from '@/app/store/myProduct';

const cx = classNames.bind(styles);

const New = () => {
    const [weight, setWeight] = useState(0);
    const [englishName, setEnglishName] = useState<string>('');
    const [vietnameseName, setVietnameseName] = useState<string>('');
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [supplier, setSupplier] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const formRef = useRef<HTMLFormElement | null>(null);
    const { productApiData, setProductApiData } = useContext(productApiDataContext);
    const [preivew, setPreview] = useState(true);

    async function postProductData() {
        try {
            const response = await fetch(`http://localhost:8000/warehouse/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productApiData),
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

    const handleSubmit = (e: React.FormEvent) => {
        if (weight >= 2) {
            setProductApiData({
                name: englishName,
                vietnameseName: vietnameseName,
                price: price,
                desc: description,
                from: origin,
                supplier: supplier,
                img: img,
                quantity: weight,
            });
            setPreview(false);
        } else {
            toast.error('🦄 Cân nặng sai yêu cầu !', {
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

        if (!preivew && weight > 2) {
            console.log(JSON.stringify(productApiData));
            postProductData();
            setProductApiData({
                name: '',
                vietnameseName: '',
                price: '',
                desc: '',
                from: '',
                supplier: '',
                img: '',
                quantity: '',
            });
            toast.success('🦄 Đã cập nhật sản phẩm thành !', {
                position: 'top-center',
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            setEnglishName('');
            setVietnameseName('');
            setPrice(NaN);
            setDescription('');
            setOrigin('');
            setSupplier('');
            setImg('');
            setPreview(true);
        }
        e.preventDefault();
    };

    const handleWeightChange = (newWeight: any) => {
        setWeight(newWeight);
    };
    return (
        <div className={cx('import')}>
            <div className={cx('main-content')}>
                <div>
                    <div className={cx('product-container')}>
                        <div className={cx('product-info')}>
                            <div className={cx('title')}>
                                <h1>Product info</h1>
                            </div>

                            <form className={cx('product-info-form')} onSubmit={handleSubmit} ref={formRef}>
                                <label htmlFor="englishName">Tên tiếng Anh:</label>
                                <input
                                    type="text"
                                    id="englishName"
                                    value={englishName}
                                    onChange={(e) => setEnglishName(e.target.value)}
                                    required
                                />

                                <label htmlFor="vietnameseName">Tên tiếng Việt:</label>
                                <input
                                    type="text"
                                    id="vietnameseName"
                                    value={vietnameseName}
                                    onChange={(e) => setVietnameseName(e.target.value)}
                                    required
                                />

                                <label htmlFor="price">Giá:</label>
                                <input
                                    type="number"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    required
                                />

                                <label htmlFor="description">Mô tả sản phẩm:</label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />

                                <label htmlFor="origin">Xuất xứ:</label>
                                <input
                                    type="text"
                                    id="origin"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    required
                                />

                                <label htmlFor="supplier">Nhà cung cấp:</label>
                                <input
                                    type="text"
                                    id="supplier"
                                    value={supplier}
                                    onChange={(e) => setSupplier(e.target.value)}
                                    required
                                />

                                <label htmlFor="img">Link hình ảnh tham khảo:</label>
                                <input
                                    type="text"
                                    id="img"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                    required
                                />
                            </form>
                        </div>
                        <Scale onWeightChange={handleWeightChange} />
                    </div>
                </div>
                <div className={cx('preview-btn-container')}>
                    {preivew ? (
                        <button
                            className={cx('preview-btn')}
                            type="button"
                            onClick={() => formRef.current?.requestSubmit()}
                        >
                            Preview
                        </button>
                    ) : (
                        <button
                            className={cx('preview-btn')}
                            type="button"
                            onClick={() => formRef.current?.requestSubmit()}
                        >
                            Confirm
                        </button>
                    )}
                    <ToastContainer />
                </div>
            </div>
            <div className={cx('preview-img')}>
                <h1>PREVIEW IMAGE</h1>
                <div className={cx('main-img')}>
                    <img src={preivew ? `assets/img/xxx.jpg` : img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default New;
