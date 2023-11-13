'use client';

import { createContext, useContext, useState } from 'react';

export const sortByContext = createContext<any>(null);

export function SortByProvider({ children }: { children: any }) {
    const [sortByData, setSortByData] = useState('');

    return <sortByContext.Provider value={{ sortByData, setSortByData }}>{children}</sortByContext.Provider>;
}
