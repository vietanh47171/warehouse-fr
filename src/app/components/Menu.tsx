'use client';
import classNames from 'classnames/bind';
import page from '../styles/menu.module.scss';
import { ArrowRightFromLine, Download, History, LayoutDashboard, List, PlusCircle } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import { useMyContext } from '../store/myContext';
import { sortByContext } from '@/app/store/mySortBy';

const cx = classNames.bind(page);
const Menu = () => {
    const { state, dispatch } = useMyContext();
    const { sortByData, setSortByData } = useContext(sortByContext);

    useEffect(() => {}, [state.pageIndex]);

    return (
        <div className={cx('menu-container')}>
            <div className={cx('main-menu')}>
                <div className={cx('main-menu-tools')}>
                    <div className={cx('workspace')}>
                        <p>WorkSpace</p>
                    </div>
                    <div className={cx('cancel')}>
                        <p>Cancel</p>
                    </div>
                </div>
                <h4 className={cx('main-memu-title')}>warehouse MANAGEMENT</h4>
            </div>
            <div className={cx('sub-menu')}>
                <div className={cx('sub-menu-tools')}>
                    <div
                        className={state.pageIndex === 1 ? cx('list-item', 'active') : cx('list-item')}
                        onClick={() => {
                            dispatch({ type: 'ITEMLIST' });
                            setSortByData('');
                        }}
                    >
                        <List size={30} strokeWidth={3} />
                        <p>Item List</p>
                    </div>

                    <div
                        className={state.pageIndex === 3 ? cx('import', 'active') : cx('import')}
                        onClick={() => dispatch({ type: 'IMPORT' })}
                    >
                        <Download size={30} strokeWidth={3} />
                        <p>Import</p>
                    </div>

                    <div
                        className={state.pageIndex === 4 ? cx('export', 'active') : cx('export')}
                        onClick={() => dispatch({ type: 'EXPORT' })}
                    >
                        <ArrowRightFromLine size={30} strokeWidth={3} />
                        <p>Export</p>
                    </div>
                    <div
                        className={state.pageIndex === 6 ? cx('new', 'active') : cx('new')}
                        onClick={() => dispatch({ type: 'NEW' })}
                    >
                        <PlusCircle size={30} strokeWidth={3} />
                        <p>New</p>
                    </div>
                    <div
                        className={state.pageIndex === 5 ? cx('history', 'active') : cx('history')}
                        onClick={() => {
                            dispatch({ type: 'HISTORY' });
                            setSortByData('');
                        }}
                    >
                        <History size={30} strokeWidth={3} />
                        <p>History</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
