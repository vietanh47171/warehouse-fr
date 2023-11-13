'use client';

import { createContext, useContext, useState } from 'react';

export const productApiDataContext = createContext<any>(null);

export function ProductDataProvider({ children }: { children: any }) {
    const [productApiData, setProductApiData] = useState({
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

    return (
        <productApiDataContext.Provider value={{ productApiData, setProductApiData }}>
            {children}
        </productApiDataContext.Provider>
    );
}
