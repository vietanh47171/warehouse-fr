import classNames from 'classnames/bind';
import styles from '@/app/styles/toolStyles/toolHistory.module.scss';
import { Filter, Search } from 'lucide-react';
import { useState, useContext } from 'react';
import { sortByContext } from '@/app/store/mySortBy';

const cx = classNames.bind(styles);

const ToolHistory = () => {
    const { sortByData, setSortByData } = useContext(sortByContext);
    const [sortBy, setSortBy] = useState('');
    const handleBtnClick = (status: any) => {
        setSortBy(status);
        setSortByData(status);
        console.log(status);
    };
    return (
        <div>
            <div className={cx('tool-container')}>
                <div className={cx('search-tool')}>
                    <div className={cx('search-tool-title')}>
                        <h2>Search List Item</h2>
                    </div>
                    <div className={cx('search-tool-main')}>
                        <select className={cx('input-product')}>
                            <optgroup label="Foods">
                                <option value="rice">Rice</option>
                                <option value="wheat">Wheat</option>
                                <option value="potato">Potato</option>
                                <option value="sweetpotato">Sweet Potato</option>
                                <option value="oat">Oat</option>
                                <option value="cassava">Cassava</option>
                            </optgroup>
                        </select>
                        <button>
                            <Search color="#eb8421" strokeWidth={3} />
                            <p>Search</p>
                        </button>
                    </div>
                </div>
                <div className={cx('filter-tool')}>
                    <div className={cx('filter-tool-title')}>
                        <span>
                            <Filter color="#eb8421" strokeWidth={3} />
                        </span>
                        <h2>Filter</h2>
                    </div>
                    <div className={cx('filter-tool-btn')}>
                        <div className={sortBy === 'price' ? cx('filter-btn', 'on') : cx('filter-btn')}>
                            <button
                                onClick={() => {
                                    handleBtnClick('price');
                                }}
                                onDoubleClick={() => {
                                    handleBtnClick('');
                                }}
                            >
                                Price
                            </button>
                        </div>
                        <div className={sortBy === 'value' ? cx('filter-btn', 'on') : cx('filter-btn')}>
                            <button
                                onClick={() => {
                                    handleBtnClick('value');
                                }}
                                onDoubleClick={() => {
                                    handleBtnClick('');
                                }}
                            >
                                Value
                            </button>
                        </div>
                        <div className={sortBy === 'quantity' ? cx('filter-btn', 'on') : cx('filter-btn')}>
                            <button
                                onClick={() => {
                                    handleBtnClick('quantity');
                                }}
                                onDoubleClick={() => {
                                    handleBtnClick('');
                                }}
                            >
                                Quantity
                            </button>
                        </div>
                        <p>*Double-click to exit the sort tool*</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolHistory;
