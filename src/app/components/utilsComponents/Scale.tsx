import styles from '@/app/styles/import.module.scss';
import classNames from 'classnames/bind';
import { type } from 'os';
import { useState, useEffect } from 'react';
import * as io from 'socket.io-client';

const cx = classNames.bind(styles);

const Scale = ({ onWeightChange }: { onWeightChange: Function }) => {
    const [weight, setWeight] = useState<number>(0);

    useEffect(() => {
        // Kết nối tới máy chủ Socket.IO
        const socket = io.connect('http://localhost:8000');

        // Lắng nghe sự kiện từ máy chủ
        socket.on('updateSensor', (data: any) => {
            let numberWeight: number = 0;
            if (Number(data) < 0) {
                setWeight(0);
            } else {
                numberWeight = Number(data) / 1000;
                setWeight(Number(numberWeight.toFixed(2)));
                onWeightChange(Number(numberWeight.toFixed(2)));
            }
        });

        // Cleanup khi component unmount
        return () => {
            socket.disconnect();
        };
    }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được mount

    return (
        <div className={cx('product-import')}>
            <div className={cx('title')}>
                <h1>Weight of goods</h1>
            </div>
            <div className={cx('weight')}>
                <p>{weight}</p>
                &ensp;
                <h3>kg</h3>
            </div>
        </div>
    );
};

export default Scale;
