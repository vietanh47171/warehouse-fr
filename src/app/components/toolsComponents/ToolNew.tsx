import classNames from 'classnames/bind';
import styles from '@/app/styles/toolStyles/toolNew.module.scss';
import { useState, useEffect, useContext } from 'react';
import { productApiDataContext } from '@/app/store/myProduct';

const cx = classNames.bind(styles);
const ToolNew = () => {
    const { productApiData, setProductApiData } = useContext(productApiDataContext);

    useEffect(() => {
        setProductApiData({
            _id: 'loaidng',
            name: 'loading',
            vietnameseName: 'loading',
            quantity: NaN,
            price: 0,
            __v: 0,
            desc: 'loading',
            from: 'loading',
            supplier: 'unknown',
            img: '',
        });
    }, []);
    return (
        <div>
            <div>
                <div className={cx('tool-container')}>
                    <div className={cx('preview-header')}>
                        <div className={cx('preview-title')}>
                            <h2>Preview New Product</h2>
                        </div>
                        <div className={cx('desc-img')}>
                            <img src="assets/img/new.jpg" alt="" />
                        </div>
                        <h4></h4>
                    </div>
                    <div className={cx('preview-content')}>
                        <div className={cx('preview-content-main')}>
                            <h2>Main Infomation</h2>
                        </div>
                        <div className={cx('preview-content-main')}>
                            <h4>Name :</h4>
                            <p>&nbsp;</p>
                            <p>{productApiData.vietnameseName}</p>
                        </div>

                        <div className={cx('preview-content-main')}>
                            <h4>Price :</h4>
                            <p>&nbsp;</p>
                            <p>{productApiData.price}</p>
                        </div>
                        <div className={cx('preview-content-main')}>
                            <h4>Supplier :</h4>
                            <p>&nbsp;</p>
                            <p>{productApiData.supplier}</p>
                        </div>
                        <div className={cx('preview-content-main')}>
                            <h4>From :</h4>
                            <p> &nbsp; </p>
                            <p>{productApiData.from}</p>
                        </div>
                        <div className={cx('preview-content-sub')}>
                            <h4>Description Product :</h4>
                            <p> - {productApiData.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolNew;
