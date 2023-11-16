// myContext.js
'use client';
import { createContext, useContext, useReducer } from 'react';
import ItemList from '../components/workspace/ItemList';
import Import from '../components/workspace/Import';
import Export from '../components/workspace/Export';
import History from '../components/workspace/History';
import ToolHistory from '../components/toolsComponents/ToolHistory';
import ToolItemList from '../components/toolsComponents/ToolItemList';
import DescProduct from '../components/toolsComponents/DescProduct';
import New from '../components/workspace/New';
import ToolNew from '../components/toolsComponents/ToolNew';

const MyContext = createContext<any>(null);

const initialState = {
    pageIndex: 1,
    title: 'Item List',
    component: <ItemList />,
    toolComponent: <ToolItemList />,
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ITEMLIST':
            return { pageIndex: 1, title: 'Item List', component: <ItemList />, toolComponent: <ToolItemList /> };
        case 'IMPORT':
            return { pageIndex: 3, title: 'Import', component: <Import />, toolComponent: <DescProduct /> };
        case 'EXPORT':
            return { pageIndex: 4, title: 'Export', component: <Export />, toolComponent: <DescProduct /> };
        case 'HISTORY':
            return { pageIndex: 5, title: 'History', component: <History />, toolComponent: <ToolHistory /> };
        case 'NEW':
            return { pageIndex: 6, title: 'New', component: <New />, toolComponent: <ToolNew /> };
        default:
            return state;
    }
};

export const MyProvider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>;
};

export const useMyContext = () => useContext(MyContext);
