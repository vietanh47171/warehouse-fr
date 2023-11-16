import React from 'react';
import classNames from 'classnames/bind';
import styles from '@/app/styles/new.module.scss';
import { useState, useEffect, useContext } from 'react';
import Scale from '../utilsComponents/Scale';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const New = () => {
    const [weight, setWeight] = useState(0);
    const handleWeightChange = (newWeight: any) => {
        setWeight(newWeight);
    };
    return (
        <div className={cx('import')}>
            <div className={cx('main-content')}>
                <form action="" className={cx('form-container')}>
                    <div className={cx('input-container')}>
                        <label htmlFor="products" className={cx('input-choose')}>
                            Choose a product : &ensp;
                        </label>
                        <select className={cx('input-product')}>
                            <optgroup label="Foods">
                                <option value="rice">Rice</option>
                                <option value="wheat">Wheat</option>
                                <option value="potato">Potato</option>
                                <option value="sweetpotato">Sweet Potato</option>
                                <option value="oat">Oat</option>
                                <option value="cassava">Cassava</option>
                            </optgroup>
                            <optgroup label="Fruits"></optgroup>
                        </select>
                    </div>
                    <div className={cx('product-container')}>
                        <div className={cx('product-info')}>
                            <div className={cx('title')}>
                                <h1>1323</h1>
                            </div>

                            <form>
                                <label htmlFor="englishName">Tên tiếng Anh:</label>
                                <input type="text" id="englishName" required />

                                <label htmlFor="vietnameseName">Tên tiếng Việt:</label>
                                <input type="text" id="vietnameseName" required />

                                <label htmlFor="price">Giá:</label>
                                <input type="number" id="price" required />

                                <label htmlFor="description">Mô tả sản phẩm:</label>
                                <textarea id="description" rows={4} required />

                                <label htmlFor="origin">Xuất xứ nhà cung cấp:</label>
                                <input type="text" id="origin" required />

                                <button type="submit">Submit</button>
                            </form>
                        </div>
                        <Scale onWeightChange={handleWeightChange} />
                    </div>
                    <div className={cx('import-btn-container')}>
                        <button className={cx('import-btn')}>Import</button>
                        <ToastContainer />
                    </div>
                </form>
            </div>
            <div className={cx('main-img')}>
                <img src={`assets/img/xxx.jpg`} alt="" />
            </div>
        </div>
    );
};

export default New;
