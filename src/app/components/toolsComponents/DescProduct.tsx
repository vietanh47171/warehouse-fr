import classNames from 'classnames/bind';
import styles from '@/app/styles/toolStyles/descProduct.module.scss';
import { useState, useEffect, useContext } from 'react';
import { productApiDataContext } from '@/app/store/myProduct';

const cx = classNames.bind(styles);

const DescProduct = () => {
    const { productApiData, setProductApiData } = useContext(productApiDataContext);

    return (
        <div>
            <div>
                <div className={cx('tool-container')}>
                    <div className={cx('desc-header')}>
                        <div className={cx('desc-title')}>
                            <h2>Description Product</h2>
                        </div>
                        <div className={cx('desc-img')}>
                            <img src={productApiData.img} alt="" />
                        </div>
                        <h4>{productApiData.vietnameseName}</h4>
                    </div>
                    <div className={cx('desc-content')}>
                        <div className={cx('desc-content-main')}>
                            <h2>Main Infomation</h2>
                        </div>
                        <div className={cx('desc-content-main')}>
                            <h4>Supplier :</h4>
                            <p>&nbsp;{productApiData.supplier}</p>
                        </div>
                        <div className={cx('desc-content-main')}>
                            <h4>From :</h4>
                            <p> &nbsp; {productApiData.from}</p>
                        </div>
                        <div className={cx('desc-content-sub')}>
                            <h4>Description Product :</h4>
                            <p> - {productApiData.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescProduct;
